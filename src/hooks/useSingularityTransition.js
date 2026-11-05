import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { addCameraDive } from './cameraDive'
import './singularity.css'

/**
 * Animate direct children marked data-singularity into the viewport center.
 * Keep Framer/CSS animations on their children: this hook owns only the carriers.
 */
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
        running.current = true // Synchronous guard, including rapid clicks/Enter presses.
        setIsEntering(true)
        const targets = [...stage.querySelectorAll('[data-singularity]')]
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const savedOrigin = stage.style.getPropertyValue('--singularity-origin')
        const entries = targets.map((element, index) => ({
            element,
            originalStyle: element.getAttribute('style'),
            dx: 0,
            dy: 0,
            spin: index % 2 === 0 ? 1 : -1,
            state: { pull: 0, z: 0, rx: 0, ry: 0, rz: 0, sx: 1, sy: 1, skew: 0, opacity: 1 },
        }))
        let completed = false
        const complete = () => {
            if (completed) return
            completed = true
            // NAVIGATION CALLBACK: called only after the stars-only arrival reveal.
            // Put window.location.href = '/your-page' or router.push('/your-page')
            // in onComplete (see handleEntryComplete in App.jsx).
            callbacks.current.onComplete?.()
        }
        const render = entry => {
            const { element, state: s, dx, dy } = entry
            // Translation is outside rotation/scale, so centers travel in straight
            // lines. The perspective origin is the destination, even at negative Z.
            element.style.transform = `translate3d(${dx * s.pull}px, ${dy * s.pull}px, ${s.z}px) rotateZ(${s.rz}deg) rotateY(${s.ry}deg) rotateX(${s.rx}deg) skewX(${s.skew}deg) scale(${s.sx}, ${s.sy})`
            element.style.opacity = String(s.opacity)
        }
        const measure = () => {
            const rect = stage.getBoundingClientRect()
            const centerX = window.innerWidth / 2 - rect.left
            const centerY = window.innerHeight / 2 - rect.top
            stage.style.setProperty('--singularity-origin', `${centerX}px ${centerY}px`)
            for (const entry of entries) {
                // offset metrics exclude our animated transforms. All carriers are
                // direct children of this positioned stage (their offsetParent).
                entry.dx = centerX - entry.element.offsetLeft - entry.element.offsetWidth / 2
                entry.dy = centerY - entry.element.offsetTop - entry.element.offsetHeight / 2
            }
            entries.forEach(render)
        }
        measure()
        stage.classList.add('singularity-active')
        const timeline = gsap.timeline({ paused: true, onComplete: complete })

        for (const [index, entry] of entries.entries()) {
            const { state, spin } = entry
            const start = reducedMotion ? 0 : index * 0.018
            const update = () => render(entry)
            if (reducedMotion) {
                timeline.to(state, { opacity: 0, duration: 0.22, ease: 'power1.out', onUpdate: update }, 0)
                continue
            }
            // Slow resistance, stretched tidal distortion, then an accelerating snap.
            timeline.to(state, { pull: 1, z: -1000, duration: 1.85, ease: 'expo.in', onUpdate: update }, start)
            timeline.to(state, {
                sx: 0.90, sy: 1.13, rz: spin * 10, rx: spin * 8,
                duration: 0.85, ease: 'power2.in', onUpdate: update,
            }, start)
            timeline.to(state, {
                sx: 0.34, sy: 2.5, rz: spin * 110, rx: spin * 48, ry: -spin * 25, skew: spin * 18,
                duration: 0.62, ease: 'power3.in', onUpdate: update,
            }, start + 0.85)
            timeline.to(state, {
                sx: 0, sy: 0, rz: spin * 540, rx: spin * 100, ry: -spin * 65, skew: 0,
                duration: 0.38, ease: 'expo.in', onUpdate: update,
            }, start + 1.47)
            timeline.to(state, { opacity: 0, duration: 0.14, ease: 'power2.in', onUpdate: update }, start + 1.71)
        }

        const restoreScenery = addCameraDive(timeline, callbacks.current.cinemaRef?.current, {
            reducedMotion,
            onPhase: phase => callbacks.current.onPhase?.(phase),
        })

        const media = window.matchMedia('(prefers-reduced-motion: reduce)')
        const onMotionChange = event => {
            if (event.matches) timeline.progress(1)
        }
        window.addEventListener('resize', measure, { passive: true })
        window.addEventListener('scroll', measure, { passive: true })
        media.addEventListener('change', onMotionChange)
        cleanup.current = () => {
            timeline.kill() // No delayed navigation after unmount/StrictMode cleanup.
            if (!completed) restoreScenery()
            window.removeEventListener('resize', measure)
            window.removeEventListener('scroll', measure)
            media.removeEventListener('change', onMotionChange)
            stage.classList.remove('singularity-active')
            if (savedOrigin) stage.style.setProperty('--singularity-origin', savedOrigin)
            else stage.style.removeProperty('--singularity-origin')
            for (const { element, originalStyle } of entries) {
                if (originalStyle === null) element.removeAttribute('style')
                else element.setAttribute('style', originalStyle)
            }
        }
        callbacks.current.onBegin?.() // Audio starts inside the user's click gesture.
        timeline.play(0)
    }, [stageRef])

    return { enter, isEntering }
}
