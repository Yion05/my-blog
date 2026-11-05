import { useState } from 'react'
import { credentials } from '../data/credentials'
import './profile-sections.css'

const categories = [
    { id: 'certificate', label: 'Certificates', icon: 'fa-certificate', description: 'Learning milestones, courses, and qualifications.', empty: 'My learning milestones', note: 'Certificates will be shared here soon.' },
    { id: 'award', label: 'Awards', icon: 'fa-trophy', description: 'Recognition for achievements and contributions.', empty: 'Moments of recognition', note: 'Awards will be shared here soon.' },
]

export default function Credentials() {
    const [filter, setFilter] = useState('all')
    const visibleCategories = categories.filter(category => filter === 'all' || filter === category.id)
    return (
        <section className="max-w-5xl mx-auto credential-page" aria-labelledby="credentials-title">
            <p className="profile-eyebrow text-cyber-cyan">LEARNING & RECOGNITION</p>
            <h3 id="credentials-title" className="font-orbitron text-2xl md:text-3xl font-bold gradient-text mb-5">Certificates & Awards</h3>
            <p className="font-rajdhani text-gray-300 text-lg max-w-2xl mb-8">A collection of what I’ve learned and the milestones along the way.</p>
            <div className="credential-filters" role="group" aria-label="Filter achievements">
                {[{ id: 'all', label: 'All' }, ...categories].map(category => (
                    <button key={category.id} type="button" aria-pressed={filter === category.id}
                        onClick={() => setFilter(category.id)}>{category.label}</button>
                ))}
            </div>
            <div className="credential-grid" aria-live="polite">
                {visibleCategories.map(category => {
                    const entries = credentials.filter(entry => entry.type === category.id)
                    return <section key={category.id} className={`credential-category credential-category--${category.id}`}>
                        <div className="credential-category-heading">
                            <div className="credential-symbol"><i className={`fas ${category.icon}`} aria-hidden="true" /></div>
                            <div><h4 className="font-orbitron font-bold text-lg">{category.label}</h4>
                                <p className="font-rajdhani text-gray-400">{category.description}</p></div>
                        </div>
                        {entries.length ? entries.map(entry => <article className="credential-card" key={entry.id}>
                            {entry.image && <a href={entry.image} target="_blank" rel="noopener noreferrer" aria-label={`Open ${entry.title} image in a new tab`}>
                                <img src={entry.image} alt={entry.title} loading="lazy" decoding="async" className="credential-image" />
                            </a>}
                            <div className="credential-card-copy">
                                <p className="profile-eyebrow">{entry.issuer}{entry.date && ` · ${entry.date}`}</p>
                                <h5 className="font-orbitron text-lg text-white">{entry.title}</h5>
                                <p className="font-rajdhani text-gray-300 mt-3">{entry.description}</p>
                                {entry.verificationUrl && <a className="credential-verify" href={entry.verificationUrl} target="_blank" rel="noopener noreferrer">Verify credential ↗</a>}
                            </div>
                        </article>) : <article className="credential-card credential-empty">
                            <div className="credential-preview" aria-hidden="true">
                                <div className="credential-paper"><span /><span /><i className={`fas ${category.icon}`} /><span /></div>
                                <span className="credential-coming">COMING SOON</span>
                            </div>
                            <div className="credential-card-copy">
                                <h5 className="font-orbitron text-lg text-white">{category.empty}</h5>
                                <p className="font-rajdhani text-gray-400 mt-3">{category.note}</p>
                            </div>
                        </article>}
                    </section>
                })}
            </div>
        </section>
    )
}
