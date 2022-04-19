import JSZip from 'jszip'

export type LevelReport = {
	blockEntities: {
		x: number,
		y: number,
		z: number,
		type: string,
	}[],
	chunks: {
		x: number,
		z: number,
		level: number,
		inMemory: boolean,
		status: string | null,
		fullStatus: string | null,
		accessibleReady: string,
		tickingReady: string,
		entityTickingReady: string,
		spawning: boolean,
		blockEntityCount: number,
	}[],
	entities: {
		x: number,
		y: number,
		z: number,
		uuid: string,
		type: string,
		alive: boolean,
		displayName: string,
		customName: string | null,
	}[],
	entityChunks: {
		x: number,
		y: number,
		z: number,
		visibility: string,
		loadStatus: string,
		entityCount: number,
	}[],
	stats: {
		spawningChunks: number,
		entities: {
			knownUuids: number,
			visibleEntityStorage: number,
			sectionStorage: number,
			chunkLoadStatuses: number,
			chunkVisibility: number,
			loadingInbox: number,
			chunksToUnload: number,
		},
		blockEntityTickers: number,
		blockTicks: number,
		fluidTicks: number,
		pendingTasks: number,
	},
}

export type SystemReport = {
	versionName: string,
	versionId: string,
	isModded: 'Yes' | 'No' | 'Unknown',
	resourcePacks?: string[],
	dataPacks?: string[],
	operatingSystem: string,
	javaVersion: string,
	jvmVersion: string,
	library?: string,
	processorName: string,
	cpus: number,
	frequency: number,
	graphicsCardName: string,
	playerCount?: [number, number],
	language?: string,
	graphicsMode?: string,
	vbos?: boolean,
}

export type ProfileDump = {
	[child: string]: {
		count: number,
		averageCount: number,
		ofTotal?: number,
		ofParent?: number,
		children?: ProfileDump,
	},
}

export type ProfilingReport = {
	timeSpan: number,
	tickSpan: number,
	dump: ProfileDump,
}

export type CrashReport = {
	time: string,
	description: string,
	stacktrace: string,
	remapped?: boolean,
}

export type Report = {
	name: string,
	client?: {
		metrics: {
			jvm?: {
				tick: number,
				heap: number,
			}[],
			ticking: {
				tick: number,
				tickTime: number,
			}[],
		},
		options: {
			[option: string]: string,
		},
		profiling: ProfilingReport,
	},
	server?: {
		levels: {
			[dimension: string]: LevelReport,
		},
		metrics: {
			jvm?: {
				tick: number,
				heap: number,
			}[],
			ticking: {
				tick: number,
				tickTime: number,
			}[],
		},
		gamerules: {
			[rule: string]: string,
		},
		profiling: ProfilingReport,
		stats: {
			averageTickTime: number,
			tickTimes: number[],
			pendingTasks: number,
		},
	},
	crash?: CrashReport,
	system: SystemReport,
}

export namespace Report {
	export async function fromZip(file: File): Promise<Report> {
		const buffer = await file.arrayBuffer()
		const zip = await JSZip.loadAsync(buffer)

		const system = await loadList(zip, 'system.txt')

		return {
			name: file.name,
			...await loadClient(zip),
			...await loadServer(zip),
			system: createSystemReport(system),
		}
	}

	export async function fromCrash(file: File): Promise<Report> {
		const text = await file.text()
		if (!text.startsWith('---- Minecraft Crash Report ----')) {
			throw new Error('This is not a crash report')
		}

		const empty1 = text.indexOf('\n\n')
		const empty2 = text.indexOf('\n\n', empty1 + 2)
		const empty3 = text.indexOf('\n\n', empty2 + 2)

		const header = parseList(text.substring(empty1 + 2, empty2).split('\n'))

		const systemText = text.substring(text.indexOf('-- System Details --'))
		const system = createSystemReport(parseList(systemText.split('\n')))

		const stacktrace = text.substring(empty2 + 2, empty3).replaceAll('\t', '    ')

		return {
			name: file.name,
			crash: {
				time: header['Time'],
				description: header['Description'],
				stacktrace: stacktrace,
			},
			system,
		}
	}

