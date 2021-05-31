type CardProps = {
	name: string,
	title?: string,
	items: string[],
}
export function CollectionCard({ title, items, name }: CardProps) {
	return <div class={`card area-${name}`}>
		{title && <div class="card-title">{title}</div>}
		<div class="collection-list">
			{items.map(i => <span class="card-value">
				{i}
			</span>)}
		</div>
	</div>
}
