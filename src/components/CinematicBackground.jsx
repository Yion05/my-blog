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
                if (captureFrame.current?.(dive.current)) return
            } catch { /* WebGL unavailable: the black transition still completes. */ }
            const canvas = dive.current
            canvas.width = Math.round(window.innerWidth)
            canvas.height = Math.round(window.innerHeight)
            const context = canvas.getContext('2d', { alpha: false })
            if (context) {
                context.fillStyle = '#000'
                context.fillRect(0, 0, canvas.width, canvas.height)
            }
        },
    }), [])

    // The dive uses a captured frame, so release the WebGL scene as soon as
    // playback starts instead of keeping its GPU resources during the zoom.
    const showLive = phase === 'landing'
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
