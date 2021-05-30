import type { Report } from '../Report'
import { TableCard } from './TableCard'

export function GamerulesPanel(report: Report) {
	return <>
		<TableCard name="gamerules" properties={Object.entries(report.server.gamerules)} />
	</>
}
