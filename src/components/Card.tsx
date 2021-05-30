type CardProps = {
	title?: string,
	properties: [string, string][],
}
export function Card({ title, properties }: CardProps) {
	return <div class="card">
		{title && <div class="card-title">{title}</div>}
		{properties.map(p => <div class="card-property">
			<span class="card-key">{p[0]}: </span>
			<span class="card-value">{p[1]}</span>
		</div>)}
	</div>
}
