import { useState } from 'preact/hooks'
import { GamerulesPanel, LevelsPanel, OverviewPanel, ProfilingPanel, SystemPanel } from './components/panels'
import { Octicon } from './Octicon'
import { Report } from './Report'

const panels = ['Overview', 'System', 'Gamerules', 'Levels', 'Profiling']

export function App() {
	const [reports, setReports] = useState<Report[]>([])
	const [activeTab, setTab] = useState(0)
	const [activePanel, setPanel] = useState('Overview')
	const activeReport = reports[Math.min(reports.length-1, activeTab)]

	const removeReport = (index: number) => {
		setReports(reports.filter((_, i) => i !== index))
	}

	const onDrop = async (e: DragEvent) => {
		e.preventDefault()
		if(!e.dataTransfer) return

		const promises = []
		let existingName = ''
		for (let i = 0; i < e.dataTransfer.files.length; i++) {
			const file = e.dataTransfer.files[i]
			if (file.type.match(/^application\/(x-)?zip(-compressed)?$/)) {
				if (!reports.find(r => r.name === file.name)) {
					promises.push(Report.fromZip(file))
				} else {
					existingName = file.name
				}
			}
		}
		if (promises.length > 0) {
			const newReports = await Promise.all(promises)
			setTab(reports.length + newReports.length - 1)
			setReports([...reports, ...newReports])
		} else {
			const index = reports.findIndex(r => r.name === existingName)
			if (index !== -1) setTab(index)
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
					<li class={`tab${Math.min(reports.length - 1, activeTab) === i ? ' active' : ''}`}
						onClick={() => setTab(i)} title={report.name}>
						<div class="tab-name">{report.name.replace(/\.zip$/, '')}</div>
						<button class="tab-remove" onClick={() => removeReport(i)}>{Octicon.x}</button>
					</li>
				))}
			</ul>
			<ul class="panels">
				{panels.map((panel) => (
					<li class={`panel${activePanel === panel ? ' active' : ''}`} onClick={() => setPanel(panel)}>
						{panel}
					</li>
				))}
			</ul>
			<div class="report">
				{activePanel === 'Overview' && <OverviewPanel report={activeReport}/>}
				{activePanel === 'System' && <SystemPanel report={activeReport}/>}
				{activePanel === 'Gamerules' && <GamerulesPanel report={activeReport}/>}
				{activePanel === 'Levels' && <LevelsPanel report={activeReport}/>}
				{activePanel === 'Profiling' && <ProfilingPanel report={activeReport}/>}
			</div>
		</>}
	</main>
}
