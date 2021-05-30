type TickGraphProps = {
	data: number[],
	title?: string,
}
export function TickGraph({ data, title }: TickGraphProps) {
	return <div class="tick-graph" style={`--max-value: ${Math.max(...data)}`}>
		{data.map(d => <div class="tick-value" style={`--value: ${d};`}></div>)}
		{title && <span class="tick-title">{title}</span>}
		{<span class="tick-info">avg: {Math.round(data.reduce((a,b) => (a+b)) / data.length)}</span>}
	</div>
}
