const MANIFEST_URL = 'https://launchermeta.mojang.com/mc/game/version_manifest_v2.json'
const CORS_URL = 'https://misode-cors-anywhere.herokuapp.com'

interface Manifest {
	versions: {
		id: string,
		url: string,
	}[]
}

interface VersionMeta {
	downloads: {
		server_mappings: {
			url: string,
		},
		client_mappings: {
			url: string,
		},
	}
}

export async function getMappings(version: string, side: 'client' | 'server') {
	const manifest = await cachedFetch<Manifest>(MANIFEST_URL, { refresh: true })
	const versionUrl = manifest.versions.find(v => v.id === version)?.url
	if (!versionUrl) {
		throw new Error(`Version ${version} not found`)
	}
	const versionMeta = await cachedFetch<VersionMeta>(versionUrl)
	const mappingsUrl = versionMeta.downloads[`${side}_mappings`].url
	const mappings = await cachedFetch<string>(`${CORS_URL}/${mappingsUrl}`, { decode: r => r.text() })
	return mappings
}

interface FetchOptions<D> {
	decode?: (r: Response) => Promise<D>
	refresh?: boolean
}

const CACHE_NAME = 'misode-report-v1'

async function cachedFetch<D = unknown>(url: string, { decode = (r => r.json()), refresh }: FetchOptions<D> = {}): Promise<D> {
	// Fix for https://bugs.mojang.com/browse/WEB-5905
	url = url.replace('piston-meta.mojang.com', 'launchermeta.mojang.com')

	try {
		const cache = await caches.open(CACHE_NAME)
		console.debug(`[cachedFetch] Opened cache ${CACHE_NAME} ${url}`)
		const cacheResponse = await cache.match(url)

		if (refresh) {
			try {
				return await fetchAndCache(cache, url, decode)
			} catch (e) {
				if (cacheResponse && cacheResponse.ok) {
					console.debug(`[cachedFetch] Cannot refresh, using cache ${url}`)
					return await decode(cacheResponse)
				}
				throw new Error('Failed to fetch')
			}
		} else {
			if (cacheResponse && cacheResponse.ok) {
				console.debug(`[cachedFetch] Retrieving cached data ${url}`)
				return await decode(cacheResponse)
			}
			return await fetchAndCache(cache, url, decode)
		}
	} catch (e: any) {
		console.warn(`[cachedFetch] Failed to open cache ${CACHE_NAME}: ${e.message}`)

		console.debug(`[cachedFetch] Fetching data ${url}`)
		const fetchResponse = await fetch(url)
		const fetchData = await decode(fetchResponse)
		return fetchData
	}
}

async function fetchAndCache<D>(cache: Cache, url: string, decode: (r: Response) => Promise<D>) {
	console.debug(`[cachedFetch] Fetching data ${url}`)
	const fetchResponse = await fetch(url)
	const fetchClone = fetchResponse.clone()
	const fetchData = await decode(fetchResponse)
	await cache.put(url, fetchClone)
	return fetchData
}
