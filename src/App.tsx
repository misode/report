import { useState } from 'preact/hooks'
import { Report } from './Report'

export function App() {
	const [reports, setReports] = useState<Report[]>([])

	const onDrop = async (e: DragEvent) => {
		e.preventDefault()
		if(!e.dataTransfer) return

		for (let i = 0; i < e.dataTransfer.files.length; i++) {
			const file = e.dataTransfer.files[i]
			if (file.type.match(/^application\/(x-)?zip(-compressed)?$/)) {
				const report = await Report.fromZip(file)
				console.log(report)
				setReports([...reports, report])
			}
		}
	}

	return <main onDrop={onDrop} onDragOver={e => e.preventDefault()}>
		<p>Reports loaded: {reports.length}</p>
		<ul>
			{reports.map(report => (
				<li>{report.name}</li>
			))}
		</ul>
	</main>
}
