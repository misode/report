import { useEffect, useState } from 'preact/hooks'
import { retrace } from 'proguard-retrace'
import { getMappings } from '../../Fetcher'
import type { Report } from '../../Report'
import { PropertiesCard, TextCard } from '../cards'

export function CrashPanel({ report }: { report: Report }) {
	const [stacktrace, setStacktrace] = useState(report.crash?.stacktrace)

	useEffect(() => {
		const stacktrace = report.crash?.stacktrace
		setStacktrace(stacktrace)
		if (stacktrace && !report.crash?.remapped) {
			const side = report.name.endsWith('-server.txt') ? 'server' : 'client'
			getMappings(report.system.versionId, side).then(mappings => {
				const mappedStacktrace = retrace(mappings, stacktrace)
				setStacktrace(mappedStacktrace)
				report.crash!.stacktrace = mappedStacktrace
				report.crash!.remapped = true
			})
		}
	}, [report.crash?.stacktrace])

	return <>
		<PropertiesCard name="crash-info" title="Minecraft Crash report" properties={[
			['Time', report.crash?.time],
			['Description', report.crash?.description],
		]} />

		<TextCard name="stacktrace"
			title={stacktrace?.slice(0, stacktrace?.indexOf('\n')) ?? 'Stacktrace'}
			text={stacktrace?.slice(stacktrace.indexOf('\n') + 1)}
		/>
	</>
}
