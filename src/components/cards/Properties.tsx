type CardProps = {
	name: string,
	title?: string,
	properties: [string, string][],
}
export function PropertiesCard({ title, properties, name }: CardProps) {
	return <div class={`card area-${name}`}>
		{title && <div class="card-title">{title}</div>}
		<div class="card-properties">
			{properties.map(p => <div class="card-property">
				<span class="card-key">{p[0]}: </span>
				<span class="card-value">{p[1]}</span>
			</div>)}
		</div>
	</div>
}
