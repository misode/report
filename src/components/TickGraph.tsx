type TickGraphProps = {
	data: number[],
	goal: number,
	title?: string,
}
export function TickGraph({ data, goal, title }: TickGraphProps) {
	const average = (data.reduce((a,b) => (a+b)) / data.length).toFixed(3)
	return <div class="card tick-graph" style={`--goal: ${goal * 1.5}`}>
		{data.map(v => {
			const c = `hsl(${Math.max(0, 150 - 100 * v / goal)}deg, 80%, 55%)`
			return <div class="tick-value" style={`--value: ${v}; --color: ${c};`}></div>
		})}
		{title && <span class="tick-title">{title}</span>}
		<span class="tick-info">avg: {average}</span>
	</div>
}
