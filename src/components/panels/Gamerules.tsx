import type { Report } from '../../Report'
import { PropertiesCard } from '../cards'

export function GamerulesPanel({ report }: { report: Report }) {
	return <>
		<PropertiesCard name="gamerules" properties={Object.entries(report.server.gamerules)} />
	</>
}
