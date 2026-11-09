import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
const ModelTurntable = lazy(() => import('./ModelTurntable'))

export default function SkillGallery({ skill, onClose }) {
    const dialogRef = useRef(null)
    const videoRef = useRef(null)
    const [index, setIndex] = useState(0)
    const [failed, setFailed] = useState(false)
    const item = skill.media[index]
    useEffect(() => {
        const video = videoRef.current
        if (!video) return
        // Muted inline playback works with mobile autoplay policies; controls remain available.
        let resumePlayback = false
        const play = () => { video.play().catch(() => { /* Keep native Play available if autoplay is blocked. */ }) }
        const onVisibility = () => {
            if (document.hidden) {
                resumePlayback = !video.paused
                video.pause()
            } else if (resumePlayback) {
                resumePlayback = false
                play()
            }
        }
        if (!document.hidden) play()
        document.addEventListener('visibilitychange', onVisibility)
        return () => {
            document.removeEventListener('visibilitychange', onVisibility)
            video.pause()
        }
    }, [item?.src])
    useEffect(() => {
        const dialog = dialogRef.current
        const opener = document.activeElement
        const overflow = document.body.style.overflow
        dialog.showModal()
        document.body.style.overflow = 'hidden'
        return () => {
            dialog.close()
            document.body.style.overflow = overflow
            if (opener?.isConnected) opener.focus({ preventScroll: true })
        }
    }, [])
    const select = next => {
        setFailed(false)
        setIndex(next)
        if (dialogRef.current) dialogRef.current.scrollTop = 0
    }
    return createPortal(
        <dialog ref={dialogRef} className="skill-gallery" style={{ '--expertise-accent': skill.accent }}
            aria-labelledby="skill-gallery-title" onCancel={event => { event.preventDefault(); onClose() }}
            onClick={event => { if (event.target === event.currentTarget) onClose() }}>
            <div className="skill-gallery-inner">
                <header className="skill-gallery-header">
                    <div><p className="expertise-category">{skill.category} / SHOWCASE</p>
                        <h2 id="skill-gallery-title" className="font-orbitron font-bold">{skill.title}</h2></div>
                    <button className="gallery-close" type="button" onClick={onClose} aria-label="Close gallery" autoFocus>×</button>
                </header>
                <div key={item?.id || 'empty'} className="skill-gallery-stage">
                    {item && !failed ? item.type === 'model'
                        ? <Suspense fallback={<p className="gallery-description">Loading viewer…</p>}><ModelTurntable key={item.src} src={item.src} /></Suspense>
                        : item.type === 'video'
                        ? <video ref={videoRef} key={item.src} src={item.src} poster={item.poster} autoPlay muted controls playsInline preload="metadata" aria-label={item.title} onError={() => setFailed(true)} />
                        : <img key={item.src} src={item.src} alt={item.alt || item.title} onError={() => setFailed(true)} />
                        : <div className="skill-gallery-empty" role="status">
                            <div className="gallery-empty-art" aria-hidden="true"><i className={`fas ${skill.icon}`} /><span className="gallery-play"><i className="fas fa-play" /></span></div>
                            <span className="gallery-status">{failed ? 'MEDIA UNAVAILABLE' : 'COMING SOON'}</span>
                            <h3 className="font-orbitron">{failed ? 'This file couldn’t load' : 'Work worth a closer look'}</h3>
                            <p>{failed ? 'Please try again later or browse another project.' : 'Photos and videos of my work will be shared here soon.'}</p>
                        </div>}
                </div>
                <footer className="skill-gallery-footer">
                    <div><p className="gallery-caption">{item ? item.title : `${skill.title} gallery`}</p>
                        <p className="gallery-description">{item ? item.description : 'Photos & videos'}</p></div>
                    {skill.media.length > 1 && <div className="gallery-navigation" aria-label="Gallery controls">
                        <button type="button" onClick={() => select((index - 1 + skill.media.length) % skill.media.length)} aria-label="Previous media">←</button>
                        <span aria-live="polite">{index + 1} / {skill.media.length}</span>
                        <button type="button" onClick={() => select((index + 1) % skill.media.length)} aria-label="Next media">→</button>
                    </div>}
                </footer>
                {skill.media.length > 1 && <div className="gallery-picker" aria-label="Choose a project">
                    {skill.media.map((media, i) => <button type="button" key={media.id} aria-pressed={index === i} onClick={() => select(i)}>
                        <i className={`fas ${media.type === 'model' ? 'fa-cube' : media.type === 'video' ? 'fa-play' : 'fa-image'}`} aria-hidden="true" /> {media.title}
                    </button>)}
                </div>}
            </div>
        </dialog>, document.body)
}
