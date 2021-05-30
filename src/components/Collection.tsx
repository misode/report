type CollectionProps = {
	title?: string,
	items: string[],
}
export function Collection({ title, items }: CollectionProps) {
	return <div class="card collection-card">
		{title && <div class="card-title">{title}</div>}
		{items.map(i => <span class="card-value">{i}</span>)}
	</div>
}
