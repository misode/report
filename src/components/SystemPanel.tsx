import type { Report } from '../Report'
import { Card } from './Card'
import { Collection } from './Collection'

export function SystemPanel(report: Report) {
	return <>
		<Card title="Minecraft Version" properties={[
			['Name', report.system.versionName],
			['Id', report.system.versionId],
			['Is Modded', report.system.isModded ? 'Yes' : 'Probably not'],
		]} />
		<Collection title="Data Packs" items={report.system.dataPacks}/>
		<Collection title="Resource Packs" items={report.system.resourcePacks}/>
	</>
}
