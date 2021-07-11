type CardProps = {
	name: string,
	title?: string,
	properties: [string, string | undefined][],
	defaults?: Record<string, string>,
}
export function PropertiesCard({ title, properties, name, defaults = {} }: CardProps) {
	return <div class={`card area-${name}`}>
		{title && <div class="card-title">{title}</div>}
		<div class="card-properties">
			{properties.filter(p => typeof p[1] === 'string').map(p => (
				<div class={`card-property${defaults[p[0]] !== undefined && defaults[p[0]] !== p[1] ? ' altered' : ''}`}>
					<span class="card-key">{p[0]}: </span>
					<span class="card-value">{p[1]}</span>
				</div>
			))}
		</div>
	</div>
}
