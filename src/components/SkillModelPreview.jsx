import { Component, lazy, Suspense, useEffect, useRef, useState } from 'react'

const EeveeCanvas = lazy(() => import('./ModelTurntable').then(module => ({ default: module.EeveeCardCanvas })))

class PreviewBoundary extends Component {
    state = { failed: false }
    static getDerivedStateFromError() { return { failed: true } }
    render() { return this.state.failed ? null : this.props.children }
}

export default function SkillModelPreview({ paused }) {
    const host = useRef(null)
    const [inView, setInView] = useState(false)
    const [visible, setVisible] = useState(!document.hidden)
    const [reduced, setReduced] = useState(false)
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting))
        observer.observe(host.current)
        const media = window.matchMedia('(prefers-reduced-motion: reduce)')
        const motion = () => setReduced(media.matches)
        const visibility = () => setVisible(!document.hidden)
        motion()
        media.addEventListener('change', motion)
        document.addEventListener('visibilitychange', visibility)
        return () => {
            observer.disconnect()
            media.removeEventListener('change', motion)
            document.removeEventListener('visibilitychange', visibility)
        }
    }, [])
    return <span ref={host} className="expertise-model-preview" aria-hidden="true">
        {inView && visible && <PreviewBoundary><Suspense fallback={null}>
            <EeveeCanvas active={!paused && !reduced} />
        </Suspense></PreviewBoundary>}
    </span>
}
