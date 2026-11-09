import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { addCameraDive } from './cameraDive'
import { accretionPosition } from './accretionPath'
import './singularity.css'

/** GSAP owns the outer carriers; the original fonts, colors and child effects remain intact. */
export default function useSingularityTransition(stageRef, { onBegin, onComplete, cinemaRef, onPhase }) {
    const [isEntering, setIsEntering] = useState(false)
    const running = useRef(false)
    const cleanup = useRef(() => {})
    const callbacks = useRef({ onBegin, onComplete, onPhase, cinemaRef })
    callbacks.current = { onBegin, onComplete, onPhase, cinemaRef }
    useEffect(() => () => cleanup.current(), [])

    const enter = useCallback(() => {
        const stage = stageRef.current
        if (!stage || running.current) return
        running.current = true
        setIsEntering(true)
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const savedOrigin = stage.style.getPropertyValue('--singularity-origin')
        const camera = { zoom: 1, bank: 0, flow: 0, lens: 0, rush: 0, time: 0 }
        const entries = [...stage.querySelectorAll('[data-singularity]')].map((element, index) => ({
            element, index, originalStyle: element.getAttribute('style'), dx: 0, dy: 0,
            state: { capture: 0, orbit: 0, infall: 0, scale: 1, stretch: 1, opacity: 1 },
            echoes: [], history: [],
        }))
        let width = window.innerWidth, height = window.innerHeight, completed = false
        const render = entry => {
            const { element, state: s } = entry
            if (reducedMotion) { element.style.opacity = String(s.opacity); return }
            const p = accretionPosition({ x: -entry.dx, y: -entry.dy, index: entry.index,
                width, height, capture: s.capture, orbit: s.orbit, infall: s.infall })
            const bank = camera.bank
            const zoom = Math.min(camera.zoom, 2.3)
            const x = (p.x * Math.cos(bank) - p.y * Math.sin(bank)) * zoom
            const y = (p.x * Math.sin(bank) + p.y * Math.cos(bank)) * zoom
            const z = s.capture * (-90 + p.depth * 150) - s.infall * 850
            // Compensate translation for the stage's perspective: the projected
            // trajectory stays on the disk even while each card moves through Z.
            const perspective = 1 - z / 1000
            const tx = entry.dx + x * perspective, ty = entry.dy + y * perspective
            const rotation = p.tangent * 180 / Math.PI * s.capture + bank * 180 / Math.PI
            const transform = `translate3d(${tx}px, ${ty}px, ${z}px) rotateZ(${rotation}deg) rotateX(${s.capture * 44 * p.depth}deg) skewX(${s.infall * 24}deg) scale(${s.scale * s.stretch}, ${s.scale / s.stretch})`
            const core = Math.min(height * .265, width * .38)
            const behind = p.depth < 0 ? Math.max(0, 1 - Math.hypot(p.x,p.y) / core) * s.capture : 0
            const opacity = s.opacity * (1 - behind * .94)
            element.style.transform = transform
            element.style.opacity = String(opacity)
            entry.history.unshift({ transform, opacity })
            if (entry.history.length > 9) entry.history.pop()
            entry.echoes.forEach((echo, i) => {
                const past = entry.history[Math.min(entry.history.length - 1, (i + 1) * 4)]
                echo.style.transform = past.transform
                echo.style.opacity = String(past.opacity * s.capture * (1 - s.infall) * (i === 0 ? .16 : .07))
            })
        }
        const measure = () => {
            width = window.innerWidth; height = window.innerHeight
            const rect = stage.getBoundingClientRect()
            const centerX = width / 2 - rect.left, centerY = height / 2 - rect.top
            stage.style.setProperty('--singularity-origin', `${centerX}px ${centerY}px`)
            for (const entry of entries) {
                const el = entry.element
                entry.dx = centerX - el.offsetLeft - el.offsetWidth / 2
                entry.dy = centerY - el.offsetTop - el.offsetHeight / 2
                entry.history.length = 0
                entry.echoes.forEach(echo => Object.assign(echo.style, {
                    left: `${el.offsetLeft}px`, top: `${el.offsetTop}px`, width: `${el.offsetWidth}px`, height: `${el.offsetHeight}px`,
                }))
            }
            entries.forEach(render)
        }
        if (!reducedMotion) {
            entries.filter(entry => entry.element.querySelector('h1, p, button')).forEach(entry => {
                for (let i = 0; i < 2; i++) {
                    const echo = entry.element.cloneNode(true)
                    echo.removeAttribute('data-singularity')
                    echo.removeAttribute('id')
                    echo.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'))
                    echo.classList.add('singularity-echo')
                    echo.setAttribute('aria-hidden', 'true')
                    echo.inert = true
                    echo.style.opacity = '0'
                    stage.appendChild(echo)
                    entry.echoes.push(echo)
                }
            })
        }
        measure()
        stage.classList.add('singularity-active')
        const timeline = gsap.timeline({ paused: true, onComplete: () => {
            if (completed) return
            completed = true
            // NAVIGATION CALLBACK: only after the disk orbit, plunge, blackout,
            // and stars reveal. Put router.push/location.href in onComplete.
            callbacks.current.onComplete?.()
        } })
        for (const entry of entries) {
            const s = entry.state, start = entry.index * .018
            if (reducedMotion) {
                timeline.to(s, { opacity: 0, duration: .22 }, 0)
                continue
            }
            timeline.to(s, { capture: 1, scale: .52, duration: 1.05, ease: 'power2.inOut' }, start)
            timeline.to(s, { orbit: 1.3, duration: 1.15, ease: 'power1.in' }, start + .25)
            timeline.to(s, { orbit: 5.2, duration: 1.2, ease: 'power2.in' }, start + 1.4)
            timeline.to(s, { orbit: 7, duration: .62, ease: 'power2.in' }, start + 2.6)
            timeline.to(s, { infall: .3, scale: .27, stretch: 1.8, duration: 1.2, ease: 'power1.in' }, start + 1.4)
            timeline.to(s, { stretch: 4.8, duration: .4, ease: 'power2.in' }, start + 2.6)
            timeline.to(s, { infall: 1, duration: .62, ease: 'expo.in' }, start + 2.6)
            timeline.to(s, { scale: 0, opacity: 0, duration: .22, ease: 'power3.in' }, start + 3)
        }
        const scenery = addCameraDive(timeline, callbacks.current.cinemaRef?.current, {
            reducedMotion, camera, onPhase: phase => callbacks.current.onPhase?.(phase),
        })
        timeline.eventCallback('onUpdate', () => {
            entries.forEach(render)
            scenery.render()
        })
        const media = window.matchMedia('(prefers-reduced-motion: reduce)')
        const onMotionChange = event => { if (event.matches) timeline.progress(1) }
        window.addEventListener('resize', measure, { passive: true })
        window.addEventListener('scroll', measure, { passive: true })
        media.addEventListener('change', onMotionChange)
        cleanup.current = () => {
            timeline.kill()
            scenery.dispose(!completed)
            window.removeEventListener('resize', measure)
            window.removeEventListener('scroll', measure)
            media.removeEventListener('change', onMotionChange)
            stage.classList.remove('singularity-active')
            if (savedOrigin) stage.style.setProperty('--singularity-origin', savedOrigin)
            else stage.style.removeProperty('--singularity-origin')
            for (const { element, originalStyle, echoes } of entries) {
                echoes.forEach(echo => echo.remove())
                if (originalStyle === null) element.removeAttribute('style')
                else element.setAttribute('style', originalStyle)
            }
        }
        callbacks.current.onBegin?.()
        timeline.play(0)
    }, [stageRef])
    return { enter, isEntering }
}
