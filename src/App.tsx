import { useState } from 'preact/hooks'
import { TickGraph } from './components/TickGraph'
import { Octicon } from './Octicon'
import { Report } from './Report'

export function App() {
	const [reports, setReports] = useState<Report[]>([])
	const [active, setActive] = useState(0)
	const report = reports[active]

	const removeReport = (index: number) => {
		setReports(reports.filter((_, i) => i !== index))
	}

	const onDrop = async (e: DragEvent) => {
		e.preventDefault()
		if(!e.dataTransfer) return

		for (let i = 0; i < e.dataTransfer.files.length; i++) {
			const file = e.dataTransfer.files[i]
			if (file.type.match(/^application\/(x-)?zip(-compressed)?$/)) {
				const newReport = await Report.fromZip(file)
				const exists = reports.findIndex(r => r.name === newReport.name)
				if (exists >= 0) {
					setActive(exists)
				} else {
					console.log(newReport.name, newReport)
					setReports([...reports, newReport])
				}
			}
		}
	}

	return <main onDrop={onDrop} onDragOver={e => e.preventDefault()}>
		{reports.length === 0 ? <>
			<div class="drop">
				<h1>Drop profiling report here</h1>
				<p>Singleplayer: F3 + L</p>
				<p>Multiplayer: /perf start</p>
				<p>Located in .minecraft/debug/profiling/</p>
			</div>
		</> : <>
			<ul class="tabs">
				{reports.map((report, i) => (
					<li class={`tab${active === i ? ' active' : ''}`} onClick={() => setActive(i)} title={report.name}>
						<div class="tab-name">{report.name}</div>
						<button class="tab-remove" onClick={() => removeReport(i)}>{Octicon.x}</button>
					</li>
				))}
			</ul>
			<div class="report">
				<TickGraph data={report.server.stats.tickTimes.map(t => Math.round(t / 1000000))} title="Tick times" />
				<TickGraph data={report.server.metrics.ticking.map(t => t.tickTime)} title="Server metrics" />
				<TickGraph data={report.client.metrics.ticking.map(t => t.tickTime)} title="Client metrics"/>
			</div>
		</>}
	</main>
}
