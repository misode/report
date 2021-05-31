import type { Report } from '../../Report'
import { CollectionCard, PropertiesCard } from '../cards'

export function SystemPanel(report: Report) {
	return <>
		<PropertiesCard name="version" title="Minecraft version" properties={[
			['Name', report.system.versionName],
			['Id', report.system.versionId],
			['Is modded', report.system.isModded ? 'Yes' : 'Probably not'],
		]} />
		<PropertiesCard name="game-options" title="Game options" properties={[
			['Player count', `${report.system.playerCount.join(' / ')}`],
			['Language', report.system.language],
			['Graphics mode', report.system.graphicsMode],
			['Using VBOs', report.system.vbos ? 'Yes' : 'No'],
		]} />
		<PropertiesCard name="software" title="Software" properties={[
			['Operating system', report.system.operatingSystem],
			['Java version', report.system.javaVersion],
			['Java VM', report.system.jvmVersion],
			['Library', report.system.library],
		]} />
		<PropertiesCard name="hardware" title="Hardware" properties={[
			['Processor', report.system.processorName],
			['CPUs', `${report.system.cpus}`],
			['Frequency', `${report.system.frequency} GHz`],
			['Graphics card', report.system.graphicsCardName],
		]} />
		<CollectionCard name="data-packs" title="Data packs" items={report.system.dataPacks}/>
		<CollectionCard name="resource-packs" title="Resource packs" items={report.system.resourcePacks}/>
	</>
}
