import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { credentials } from '../data/credentials'
import './profile-sections.css'
import ProfileDepth from './ProfileDepth'

const categories = [
    { id: 'certificate', label: 'Certificates', icon: 'fa-certificate' },
    { id: 'award', label: 'Awards', icon: 'fa-trophy' },
]

function CredentialViewer({ entry, onClose }) {
    const dialogRef = useRef(null)
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
    return createPortal(
        <dialog ref={dialogRef} className="skill-gallery credential-viewer" aria-labelledby="credential-viewer-title"
            onCancel={event => { event.preventDefault(); onClose() }}
            onClick={event => { if (event.target === event.currentTarget) onClose() }}>
            <div>
                <header className="skill-gallery-header">
                    <div>
                        <h2 id="credential-viewer-title" className="font-orbitron font-bold">{entry.title}</h2>
                        <p className="gallery-description">{entry.issuer}{entry.date && ` · ${entry.date}`}</p>
                    </div>
                    <button type="button" className="gallery-close" aria-label="Close image" onClick={onClose} autoFocus>×</button>
                </header>
                <div className="credential-viewer-image"><img src={entry.image} alt={entry.title} /></div>
            </div>
        </dialog>, document.body)
}

export default function Credentials() {
    const [filter, setFilter] = useState('all')
    const [selectedEntry, setSelectedEntry] = useState(null)
    const reducedMotion = useReducedMotion()
    const visibleCategories = categories.filter(category => filter === 'all' || filter === category.id)
    return (
        <section className="max-w-5xl mx-auto credential-page" aria-labelledby="credentials-title">
            <h3 id="credentials-title" className="font-orbitron text-2xl md:text-3xl font-bold gradient-text mb-5">Certificates & Awards</h3>
            <div className="credential-filters" role="group" aria-label="Filter achievements">
                {[{ id: 'all', label: 'All' }, ...categories].map(category => (
                    <button key={category.id} type="button" aria-pressed={filter === category.id}
                        onClick={() => setFilter(category.id)}>{category.label}</button>
                ))}
            </div>
            <div className="credential-grid" aria-live="polite">
                {visibleCategories.map((category, index) => {
                    const entries = credentials.filter(entry => entry.type === category.id)
                    return <motion.section key={`${filter}-${category.id}`} className={`credential-category credential-category--${category.id}`}
                        initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.45, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}>
                        <div className="credential-category-heading">
                            <div className="credential-symbol"><i className={`fas ${category.icon}`} aria-hidden="true" /></div>
                            <h4 className="font-orbitron font-bold text-lg">{category.label}</h4>
                        </div>
                        {entries.length ? entries.map(entry => <ProfileDepth variant="card" key={entry.id}><article className="credential-card">
                            {entry.image && <button type="button" className="credential-image-button" aria-haspopup="dialog"
                                onClick={() => setSelectedEntry(entry)} aria-label={`View ${entry.title} image`}>
                                <img src={entry.image} alt={entry.title} loading="lazy" decoding="async" className="credential-image" />
                                <span className="credential-image-hint">View full size ⤢</span>
                            </button>}
                            <div className="credential-card-copy">
                                <p className="profile-eyebrow"><span className="credential-issuer">{entry.issuer}</span>{entry.date && <><span aria-hidden="true"> · </span><span className="credential-highlight--purple">{entry.date}</span></>}</p>
                                <h5 className="credential-title font-orbitron text-lg">{entry.title}</h5>
                                <p className="font-rajdhani text-gray-300 mt-3">{entry.descriptionSegments
                                    ? entry.descriptionSegments.map((segment, index) => <span key={index} className={segment.tone ? `credential-highlight credential-highlight--${segment.tone}` : undefined}>{segment.text}</span>)
                                    : entry.description}</p>
                                {entry.verificationUrl && <a className="credential-verify" href={entry.verificationUrl} target="_blank" rel="noopener noreferrer">Verify credential ↗</a>}
                            </div>
                        </article></ProfileDepth>) : <ProfileDepth variant="card"><article className="credential-card credential-empty">
                            <div className="credential-preview" aria-hidden="true">
                                <div className="credential-paper"><span /><span /><i className={`fas ${category.icon}`} /><span /></div>
                                <span className="credential-coming">COMING SOON</span>
                            </div>
                        </article></ProfileDepth>}
                    </motion.section>
                })}
            </div>
            {selectedEntry && <CredentialViewer entry={selectedEntry} onClose={() => setSelectedEntry(null)} />}
        </section>
    )
}
