import type { Report } from '../../Report'
import { PropertiesCard } from '../cards'

export function OptionsPanel({ report }: { report: Report }) {
	return <>
		<PropertiesCard name="options" properties={Object.entries(report.client?.options ?? {})} defaults={defaultOptions} />
	</>
}

const defaultOptions = {
	ao: 'MAX',
	biomeBlendRadius: '2',
	enableVsync: 'true',
	entityDistanceScaling: '1.0',
	entityShadows: 'true',
	forceUnicodeFont: 'false',
	fov: '70.0',
	fovEffectScale: '1.0',
	fullscreen: 'false',
	gamma: '1.0',
	glDebugVerbosity: '1',
	graphicsMode: 'fancy',
	guiScale: '0',
	maxFps: '120',
	mipmapLevels: '4',
	narrator: 'OFF',
	overrideHeight: '0',
	overrideWidth: '0',
	particles: 'ALL',
	reducedDebugInfo: 'false',
	renderClouds: 'FANCY',
	renderDistance: '12',
	screenEffectScale: '1.0',
	useNativeTransport: 'true',
}
