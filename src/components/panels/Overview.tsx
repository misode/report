import type { Report } from '../../Report'
import { GraphCard, PropertiesCard } from '../cards'

export function OverviewPanel({ report }: { report: Report }) {
	console.log(report)
	const averageTick = report.server?.stats.averageTickTime ?? 0
	const minimumTick = Math.min(...report.server?.stats.tickTimes ?? []) / 1000000
	const maximumTick = Math.max(...report.server?.stats.tickTimes ?? []) / 1000000
	return <>
		{report.server && <PropertiesCard name="stats" title={report.client ? 'Server stats' : 'Stats'} properties={[
			['Average tick', `${averageTick.toFixed(3)} mspt`],
			['Minimum tick', `${minimumTick.toFixed(3)} mspt`],
			['Maximum tick', `${maximumTick.toFixed(3)} mspt`],
		]}/>}
		{report.server && <GraphCard name="tick-graph" title={report.client ? 'Server tick (mspt)' : 'Tick (mspt)'} goal={50}
			data={report.server.stats.tickTimes.map(t => t / 1000000)}/>}
		{report.server && <GraphCard name="server-metrics" title={report.client ? 'Full server tick (ms)' : 'Full tick'} goal={50}
			data={report.server.metrics.ticking.map(t => t.tickTime / 1000000)}/>}
		{report.client && <GraphCard name="client-metrics" title="Client tick (ms)" goal={60}
			data={report.client.metrics.ticking.map(t => 1000 / (t.tickTime / 1000000))}/>}
		{report.server?.metrics.jvm && <GraphCard name="server-jvm" title="Server JVM heap (MiB)" goal={2000}
			data={report.server.metrics.jvm.map(t => t.heap)}/>}
		{report.client?.metrics.jvm && <GraphCard name="client-jvm" title="Client JVM heap (MiB)" goal={2000}
			data={report.client.metrics.jvm.map(t => t.heap)}/>}
	</>
}
