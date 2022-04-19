type CardProps = {
	name: string,
	title?: string,
	text?: string,
}
export function TextCard({ title, name, text }: CardProps) {
	return <div class={`card area-${name}`}>
		{title && <div class="card-title">{title}</div>}
		{text && <pre class="card-text">{text}</pre>}
	</div>
}
