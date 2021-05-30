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
		status: string,
		fullStatus: string,
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
	isModded: boolean,
	resourcePacks: string[],
	dataPacks: string[],
	operatingSystem: string,
	javaVersion: string,
	jvmVersion: string,
	library: string,
	processorName: string,
	cpus: number,
	frequency: number,
	graphicsCardName: string,
	playerCount: [number, number],
	language: string,
	graphicsMode: string,
	vbos: boolean,
}

export type Report = {
	name: string,
	client: {
		metrics: {
			ticking: {
				tick: number,
				tickTime: number,
			}[],
		},
		options: {
			[option: string]: string,
		},
	},
	server: {
		levels: {
			[dimension: string]: LevelReport,
		},
		metrics: {
			ticking: {
				tick: number,
				tickTime: number,
			}[],
		},
		gamerules: {
			[rule: string]: string,
		},
		stats: {
			averageTickTime: number,
			tickTimes: number[],
			pendingTasks: number,
		},
	},
	system: SystemReport,
}

export namespace Report {
	export async function fromZip(file: File): Promise<Report> {
		const buffer = await file.arrayBuffer()
		const zip = await JSZip.loadAsync(buffer)

		const clientTicks = await loadCsv(zip, 'client/metrics/ticking.csv')
		const options = await loadList(zip, 'client/options.txt')
		const serverTicks = await loadCsv(zip, 'server/metrics/ticking.csv')
		const gamerules = await loadList(zip, 'server/gamerules.txt', '=') 
		const stats = await loadList(zip, 'server/stats.txt')
		const system = await loadList(zip, 'system.txt')

		const levelIds = Object.keys(zip.files).filter(f => f.match(/^server\/levels\/[a-z0-9_-]+\/[a-z0-9_-]+\/$/))
		const levels = await Promise.all(levelIds.map(path => loadLevel(zip, path)))

		return {
			name: file.name.replace(/\.zip$/, ''),
			client: {
				metrics: {
					ticking: clientTicks.map(row => ({
						tick: parseInt(row['@tick']),
						tickTime: Number(row['ticktime']),
					})),
				},
				options: options,
			},
			server: {
				levels: Object.fromEntries(levelIds.map((id, i) => [
					id.replace(/^server\/levels\/([a-z0-9_-]+)\/([a-z0-9_-]+)\/$/, '$1:$2'),
					levels[i],
				])),
				metrics: {
					ticking: serverTicks.map(row => ({
						tick: parseInt(row['@tick']),
						tickTime: Number(row['ticktime']),
					})),
				},
				gamerules: gamerules,
				stats: {
					pendingTasks: parseInt(stats['pending_tasks']),
					averageTickTime: parseFloat(stats['average_tick_time']),
					tickTimes: JSON.parse(stats['tick_times']),
				},
			},
			system: {
				versionName: system['Minecraft Version'],
				versionId: system['Minecraft Version ID'],
				isModded: !system['Is Modded'].startsWith('Probably not.'),
				resourcePacks: system['Resource Packs'].split(',').map(e => e.trim()),
				dataPacks: system['Data Packs'].split(',').map(e => e.trim()),
				operatingSystem: system['Operating System'],
				javaVersion: system['Java Version'],
				jvmVersion: system['Java VM Version'],
				library: system['Backend library'],
				processorName: system['Processor Name'],
				cpus: parseInt(system['CPUs']),
				frequency: parseFloat(system['Frequency (GHz)']),
				graphicsCardName: system['Graphics card #0 name'],
				playerCount: system['Player Count'].split(';')[0].split(' / ').map(v => parseInt(v)) as [number, number],
				language: system['Current Language'],
				graphicsMode: system['Graphics mode'],
				vbos: system['Using VBOs'] === 'Yes',
			},
		}
	}

	async function loadLevel(zip: JSZip, path: string): Promise<LevelReport> {
		const blockEntities = await loadCsv(zip, `${path}block_entities.csv`)
		const chunks = await loadCsv(zip, `${path}chunks.csv`)
		const entities = await loadCsv(zip, `${path}entities.csv`)
		const entityChunks = await loadCsv(zip, `${path}entity_chunks.csv`)
		const stats = await loadList(zip, `${path}stats.txt`)
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
				status: c['status'],
				fullStatus: c['full_status'],
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

	async function loadCsv(zip: JSZip, path: string) {
		const [first, ...data] = await loadText(zip, path)
		const header = first.split(',').map(e => e.trim())
		return data.map(row => Object.fromEntries(row.split(',')
			.map((e, i) => [header[i], e.trim()])))
	}

	async function loadList(zip: JSZip, path: string, separator = ':') {
		const lines = await loadText(zip, path)
		return Object.fromEntries(lines
			.filter(line => line.includes(separator))
			.map(line => {
				const [key, ...rest] = line.split(separator)
				return [key, rest.join(separator).trim()]
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
