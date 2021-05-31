import { useState } from 'preact/hooks'

type CardProps = {
	name: string,
	columns: string[],
	data: string[][],
}
export function TableCard({ name, columns, data }: CardProps) {
	const [limit, setLimit] = useState(Math.min(100, data.length))

	return <div class={`card table area-${name}`}>
		<div class="table-row table-head">
			{columns.map(column => <div class="table-column">
				{column}
			</div>)}
		</div>
		<div class="table-body">
			{data.slice(0, limit).map(row => <div class="table-row">
				{row.map(column => <div class="table-column">
					{column}
				</div>)}
			</div>
			)}
			{data.length > limit && <div class="table-row table-foot">
				<div>{data.length - limit} entries hidden</div>
				{data.length - limit > 100 && <div class="table-action" onClick={() => setLimit(limit + 100)}>
					Show 100 more
				</div>}
				<div class="table-action" onClick={() => setLimit(data.length)}>Show all</div>
			</div>}
			{data.length === 0 && <div class="table-row table-foot">
				<div>None</div>
			</div>}
		</div>
	</div>
}
