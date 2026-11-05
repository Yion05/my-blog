import { useEffect, useRef } from 'react'

function seededRandom(seed) {
    let value = seed >>> 0
    return () => ((value = (value * 1664525 + 1013904223) >>> 0) / 4294967296)
}

// Glow textures are painted once, then reused with drawImage for every star.
function createStarSprite(tint, flare = false) {
    const sprite = document.createElement('canvas')
    sprite.width = sprite.height = 64
    const context = sprite.getContext('2d')
    if (!context) return sprite
    const glow = context.createRadialGradient(32, 32, 0, 32, 32, 31)
    glow.addColorStop(0, 'rgba(255,255,255,1)')
    glow.addColorStop(0.07, 'rgba(255,255,255,0.95)')
    glow.addColorStop(0.17, `rgba(${tint},0.62)`)
    glow.addColorStop(0.38, `rgba(${tint},0.12)`)
    glow.addColorStop(1, `rgba(${tint},0)`)
    context.fillStyle = glow
    context.fillRect(0, 0, 64, 64)
    if (flare) {
        context.strokeStyle = `rgba(${tint},0.16)`
        context.lineWidth = 0.7
        context.beginPath()
        context.moveTo(32, 8)
        context.lineTo(32, 56)
        context.moveTo(15, 32)
        context.lineTo(49, 32)
        context.stroke()
    }
    return sprite
}

