import { useState } from 'preact/hooks'
import type { Report } from '../../Report'

export function ProfilingPanel({ report }: { report: Report }) {
	const [side, setSide] = useState('server')
	console.log('Side', side)

	return <>
		<ul class="panels">
			<li class={`panel${side === 'server' ? ' active' : ''}`} onClick={() => setSide('server')}>
				Server
			</li>
			<li class={`panel${side === 'client' ? ' active' : ''}`} onClick={() => setSide('client')}>
				Client
			</li>
		</ul>
	</>
}
