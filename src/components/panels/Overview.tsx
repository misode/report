import type { Report } from '../../Report'
import { GraphCard, PropertiesCard } from '../cards'

export function OverviewPanel({ report }: { report: Report }) {
	const averageTick = report.server.stats.averageTickTime
	const minimumTick = Math.min(...report.server.stats.tickTimes) / 1000000
	const maximumTick = Math.max(...report.server.stats.tickTimes) / 1000000
	return <>
		<PropertiesCard name="stats" title={report.client ? 'Server stats' : 'Stats'} properties={[
			['Average tick', `${averageTick.toFixed(3)} mspt`],
			['Minimum tick', `${minimumTick.toFixed(3)} mspt`],
			['Maximum tick', `${maximumTick.toFixed(3)} mspt`],
		]}/>
		<GraphCard name="tick-graph" title={report.client ? 'Server tick (mspt)' : 'Tick (mspt)'} goal={50}
			data={report.server.stats.tickTimes.map(t => t / 1000000)}/>
		<GraphCard name="server-metrics" title={report.client ? 'Full server tick' : 'Full tick'} goal={50}
			data={report.server.metrics.ticking.map(t => t.tickTime / 1000000)}/>
		{report.client && <GraphCard name="client-metrics" title="Client tick" goal={60}
			data={report.client.metrics.ticking.map(t => 1000 / (t.tickTime / 1000000))}/>}
		{report.server.metrics.jvm && <GraphCard name="server-jvm" title="JVM heap (MiB)" goal={2000}
			data={report.server.metrics.jvm.map(t => t.heap)}/>}
	</>
}
