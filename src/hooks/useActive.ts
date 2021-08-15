import type { StateUpdater } from 'preact/hooks'
import { useEffect, useState } from 'preact/hooks'

export function useActive(initial = false) {
	const [active, setActive] = useState(initial)

	const hider = () => setActive(false)
	useEffect(() => {
		if (active) {
			document.body.addEventListener('click', hider)
			document.body.addEventListener('contextmenu', hider)
		}
		return () => {
			document.body.removeEventListener('click', hider)
			document.body.removeEventListener('contextmenu', hider)
		}
	}, [active])

	return [active, setActive] as [boolean, StateUpdater<boolean>]
}
