import { useState } from 'preact/hooks'
import { Octicon } from '../../Octicon'
import type { ProfileDump, Report } from '../../Report'
import { PropertiesCard } from '../cards'

export function ProfilingPanel({ report }: { report: Report }) {
	const [side, setSide] = useState<'server' | 'client'>(report.server ? 'server' : 'client')
	const [mode, setMode] = useState<'list' | 'tree'>('tree')
	const [hidden, setHidden] = useState<Set<string>>(new Set())
	const profile = (report[side] ?? report.server)?.profiling ?? { tickSpan: 0, timeSpan: 0, dump: {} }
	const tickTime = profile.timeSpan / profile.tickSpan 

	const toggleRow = (path: string) => {
		if (hidden.has(path)) {
			hidden.delete(path)
		} else {
			hidden.add(path)
		}
		setHidden(new Set(hidden))
	}

	return <>
		{(report.client && report.server) && <ul class="panels">
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
				<div class="table-column profile-name">
					<div class="table-button table-prefix" onClick={() => setMode(mode === 'list' ? 'tree' : 'list')}>
						{Octicon.rows}
					</div>
					Name
				</div>
				<div class="table-column table-button profile-parent-part">% Parent</div>
				<div class="table-column table-button profile-total-part">% Total</div>
				<div class="table-column table-button profile-time">Avg Time</div>
				<div class="table-column table-button profile-total-count">Count</div>
				<div class="table-column table-button profile-average-count">Avg Count</div>
			</div>
			<div class="table-body">
				{mode === 'tree'
					? <ProfilingTree children={profile.dump} hidden={hidden} 
						path="root" level={0} tickTime={tickTime} onToggle={toggleRow} />
					: <ProfilingList children={profile.dump} tickTime={tickTime} />}
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
			.map<[string, string, ProfileDump[string]]>(([n, p]) => [n, `${path}.${n}`, p])
			.map(([name, newPath, props]) => <>
				<ProfileRow name={name} props={props} tickTime={tickTime}
					level={level} onClick={() => onToggle(newPath)} />
				{props.children && !hidden.has(newPath) && <ProfilingTree children={props.children}
					hidden={hidden} path={newPath} level={level + 1} tickTime={tickTime} onToggle={onToggle}/>}
			</>)}
	</>
}

type ProfilingListProps = {
	children: ProfileDump,
	tickTime: number,
}

function ProfilingList({ children, tickTime }: ProfilingListProps) {
	return <>
		{Object.entries(children)
			.map(([name, props]) => <>
				<ProfileRow name={name} props={props} tickTime={tickTime} />
				{props.children && <ProfilingList children={props.children} tickTime={tickTime}/>}
			</>)}
	</>
}

type ProfileRowProps = {
	name: string,
	props: ProfileDump[string],
	tickTime: number,
	level?: number,
	onClick?: () => unknown,
}

function ProfileRow({ name, props, tickTime, level, onClick }: ProfileRowProps) {
	return <div class={`table-row ${level ? `level-${level}` : ''}`} onClick={onClick}>
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
}
