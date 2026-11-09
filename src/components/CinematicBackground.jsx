import { forwardRef, useImperativeHandle, useRef } from 'react'
import ThreeBackground from './ThreeBackground'
import DeepSpace from './DeepSpace'
import '../hooks/cinematicJourney.css'

/** Persistent scenery: it survives Hero unmounting after the arrival reveal. */
const CinematicBackground = forwardRef(function CinematicBackground({ phase }, ref) {
    const live = useRef(null)
    const dive = useRef(null)
    const stars = useRef(null)
    const blackout = useRef(null)
    const captureFrame = useRef(null)
    useImperativeHandle(ref, () => ({
        live: live.current,
        dive: dive.current,
        stars: stars.current,
        blackout: blackout.current,
        capture() {
            try {
                if (captureFrame.current?.(dive.current)) return true
            } catch { /* WebGL unavailable: the black transition still completes. */ }
            const canvas = dive.current
            canvas.width = Math.round(window.innerWidth)
            canvas.height = Math.round(window.innerHeight)
            const context = canvas.getContext('2d', { alpha: false })
            if (context) {
                context.fillStyle = '#000'
                context.fillRect(0, 0, canvas.width, canvas.height)
            }
            return false
        },
        render(state) { captureFrame.current?.update(state) },
    }), [])

    // Keep the procedural disk alive only through the dive. The blackout
    // unmounts the entire landing renderer before any other page is shown.
    const showLive = phase === 'landing' || phase === 'diving'
    return (
        <>
            <div className="cinema-background" aria-hidden="true">
                <div ref={stars} className="cinema-stars">
                    <DeepSpace active={phase === 'stars' || phase === 'arrived'} meteors={phase === 'arrived'} />
                </div>
                <div ref={live} className="cinema-live">
                    {showLive && <ThreeBackground captureRef={captureFrame} paused={phase !== 'landing'} />}
                </div>
                <canvas ref={dive} className="cinema-dive" />
            </div>
            <div ref={blackout} className="cinema-blackout" aria-hidden="true" />
        </>
    )
})
export default CinematicBackground