	async function loadClient(zip: JSZip) {
		if (!zip.files['client/options.txt']) return undefined

		const jvm = zip.files['client/metrics/jvm.csv']	? await loadCsv(zip, 'client/metrics/jvm.csv') : undefined
		const ticking = await loadCsv(zip, 'client/metrics/ticking.csv')
		const options = await loadList(zip, 'client/options.txt')
		const profiling = await loadProfilingDump(zip, 'client/profiling.txt')

		return {
			client: {
				metrics: {
					jvm: jvm?.map(row => ({
						tick: parseInt(row['@tick']),
						heap: parseInt(row['heap MiB']),
					})),
					ticking: ticking.map(row => ({
						tick: parseInt(row['@tick']),
						tickTime: Number(row['ticktime']),
					})),
				},
				options: options,
				profiling: profiling,
			},
		}
	}

	async function loadServer(zip: JSZip) {
		if (!zip.files['server/stats.txt']) return undefined

		const jvm = zip.files['server/metrics/jvm.csv']	? await loadCsv(zip, 'server/metrics/jvm.csv') : undefined
		const ticking = await loadCsv(zip, 'server/metrics/ticking.csv')
		const profiling = await loadProfilingDump(zip, 'server/profiling.txt')
		const gamerules = await loadList(zip, 'server/gamerules.txt', '=') 
		const stats = await loadList(zip, 'server/stats.txt')

		const levelIds = Object.keys(zip.files)
			.map(f => f.match(/^server\/levels\/([a-z0-9_-]+(?:\/[a-z0-9_-]+)+)\/stats.txt$/)?.[1] ?? undefined)
			.filter<string>((id): id is string => id !== undefined)
		const levels = await Promise.all(levelIds.map(path => loadLevel(zip, path)))

		return {
			server: {
				levels: Object.fromEntries(levelIds.map((id, i) => [
					id.replace('/', ':'),
					levels[i],
				])),
				metrics: {
					jvm: jvm?.map(row => ({
						tick: parseInt(row['@tick']),
						heap: parseInt(row['heap MiB']),
					})),
					ticking: ticking.map(row => ({
						tick: parseInt(row['@tick']),
						tickTime: Number(row['ticktime']),
					})),
				},
				gamerules: gamerules,
				profiling: profiling,
				stats: {
					pendingTasks: parseInt(stats['pending_tasks']),
					averageTickTime: parseFloat(stats['average_tick_time']),
					tickTimes: JSON.parse(stats['tick_times']),
				},
			},
		}
	}

	async function loadProfilingDump(zip: JSZip, path: string) {
		const lines = await loadText(zip, path)
		const start = lines.indexOf('--- BEGIN PROFILE DUMP ---') + 2
		const end = lines.indexOf('--- END PROFILE DUMP ---')
		const stack: ProfileDump[] = []
		const names: string[] = []
		let level = -1
		for (let i = start; i < end; i += 1) {
			const match = lines[i].match(/^\[(\d\d)\][ |]+(.*)(\((\d+)\/(\d+)\) - ([\d\.]+)%\/([\d\.]+)%| (\d+)\/(\d+))$/)!
			const newLevel = parseInt(match[1])
			const newName = match[2]
			if (newLevel > level) {
				stack.push({})
			} else {
				names.pop()
			}
			for (let j = 0; j < level - newLevel; j += 1) {
				const dump = stack.pop()
				stack[stack.length - 1][names.pop()!].children = dump
			}
			names.push(newName)
			level = newLevel
			stack[stack.length - 1][newName] = {
				count: parseInt(match[4] ?? match[8]),
				averageCount: parseInt(match[5] ?? match[9]),
				...match[6] && {
					ofParent: parseFloat(match[6]),
					ofTotal: parseFloat(match[7]),
				},
			}
		}

		return {
			timeSpan: parseInt(lines[4].split(':')[1]),
			tickSpan: parseInt(lines[5].split(':')[1]),
			dump: stack[0],
		}
	}

