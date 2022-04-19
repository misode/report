import { useEffect, useRef, useState } from 'preact/hooks'
import { CrashPanel, LevelsPanel, OptionsPanel, OverviewPanel, ProfilingPanel, SystemPanel } from './components/panels'
import { Octicon } from './Octicon'
import { Report } from './Report'

const PANELS: {
	name: string,
	predicate: (report: Report) => any,
	component: (props: { report: Report }) => JSX.Element,
}[] = [
	{
		name: 'Overview',
		predicate: report => report.server || report.client,
		component: OverviewPanel,
	},
	{
		name: 'Crash',
		predicate: report => report.crash,
		component: CrashPanel,
	},
	{
		name: 'System',
		predicate: report => report.system,
		component: SystemPanel,
	},
	{
		name: 'Options',
		predicate: report => report.server || report.client,
		component: OptionsPanel,
	},
	{
		name: 'Levels',
		predicate: report => report.server,
		component: LevelsPanel,
	},
	{
		name: 'Profiling',
		predicate: report => report.server?.profiling || report.client?.profiling,
		component: ProfilingPanel,
	},
]

export function App() {
	const [reports, setReports] = useState<Report[]>([])
	const [activeTab, setTab] = useState(0)
	const [activePanel, setPanel] = useState('Overview')
	const [errors, setErrors] = useState<string[]>([])
	const activeReport: Report | undefined = reports[Math.min(reports.length, activeTab)]

	useEffect(() => {
		if (activeReport) {
			const allowedPanels = PANELS.filter(p => p.predicate(activeReport)).map(p => p.name)
			if (!allowedPanels.includes(activePanel)) {
				setPanel(allowedPanels[0] ?? 'Overview')
			}
		}
	}, [activeReport, activePanel])

	const removeReport = (index: number) => {
		setReports(reports.filter((_, i) => i !== index))
	}

	const handleFiles = async (files: File[] | FileList) => {
		if (errors) setErrors([])
		if (files instanceof FileList) {
			const temp: File[] = []
			for (let i = 0; i < files.length; i++) {
				temp.push(files[i])
			}
			files = temp
		}
		const promises = files.flatMap(file => {
			if (!reports.find(r => r.name === file.name)) {
				if (file.type.match(/^application\/(x-)?zip(-compressed)?$/)) {
					return [Report.fromZip(file)]
				} else if (file.type === 'text/plain' && file.name.match(/^crash-.+-(client|server)\.txt$/)) {
					return [Report.fromCrash(file)]
				}
			}
			return []
		})
		const newReports = await Promise.all(promises.map(async promise => {
			try {
				return await promise
			} catch (error: any) {
				setErrors([...errors, error.message])
				console.error(error)
				return
			}
		}))
		setTab(reports.length + newReports.length - 1)
		setReports([...reports, ...newReports.filter((r): r is Report => r !== undefined)])
	}

	const onDrop = async (e: DragEvent) => {
		e.preventDefault()
		if(!e.dataTransfer) return

		handleFiles(e.dataTransfer.files)
	}

	const uploadRef = useRef<HTMLInputElement>()
	const onUpload = () => {
		if (uploadRef.current.files) {
			handleFiles(uploadRef.current.files)
		}
	}

	return <main onDrop={onDrop} onDragOver={e => e.preventDefault()}>
		{reports.length > 0 && <ul class="tabs">
			{reports.map((report, i) => (
				<li class={`tab${Math.min(reports.length, activeTab) === i ? ' active' : ''}`}
					onClick={() => setTab(i)} title={report.name}>
					<div class="tab-name">{report.name.replace(/\.(zip|txt)$/, '')}</div>
					<button class="tab-button" onClick={() => removeReport(i)}>{Octicon.x}</button>
				</li>
			))}
			<li class="tab new-report">
				<button class="tab-button" onClick={() => setTab(reports.length)}>{Octicon.plus}</button>
			</li>
		</ul>}
		{(reports.length === 0 || !activeReport) ? <>
			<div class="drop">
				<input ref={uploadRef} type="file" onChange={onUpload} accept=".zip,.txt" multiple />
				<h1>Drop profiling or crash report here</h1>
				<p>Singleplayer: F3 + L</p>
				<p>Multiplayer: /perf start</p>
				<p>Located in .minecraft/debug/profiling/</p>
				<p>Crash reports in .minecraft/crash-reports/</p>
			</div>
		</> : <>
			<ul class="panels">
				{PANELS.map(panel => {
					if (panel.predicate(activeReport)) {
						return <li key={panel.name} class={`panel${activePanel === panel.name ? ' active' : ''}`} onClick={() => setPanel(panel.name)}>
							{panel.name}
						</li>
					}
					return null
				})}
			</ul>
			<div class={`report${activeReport.client ? ' client-report' : ''}${activeReport.server ? ' server-report' : ''}`}>
				{PANELS.map(panel => {
					if (panel.name === activePanel) {
						return <panel.component key={panel.name} report={activeReport}/>
					}
					return null
				})}
			</div>
			<div class="footer">
				<p>Developed by Misode</p>
				<p>Source code on <a href="https://github.com/misode/report" target="_blank">GitHub</a></p>
			</div>
		</>}
		{errors.map(error => <div class="error">
			<p>Something went wrong loading the report:</p>
			<p class="error-message">{error}</p>
			<p>What you can do:
				<ul>
					<li>Ensure that you are not using a version below 1.17-pre1</li>
					<li>Report this as a bug <a href="https://github.com/misode/report/issues/new" target="_blank">on GitHub</a> and upload the report</li>
				</ul>
			</p>
			<div class="error-close" onClick={() => setErrors(errors.filter(e => e !== error))}>x</div>
		</div>)}
	</main>
}
