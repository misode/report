import type { Report } from '../Report'
import { TableCard } from './TableCard'
import { GraphCard } from './TickGraph'


export function OverviewPanel(report: Report) {
	const averageTick = report.server.stats.averageTickTime
	const minimumTick = Math.min(...report.server.stats.tickTimes) / 1000000
	const maximumTick = Math.max(...report.server.stats.tickTimes) / 1000000
	return <>
		<TableCard name="stats" title="Server Stats" properties={[
			['Average tick', `${averageTick.toFixed(3)} mspt`],
			['Minimum tick', `${minimumTick.toFixed(3)} mspt`],
			['Maximum tick', `${maximumTick.toFixed(3)} mspt`],
		]}></TableCard>
		<GraphCard name="tick-graph" title="Milliseconds per tick" goal={50}
			data={report.server.stats.tickTimes.map(t => Math.round(t / 1000000))}/>
		<GraphCard name="server-metrics" title="Server metrics" goal={50}
			data={report.server.metrics.ticking.map(t => Math.round(t.tickTime / 1000000))}/>
		<GraphCard name="client-metrics" title="Client metrics" goal={60}
			data={report.client.metrics.ticking.map(t => Math.round(1000 / (t.tickTime / 1000000)))}/>
	</>
}
