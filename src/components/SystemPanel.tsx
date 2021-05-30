import type { Report } from '../Report'
import { CollectionCard } from './Collection'
import { TableCard } from './TableCard'

export function SystemPanel(report: Report) {
	return <>
		<TableCard name="version" title="Minecraft Version" properties={[
			['Name', report.system.versionName],
			['Id', report.system.versionId],
			['Is Modded', report.system.isModded ? 'Yes' : 'Probably not'],
		]} />
		<TableCard name="game-options" title="Game Options" properties={[
			['Player Count', `${report.system.playerCount.join(' / ')}`],
			['Language', report.system.language],
			['Graphics Mode', report.system.graphicsMode],
			['Using VBOs', report.system.vbos ? 'Yes' : 'No'],
		]} />
		<TableCard name="software" title="Software" properties={[
			['Operating System', report.system.operatingSystem],
			['Java Version', report.system.javaVersion],
			['Java VM', report.system.jvmVersion],
			['Library', report.system.library],
		]} />
		<TableCard name="hardware" title="Hardware" properties={[
			['Processor', report.system.processorName],
			['CPUs', `${report.system.cpus}`],
			['Frequency', `${report.system.frequency} GHz`],
			['Graphics Card', report.system.graphicsCardName],
		]} />
		<CollectionCard name="data-packs" title="Data Packs" items={report.system.dataPacks}/>
		<CollectionCard name="resource-packs" title="Resource Packs" items={report.system.resourcePacks}/>
	</>
}
