import type { Report } from '../../Report'
import { PropertiesCard } from '../cards'

export function OptionsPanel({ report }: { report: Report }) {
	return <>
		{report.server?.gamerules &&
			<PropertiesCard title="Gamerules" name="gamerules" properties={Object.entries(report.server.gamerules)} defaults={defaultGamerules} />}
		{report.client?.options &&
			<PropertiesCard title="Client Options" name="options" properties={Object.entries(report.client.options)} defaults={defaultOptions} />}
	</>
}

const defaultGamerules = {
	announceAdvancements: 'true',
	commandBlockOutput: 'true',
	disableElytraMovementCheck: 'false',
	disableRaids: 'false',
	doDaylightCycle: 'true',
	doEntityDrops: 'true',
	doFireTick: 'true',
	doInsomnia: 'true',
	doImmediateRespawn: 'false',
	doLimitedCrafting: 'false',
	doMobLoot: 'true',
	doMobSpawning: 'true',
	doPatrolSpawning: 'true',
	doTileDrops: 'true',
	doTraderSpawning: 'true',
	doWeatherCycle: 'true',
	drowningDamage: 'true',
	fallDamage: 'true',
	fireDamage: 'true',
	forgiveDeadPlayers: 'true',
	freezeDamage: 'true',
	keepInventory: 'false',
	logAdminCommands: 'true',
	maxCommandChainLength: '65536',
	maxEntityCramming: '24',
	mobGriefing: 'true',
	naturalRegeneration: 'true',
	playersSleepingPercentage: '100',
	randomTickSpeed: '3',
	reducedDebugInfo: 'false',
	sendCommandFeedback: 'true',
	showDeathMessages: 'true',
	spawnRadius: '10',
	spectatorsGenerateChunks: 'true',
	universalAnger: 'false',
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
