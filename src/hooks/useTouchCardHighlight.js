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
        const begin = (target, id, type) => {
            clear()
            const card = target.closest?.(cards)
            if (!card || !surface.contains(card)) return
            press = { card, id, type }
            card.setAttribute('data-touch-pressed', '')
        }
        // Browsers cancel pointer events when native scrolling begins. Touch
        // events retain the finger's lifetime without blocking normal scrolling.
        const touchStart = event => {
            if (press?.type === 'touch') return
            const touch = event.changedTouches[0]
            if (touch) begin(touch.target, touch.identifier, 'touch')
        }
        const touchEnd = event => {
            if (press?.type === 'touch' && Array.from(event.changedTouches).some(touch => touch.identifier === press.id)) clear()
        }
        const penDown = event => {
            if (event.pointerType === 'pen') begin(event.target, event.pointerId, 'pen')
        }
        const penEnd = event => { if (press?.type === 'pen' && press.id === event.pointerId) clear() }
        const menu = event => {
            // Keep holding a skill tile from opening an image/text callout.
            // Profile text and certificate links retain their normal selection menus.
            if (press?.card.matches('.expertise-card, .skill-card') && press.card.contains(event.target)) event.preventDefault()
        }
        surface.addEventListener('touchstart', touchStart, { passive: true })
        surface.addEventListener('pointerdown', penDown, { passive: true })
        surface.addEventListener('contextmenu', menu)
        window.addEventListener('touchend', touchEnd, { passive: true })
        window.addEventListener('touchcancel', touchEnd, { passive: true })
        window.addEventListener('pointerup', penEnd)
        window.addEventListener('pointercancel', penEnd)
        window.addEventListener('blur', clear)
        document.addEventListener('visibilitychange', clear)
        return () => {
            clear()
            surface.removeEventListener('touchstart', touchStart)
            surface.removeEventListener('pointerdown', penDown)
            surface.removeEventListener('contextmenu', menu)
            window.removeEventListener('touchend', touchEnd)
            window.removeEventListener('touchcancel', touchEnd)
            window.removeEventListener('pointerup', penEnd)
            window.removeEventListener('pointercancel', penEnd)
            window.removeEventListener('blur', clear)
            document.removeEventListener('visibilitychange', clear)
        }
    }, [])
    return root
}
