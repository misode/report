import { Report } from './Report'
import './style.css'

document.addEventListener('DOMContentLoaded', () => {

	document.body.addEventListener('drop', async e => {
		e.preventDefault()
		if(!e.dataTransfer) return

		for (let i = 0; i < e.dataTransfer.items.length; i++) {
			const item = e.dataTransfer.items[i]
			if (item.kind === 'file' && item.type.match(/^application\/(x-)?zip(-compressed)?$/)) {
				const report = await Report.fromZip(item.getAsFile()!)
				console.log(report)
				document.body.innerHTML = JSON.stringify(report, null, 2)
			}
		}
	}, false)

	document.body.addEventListener('dragover', e => {
		e.preventDefault()
	}, false)
})
