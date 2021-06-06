import { useState } from 'preact/hooks'
import type { ProfileDump, Report } from '../../Report'
import { PropertiesCard } from '../cards'

export function ProfilingPanel({ report }: { report: Report }) {
	const [side, setSide] = useState<'server' | 'client'>('server')
	const [hidden, setHidden] = useState<Set<string>>(new Set())
	const profile = (report[side] ?? report.server).profiling
	const tickTime = 1000 * profile.tickSpan / profile.timeSpan

	const toggleRow = (path: string) => {
		if (hidden.has(path)) {
			hidden.delete(path)
		} else {
			hidden.add(path)
		}
		setHidden(new Set(hidden))
	}

	return <>
		{report.client && <ul class="panels">
			<li class={`panel${side === 'server' ? ' active' : ''}`} onClick={() => setSide('server')}>
				Server
			</li>
			<li class={`panel${side === 'client' ? ' active' : ''}`} onClick={() => setSide('client')}>
				Client
			</li>
		</ul>}
		<PropertiesCard name="profiling-stats" properties={[
			['Time span', `${profile.timeSpan} ms`],
			['Tick span', `${profile.tickSpan} ticks`],
			['Average tick', `${tickTime.toFixed(3)} mspt`],
		]} />
		<div class="card table area-profiling">
			<div class="table-row table-head">
				<div class="table-column profile-name">Name</div>
				<div class="table-column table-button profile-parent-part">% Parent</div>
				<div class="table-column table-button profile-total-part">% Total</div>
				<div class="table-column table-button profile-time">Avg Time</div>
				<div class="table-column table-button profile-total-count">Count</div>
				<div class="table-column table-button profile-average-count">Avg Count</div>
			</div>
			<div class="table-body">
				<ProfilingTree children={profile.dump} hidden={hidden} 
					path="root" level={0} tickTime={tickTime} onToggle={toggleRow} />
			</div>
		</div>
	</>
}

type ProfilingChildrenProps = {
	children: ProfileDump,
	hidden: Set<string>,
	path: string,
	tickTime: number,
	level: number,
	onToggle: (path: string) => unknown,
}

function ProfilingTree({ children, hidden, path, level, tickTime, onToggle }: ProfilingChildrenProps) {
	return <>
		{Object.entries(children)
			.map(([name, props]) => {
				const newPath = `${path}.${name}`
				return <>
					<div class={`table-row level-${level}`} onClick={props.children && (() => onToggle(newPath))}>
						<div class="profile-name">
							{name.startsWith('ServerLevel[') ? name.split(' ').pop() : name}
						</div>
						{props.ofTotal !== undefined && <>
							<div class="profile-parent-part">{props.ofParent} %</div>
							<div class="profile-total-part">{props.ofTotal} %</div>
							<div class="profile-time">{(tickTime * props.ofTotal / 100).toFixed(3)} ms</div>
						</>}
						<div class="profile-total-count">{props.count}</div>
						<div class="profile-average-count">{props.averageCount}</div>
					</div>
					{props.children && !hidden.has(newPath) && <ProfilingTree children={props.children}
						hidden={hidden} path={newPath} level={level + 1} tickTime={tickTime} onToggle={onToggle}/>}
				</>})}
	</>
}
