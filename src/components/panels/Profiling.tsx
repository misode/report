import { useRef, useState } from 'preact/hooks'
import { useActive } from '../../hooks'
import { Octicon } from '../../Octicon'
import type { ProfileDump, Report } from '../../Report'
import { PropertiesCard } from '../cards'

export function ProfilingPanel({ report }: { report: Report }) {
	const [side, setSide] = useState<'server' | 'client'>(report.server ? 'server' : 'client')
	const [mode] = useState<'list' | 'tree'>('tree')
	const [rainbow, setRainbow] = useState(false)
	const [defaultExpand, setDefaultExpand] = useState(true)
	const [hidden, setHidden] = useState<Set<string>>(new Set())
	const [expanded, setExpanded] = useState<Set<string>>(new Set())
	const profile = (report[side] ?? report.server ?? report.client)!.profiling
	const tickTime = profile.timeSpan / profile.tickSpan 

	const toggleRow = (path: string) => {
		if (defaultExpand) {
			if (hidden.has(path)) {
				hidden.delete(path)
			} else {
				hidden.add(path)
			}
			setHidden(new Set(hidden))
		} else {
			if (expanded.has(path)) {
				expanded.delete(path)
			} else {
				expanded.add(path)
			}
			setExpanded(new Set(expanded))
		}
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
					{/* <div class="table-button table-prefix" onClick={() => setMode(mode === 'list' ? 'tree' : 'list')}>
						{Octicon.rows}
					</div> */}
					<div class="table-button table-prefix" onClick={() => setDefaultExpand(!defaultExpand)}>
						{defaultExpand ? Octicon.fold : Octicon.unfold}
					</div>
					<div class="table-button table-prefix" onClick={() => setRainbow(!rainbow)}>
						{Octicon.star}
					</div>
					Name
				</div>
				<div class="table-column table-button profile-parent-part">% Parent</div>
				<div class="table-column table-button profile-total-part">% Total</div>
				<div class="table-column table-button profile-time">Avg Time</div>
				<div class="table-column table-button profile-total-count">Count</div>
				<div class="table-column table-button profile-average-count">Avg Count</div>
			</div>
			<div class={`table-body${rainbow ? ' rainbow' : ''}`}>
				{mode === 'tree'
					? <ProfilingTree children={profile.dump} hidden={defaultExpand ? hidden : expanded} 
						defaultExpand={defaultExpand} path="root" level={0}
						tickTime={tickTime} onToggle={toggleRow} />
					: <ProfilingList children={profile.dump} tickTime={tickTime} />}
			</div>
		</div>
	</>
}

type ProfilingChildrenProps = {
	children: ProfileDump,
	hidden: Set<string>,
	defaultExpand: boolean,
	path: string,
	tickTime: number,
	level: number,
	onToggle: (path: string) => unknown,
}

function ProfilingTree({ children, hidden, defaultExpand, path, level, tickTime, onToggle }: ProfilingChildrenProps) {
	return <>
		{Object.entries(children)
			.map<[string, string, ProfileDump[string]]>(([n, p]) => [n, `${path}.${n}`, p])
			.map(([name, newPath, props]) => {
				const expanded = props.children && hidden.has(newPath) !== defaultExpand
				return <>
					<ProfileRow name={name} expanded={expanded} props={props} tickTime={tickTime}
						level={level} onClick={() => onToggle(newPath)} />
					{expanded && <ProfilingTree children={props.children!}
						hidden={hidden} defaultExpand={defaultExpand} path={newPath} level={level + 1} tickTime={tickTime} onToggle={onToggle}/>}
				</>
			})}
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
	expanded?: boolean,
	props: ProfileDump[string],
	tickTime: number,
	level?: number,
	onClick?: () => unknown,
}

function ProfileRow({ name, expanded, props, tickTime, level, onClick }: ProfileRowProps) {
	const [active, setActive] = useActive()

	const onContext = (evt: MouseEvent) => {
		evt.preventDefault()
		setActive(true)
	}

	const input = useRef<HTMLInputElement>(null)
	const doCopy = (evt: MouseEvent) => {
		evt.stopPropagation()
		input.current.select()
		document.execCommand('copy')
		setActive(false)
	}

	return <div class={`table-row ${level ? `level-${level}` : ''} ${active ? 'active' : ''}`} onClick={onClick} onContextMenuCapture={onContext}>
		<div class="profile-name">
			{expanded === true ? Octicon.chevron_down :
				expanded === false ? Octicon.chevron_right : null}
			{name.startsWith('ServerLevel[') ? name.split(' ').pop() : name}
		</div>
		{props.ofTotal !== undefined && <>
			<div class="profile-parent-part">{props.ofParent} %</div>
			<div class="profile-total-part">{props.ofTotal} %</div>
			<div class="profile-time">{(tickTime * props.ofTotal / 100).toFixed(3)} ms</div>
		</>}
		<div class="profile-total-count">{props.count}</div>
		<div class="profile-average-count">{props.averageCount}</div>
		{active && <div class="profile-menu">
			<input ref={input} type="text" value={name} style="display: block; width: 1px; height: 0; border: none;" />
			<div class="profile-menu-btn" onClick={doCopy}>Copy</div>
		</div>}
	</div>
}
