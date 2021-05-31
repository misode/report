import { useState } from 'preact/hooks'
import type { Report } from '../../Report'
import { TableCard } from '../cards/Table'

export function LevelsPanel(report: Report) {
	const [table, setTable] = useState('entities')

	const entities = () => Object.entries(report.server.levels)
		.flatMap(([d, l]) => l.entities.map(e => ({ ...e, dimension: d })))
		.map(e => [
			e.type.replace(/^minecraft:/, ''),
			`${Math.round(e.x)} ${Math.round(e.y)} ${Math.round(e.z)}`,
			e.dimension.replace(/^minecraft:/, ''),
		])

	const blockEntities = () => Object.entries(report.server.levels)
		.flatMap(([d, l]) => l.blockEntities.map(b => ({ ...b, dimension: d })))
		.map(b => [
			b.type.replace(/^minecraft:/, ''),
			`${Math.round(b.x)} ${Math.round(b.y)} ${Math.round(b.z)}`,
			b.dimension.replace(/^minecraft:/, ''),
		])

	const chunks = () => Object.entries(report.server.levels)
		.flatMap(([d, l]) => l.chunks.map(c => ({ ...c, dimension: d })))
		.map(c => [
			`${Math.round(c.x)} ${Math.round(c.z)}`,
			c.dimension.replace(/^minecraft:/, ''),
			`${c.level}`,
			c.status === 'minecraft:full'
				? c.fullStatus?.toLowerCase() ?? 'unknown'
				: c.status?.replace(/^minecraft:/, '') ?? 'unknown',
		])

	return <>
		<ul class="panels">
			<li class={`panel${table === 'entities' ? ' active' : ''}`} onClick={() => setTable('entities')}>
				Entities
			</li>
			<li class={`panel${table === 'block-entities' ? ' active' : ''}`} onClick={() => setTable('block-entities')}>
				Block entities
			</li>
			<li class={`panel${table === 'chunks' ? ' active' : ''}`} onClick={() => setTable('chunks')}>
				Chunks
			</li>
		</ul>
		{table === 'entities' &&
			<TableCard name="entities" columns={['Type', 'Position', 'Dimension']} data={entities()}/>}
		{table === 'block-entities' &&
			<TableCard name="block-entities" columns={['Type', 'Position', 'Dimension']} data={blockEntities()}/>}
		{table === 'chunks' &&
			<TableCard name="chunks" columns={['Position', 'Dimension', 'Level', 'Status']} data={chunks()}/>}
	</>
}
