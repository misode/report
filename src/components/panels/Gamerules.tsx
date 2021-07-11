import type { Report } from '../../Report'
import { PropertiesCard } from '../cards'

export function GamerulesPanel({ report }: { report: Report }) {
	return <>
		<PropertiesCard name="gamerules" properties={Object.entries(report.server?.gamerules ?? {})} defaults={defaultGamerules} />
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
