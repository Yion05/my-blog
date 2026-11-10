import { useEffect, useRef } from 'react'

const cards = '.profile-depth-card, .expertise-card, .credential-card, .skill-card'

/** Touch feedback is separate from hover, so it never sticks after a phone tap. */
export default function useTouchCardHighlight() {
    const root = useRef(null)
    useEffect(() => {
        const surface = root.current
        if (!surface) return
        let press = null
        const clear = () => {
            press?.card.removeAttribute('data-touch-pressed')
            press = null
        }
        const down = event => {
            if (event.pointerType !== 'touch' && event.pointerType !== 'pen') return
            clear()
            const card = event.target.closest?.(cards)
            if (!card || !surface.contains(card)) return
            press = { card, id: event.pointerId, x: event.clientX, y: event.clientY }
            card.setAttribute('data-touch-pressed', '')
        }
        const move = event => {
            if (press?.id === event.pointerId && Math.hypot(event.clientX - press.x, event.clientY - press.y) > 12) clear()
        }
        const end = event => { if (press?.id === event.pointerId) clear() }
        const menu = event => {
            // Keep holding a skill tile from opening an image/text callout.
            // Profile text and certificate links retain their normal selection menus.
            if (press?.card.matches('.expertise-card, .skill-card') && press.card.contains(event.target)) event.preventDefault()
        }
        surface.addEventListener('pointerdown', down, { passive: true })
        surface.addEventListener('contextmenu', menu)
        window.addEventListener('pointermove', move, { passive: true })
        window.addEventListener('pointerup', end)
        window.addEventListener('pointercancel', end)
        window.addEventListener('blur', clear)
        document.addEventListener('visibilitychange', clear)
        return () => {
            clear()
            surface.removeEventListener('pointerdown', down)
            surface.removeEventListener('contextmenu', menu)
            window.removeEventListener('pointermove', move)
            window.removeEventListener('pointerup', end)
            window.removeEventListener('pointercancel', end)
            window.removeEventListener('blur', clear)
            document.removeEventListener('visibilitychange', clear)
        }
    }, [])
    return root
}