	async function loadLevel(zip: JSZip, id: string): Promise<LevelReport> {
		const blockEntities = await loadCsv(zip, `server/levels/${id}/block_entities.csv`)
		const chunks = await loadCsv(zip, `server/levels/${id}/chunks.csv`)
		const entities = await loadCsv(zip, `server/levels/${id}/entities.csv`)
		const entityChunks = await loadCsv(zip, `server/levels/${id}/entity_chunks.csv`)
		const stats = await loadList(zip, `server/levels/${id}/stats.txt`)
		const statsEntities = stats['entities'].split(',').map(e => parseInt(e))

		return {
			blockEntities: blockEntities.map(b => ({
				x: parseFloat(b['x']),
				y: parseFloat(b['y']),
				z: parseFloat(b['z']),
				type: b['type'],
			})),
			chunks: chunks.map(c => ({
				x: parseInt(c['x']),
				z: parseInt(c['z']),
				level: parseInt(c['level']),
				inMemory: c['in_memory'] === 'true',
				status: c['status'] === '[null]' ? null : c['status'],
				fullStatus: c['full_status'] === '[null]' ? null : c['full_status'],
				accessibleReady: c['accessible_ready'],
				tickingReady: c['ticking_ready'],
				entityTickingReady: c['entity_ticking_ready'],
				spawning: c['spawning'] === 'true',
				blockEntityCount: parseInt(c['block_entity_count']),
			})),
			entities: entities.map(e => ({
				x: parseFloat(e['x']),
				y: parseFloat(e['y']),
				z: parseFloat(e['z']),
				uuid: e['uuid'],
				type: e['type'],
				alive: e['alive'] === 'true',
				displayName: e['display_name'],
				customName: e['custom_name'] === '[null]' ? null : e['custom_name'],
			})),
			entityChunks: entityChunks.map(e => ({
				x: parseFloat(e['x']),
				y: parseFloat(e['y']),
				z: parseFloat(e['z']),
				visibility: e['visibility'],
				loadStatus: e['load_status'],
				entityCount: parseInt(e['entity_count']),
			})),
			stats: {
				spawningChunks: parseInt(stats['spawning_chunks']),
				entities: {
					knownUuids: statsEntities[0],
					visibleEntityStorage: statsEntities[1],
					sectionStorage: statsEntities[2],
					chunkLoadStatuses: statsEntities[3],
					chunkVisibility: statsEntities[4],
					loadingInbox: statsEntities[5],
					chunksToUnload: statsEntities[6],
				},
				blockEntityTickers: parseInt(stats['block_entity_tickers']),
				blockTicks: parseInt(stats['block_ticks']),
				fluidTicks: parseInt(stats['fluid_ticks']),
				pendingTasks: parseInt(stats['pending_tasks']),
			},
		}
	}

	function createSystemReport(system: Record<string, string>): SystemReport {
		return {
			versionName: system['Minecraft Version'],
			versionId: system['Minecraft Version ID'],
			isModded: system['Is Modded'].startsWith('Probably not.') ? 'No'
				: system['Is Modded'].startsWith('Unknown') ? 'Unknown' : 'Yes',
			resourcePacks: system['Resource Packs']?.split(',').map(e => e.trim()),
			dataPacks: system['Data Packs']?.split(',').map(e => e.trim()),
			operatingSystem: system['Operating System'],
			javaVersion: system['Java Version'],
			jvmVersion: system['Java VM Version'],
			library: system['Backend library'],
			processorName: system['Processor Name'],
			cpus: parseInt(system['CPUs']),
			frequency: parseFloat(system['Frequency (GHz)']),
			graphicsCardName: system['Graphics card #0 name'],
			playerCount: system['Player Count']?.split(';')[0].split(' / ').map(v => parseInt(v)) as [number, number],
			language: system['Current Language'],
			graphicsMode: system['Graphics mode'],
			vbos: system['Using VBOs'] ? system['Using VBOs'] === 'Yes' : undefined,
		}
	}

	async function loadCsv(zip: JSZip, path: string) {
		const [first, ...data] = await loadText(zip, path)
		const header = first.split(',').map(e => e.trim())
		return data.map(row => Object.fromEntries(row.split(',')
			.map((e, i) => [header[i], e.trim()])))
	}

	async function loadList(zip: JSZip, path: string, separator = ':') {
		const lines = await loadText(zip, path)
		return parseList(lines, separator)
	}

	function parseList(lines: string[], separator = ':') {
		return Object.fromEntries(lines
			.filter(line => line.includes(separator))
			.map(line => {
				const [key, ...rest] = line.split(separator)
				return [key.trim(), rest.join(separator).trim()]
			}))
	}

	async function loadText(zip: JSZip, path: string) {
		const file = zip.files[path]
		if (!file) {
			throw new Error(`Cannot find "${path}"`)
		}
		const text = await file.async('text')
		return text.trimEnd().split('\n')
	}
}
