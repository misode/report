import type { FunctionalComponent } from 'preact'
import { useState } from 'preact/hooks'
import { EmptyPanel } from './components/EmptyPanel'
import { GamerulesPanel } from './components/GamerulesPanel'
import { OverviewPanel } from './components/OverviewPanel'
import { SystemPanel } from './components/SystemPanel'
import { Octicon } from './Octicon'
import { Report } from './Report'

const panels: [string, FunctionalComponent<Report>][] = [
	['Overview', OverviewPanel],
	['System', SystemPanel],
	['Gamerules', GamerulesPanel],
	['levels', EmptyPanel],
	['Profiling', EmptyPanel],
]

export function App() {
	const [reports, setReports] = useState<Report[]>([])
	const [activeTab, setTab] = useState(0)
	const [activePanel, setPanel] = useState(0)

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
					setTab(exists)
				} else {
					console.log(newReport.name, newReport)
					setTab(reports.length)
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
					<li class={`tab${activeTab === i ? ' active' : ''}`} onClick={() => setTab(i)} title={report.name}>
						<div class="tab-name">{report.name}</div>
						<button class="tab-remove" onClick={() => removeReport(i)}>{Octicon.x}</button>
					</li>
				))}
			</ul>
			<ul class="panels">
				{panels.map((panel, i) => (
					<li class={`panel${activePanel === i ? ' active' : ''}`} onClick={() => setPanel(i)}>
						{panel[0]}
					</li>
				))}
			</ul>
			<div class="report">
				{panels[activePanel][1](reports[activeTab])}
			</div>
		</>}
	</main>
}
