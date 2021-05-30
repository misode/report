type TickGraphProps = {
	name: string,
	data: number[],
	goal: number,
	title?: string,
}
export function GraphCard({ data, goal, title, name }: TickGraphProps) {
	const average = (data.reduce((a,b) => (a+b)) / data.length).toFixed(3)
	return <div class={`card graph area-${name}`} style={`--goal: ${goal * 1.5}`}>
		{data.map(v => {
			const c = `hsl(${Math.max(0, 150 - 100 * v / goal)}deg, 80%, 55%)`
			return <div class="graph-value" style={`--value: ${v}; --color: ${c};`}></div>
		})}
		{title && <span class="graph-title">{title}</span>}
		<span class="graph-info">avg: {average}</span>
	</div>
}