/** Native-resolution stars with occasional fast, tapered shooting stars. */
export default function DeepSpace({ active = false, meteors = false }) {
    const canvasRef = useRef(null)
    const activeRef = useRef(active)
    const meteorsRef = useRef(meteors)
    const reconcileRef = useRef(null)
    activeRef.current = active
    meteorsRef.current = meteors

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d', { alpha: false })
        if (!context) return undefined
        const random = seededRandom(620195)
        const stars = Array.from({ length: 1500 }, () => ({
            x: random(),
            y: random(),
            depth: random(),
            size: 0.28 + Math.pow(random(), 4) * 1.5,
            alpha: 0.3 + random() * 0.62,
            phase: random() * Math.PI * 2,
            frequency: 0.18 + random() * 0.24,
            sprite: random() < 0.23 ? 1 : random() < 0.035 ? 2 : 0,
        }))
        const sprites = [
            createStarSprite('232,240,255'),
            createStarSprite('162,199,255'),
            createStarSprite('238,244,255', true),
        ]
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        const mobileQuery = window.matchMedia('(pointer: coarse), (max-width: 767px)')
        let width = 1
        let height = 1
        let pixelRatio = 1
        let elapsed = 0
        let lastTime = 0
        let lastPaint = 0
        let frame = 0
        let disposed = false
        let resolutionQuery
        let meteor = null
        let nextMeteor = 2.5

        const paintMeteor = () => {
            if (!meteorsRef.current || motionQuery.matches) return
            if (!meteor && elapsed >= nextMeteor) {
                meteor = {
                    born: elapsed, duration: 0.65 + random() * 0.3,
                    x: width * (0.15 + random() * 0.85),
                    y: height * random() * 0.45,
                    speed: 850 + random() * 450,
                    length: 100 + random() * 90,
                }
            }
            if (!meteor) return
            const age = elapsed - meteor.born
            const progress = age / meteor.duration
            if (progress >= 1) {
                meteor = null
                nextMeteor = elapsed + 2.5 + random() * 3.5
                return
            }
            // Head moves down-left; the fading tail always trails up-right.
            const dx = -0.82
            const dy = 0.57
            const x = meteor.x + dx * meteor.speed * age
            const y = meteor.y + dy * meteor.speed * age
            const tailX = x - dx * meteor.length
            const tailY = y - dy * meteor.length
            const trail = context.createLinearGradient(tailX, tailY, x, y)
            trail.addColorStop(0, 'rgba(150,190,255,0)')
            trail.addColorStop(0.75, 'rgba(185,215,255,0.35)')
            trail.addColorStop(1, 'rgba(245,250,255,0.95)')
            context.globalAlpha = Math.min(1, progress / 0.1, (1 - progress) / 0.28)
            context.strokeStyle = trail
            context.lineWidth = 1.4
            context.lineCap = 'round'
            context.beginPath()
            context.moveTo(tailX, tailY)
            context.lineTo(x, y)
            context.stroke()
            context.drawImage(sprites[1], x - 5, y - 5, 10, 10)
        }

        const paint = () => {
            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
            context.globalAlpha = 1
            context.fillStyle = '#000000'
            context.fillRect(0, 0, width, height)
            const count = mobileQuery.matches
                ? Math.min(220, Math.max(100, Math.round(width * height / 2600)))
                : Math.min(stars.length, Math.max(180, Math.round(width * height / 1800)))
            for (let i = 0; i < count; i++) {
                const star = stars[i]
                const padding = 18
                const x = (star.x * (width + padding * 2) + elapsed * (0.16 + star.depth * 0.45)) % (width + padding * 2) - padding
                const y = (star.y * (height + padding * 2) + elapsed * (0.04 + star.depth * 0.1)) % (height + padding * 2) - padding
                const twinkle = motionQuery.matches ? 1 : 0.88 + Math.sin(elapsed * star.frequency + star.phase) * 0.12
                const size = 3.2 + star.size * 6
                context.globalAlpha = star.alpha * twinkle
                context.drawImage(sprites[star.sprite], x - size / 2, y - size / 2, size, size)
            }
            paintMeteor()
            context.globalAlpha = 1
        }
        const shouldAnimate = () => activeRef.current && !document.hidden && !motionQuery.matches && !disposed
        const tick = timestamp => {
            frame = 0
            if (!shouldAnimate()) return
            if (lastTime) elapsed += Math.min((timestamp - lastTime) / 1000, 0.1)
            lastTime = timestamp
            // Keep the decorative canvas from competing with scrolling and page
            // animations, especially on 90/120 Hz phone displays.
            const interval = 1000 / (mobileQuery.matches ? 30 : 60)
            if (!lastPaint || timestamp - lastPaint >= interval - 0.5) {
                paint()
                lastPaint = timestamp - ((timestamp - lastPaint) % interval)
            }
            frame = requestAnimationFrame(tick)
        }
        const reconcile = () => {
            cancelAnimationFrame(frame)
            frame = 0
            lastTime = 0
            lastPaint = 0
            if (disposed) return
            paint()
            if (shouldAnimate()) frame = requestAnimationFrame(tick)
        }
        const resize = () => {
            if (disposed) return
            const bounds = canvas.getBoundingClientRect()
            width = Math.max(1, bounds.width || window.innerWidth)
            height = Math.max(1, bounds.height || window.innerHeight)
            pixelRatio = Math.min(mobileQuery.matches ? 1.25 : 2, Math.max(1, window.devicePixelRatio || 1))
            const nextWidth = Math.round(width * pixelRatio)
            const nextHeight = Math.round(height * pixelRatio)
            if (canvas.width === nextWidth && canvas.height === nextHeight) return
            canvas.width = nextWidth
            canvas.height = nextHeight
            // Draw once even while inactive, so the arrival fade never reveals an empty frame.
            reconcile()
        }
        const onResolutionChange = () => {
            resolutionQuery?.removeEventListener('change', onResolutionChange)
            resolutionQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio || 1}dppx)`)
            resolutionQuery.addEventListener('change', onResolutionChange)
            resize()
        }
        const observer = new ResizeObserver(resize)
        observer.observe(canvas)
        reconcileRef.current = reconcile
        window.addEventListener('resize', resize, { passive: true })
        document.addEventListener('visibilitychange', reconcile)
        motionQuery.addEventListener('change', reconcile)
        mobileQuery.addEventListener('change', resize)
        onResolutionChange()

        return () => {
            disposed = true
            cancelAnimationFrame(frame)
            observer.disconnect()
            window.removeEventListener('resize', resize)
            document.removeEventListener('visibilitychange', reconcile)
            motionQuery.removeEventListener('change', reconcile)
            mobileQuery.removeEventListener('change', resize)
            resolutionQuery?.removeEventListener('change', onResolutionChange)
            reconcileRef.current = null
            canvas.width = canvas.height = 1
        }
    }, [])

    useEffect(() => {
        reconcileRef.current?.()
    }, [active])

    return <canvas ref={canvasRef} className="deep-space-canvas" aria-hidden="true" />
}
