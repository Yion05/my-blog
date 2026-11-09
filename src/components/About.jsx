import { useState } from 'react'
import SkillModelPreview from './SkillModelPreview'
import SkillGallery from './SkillGallery'
import { skillShowcases } from '../data/skillShowcases'
import { motion, useReducedMotion } from 'framer-motion'
import './profile-sections.css'
import Credentials from './Credentials'

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
    }),
}

const bioSegments = [
    { text: "Hi everyone, my name is " },
    { text: "Khoo Jun Yong", className: "text-cyber-cyan font-semibold" },
    { text: ". I'm 21 years old this year, though people often say I still look quite young. According to my MBTI test, I'm an " },
    { text: "ENFJ-A", className: "text-red-400 font-semibold" },
    { text: ". Currently, I'm pursuing a " },
    { text: "DEGREE", className: "text-neon-yellow font-semibold" },
    { text: " in " },
    { text: "Computer Science", className: "text-cyber-cyan font-semibold" },
    { text: " with a focus on " },
    { text: "Artificial Intelligence", className: "text-cyber-purple font-semibold" },
    { text: " at " },
    { text: "Multimedia University", className: "text-red-500 font-semibold" },
    { text: ". At the same time, I work as a part-time " },
    { text: "freelance web developer", className: "text-cyber-purple font-semibold" },
    { text: " to gain " },
    { text: "EXPERIENCE", className: "text-neon-yellow font-bold" },
    { text: " and earn some extra income. I'm determined to study hard so that I can one day join the company I've always dreamed of." }
];

export default function About({ onNext }) {
    const [selectedSkill, setSelectedSkill] = useState(null)
    const reducedMotion = useReducedMotion()
    // Reveal each section only when it enters the viewport, then stop observing it.
    const reveal = {
        variants: fadeUp,
        initial: reducedMotion ? false : 'hidden',
        whileInView: 'visible',
        viewport: { once: true, amount: 0.12 },
    }
    return (
        <div className="about-page max-w-5xl mx-auto">
            {/* Section Title */}
            <motion.h2
                {...reveal}
                className="font-orbitron text-4xl md:text-5xl font-bold mb-10 section-title gradient-text"
            >
                About Me
            </motion.h2>

            {/* Profile Card */}
            <motion.div
                {...reveal}
                whileHover={reducedMotion ? undefined : { y: -6, transition: { duration: 0.3 } }}
                className="glass-card p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 mb-8 tilt-card"
            >
                <img
                    src="pictures/aboutme.jpeg"
                    alt="Khoo Jun Yong"
                    className="h-56 w-40 object-cover rounded-xl border border-cyber-cyan/20 flex-shrink-0 transition-transform duration-500 hover:scale-110 img-reveal"
                    onError={(e) => {
                        e.target.onerror = null
                        e.target.src = 'https://placehold.co/160x224/0a0a1a/00f0ff?text=Photo'
                    }}
                />
                <div className="flex-1 text-center md:text-left">
                    <h3 className="font-orbitron text-2xl font-bold text-neon-yellow mb-1 glitch-text">
                        Khoo Jun Yong
                    </h3>
                    <p className="font-rajdhani text-gray-400 mb-4">
                        Instagram:{' '}
                        <a
                            href="https://www.instagram.com/jyong_05/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyber-cyan hover:underline"
                        >
                            @jyong_05
                        </a>
                    </p>
                    <motion.p
                        className="font-rajdhani text-gray-300 leading-relaxed text-justify text-lg"
                        variants={{
                            hidden: { opacity: 1 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: reducedMotion ? 0 : 0.03 }
                            }
                        }}
                        initial={reducedMotion ? false : 'hidden'}
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        {bioSegments.map((seg, i) => {
                            const parts = seg.text.split(/(\s+)/);
                            return parts.map((part, j) => {
                                if (!part) return null;
                                if (/\s+/.test(part)) {
                                    return <span key={`${i}-${j}`}>{part}</span>;
                                }
                                return (
                                    <motion.span
                                        key={`${i}-${j}`}
                                        variants={{
                                            hidden: { opacity: 0, filter: 'blur(4px)', y: 4 },
                                            visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.3 } }
                                        }}
                                        className={`inline-block ${seg.className || ''}`}
                                    >
                                        {part}
                                    </motion.span>
                                );
                            });
                        })}
                    </motion.p>
                </div>
            </motion.div>

            <section className="expertise-section" aria-labelledby="expertise-title">
                <motion.h3 {...reveal} id="expertise-title" className="font-orbitron text-2xl md:text-3xl font-bold gradient-text mb-6">Technical & Creative Skills</motion.h3>
                <div className="expertise-grid">
                    {skillShowcases.map((skill, index) => (
                        <motion.div {...reveal} custom={index} key={skill.id} className="expertise-card-reveal">
                        <button type="button" className="expertise-card" onClick={() => setSelectedSkill(skill)} aria-haspopup="dialog" aria-label={`View ${skill.title} work`} style={{ '--expertise-accent': skill.accent }}>
                            <div className="expertise-card-top">
                                <div className="expertise-icon"><i className={`fas ${skill.icon}`} aria-hidden="true" /></div>
                            </div>
                            <span className="expertise-category">{skill.category}</span>
                            <span className="expertise-title font-orbitron font-bold">{skill.title}</span>
                            {skill.id === 'modeling' && <SkillModelPreview paused={Boolean(selectedSkill)} />}
                            {skill.preview && <img className="expertise-game-preview" src={skill.preview} alt="Wildwood at sunset" loading="lazy" decoding="async" />}
                            <div className="expertise-card-bottom"><span>{skill.tag}</span><span className="expertise-cta">View work <span aria-hidden="true">↗</span></span></div>
                        </button>
                        </motion.div>
                    ))}
                </div>
                {selectedSkill && <SkillGallery skill={selectedSkill} onClose={() => setSelectedSkill(null)} />}
            </section>

            {/* My Skills */}
            <motion.div {...reveal}>
                <h3 className="font-orbitron text-2xl font-bold gradient-text mb-6 text-center">
                    {'< '}Languages & Tools{' />'}
                </h3>
                <div className="skills-carousel">
                    <div className="skills-track">
                        {[...Array(2)].map((_, setIndex) => {
                            const skills = [
                                {
                                    name: 'HTML',
                                    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
                                    color: '#E44D26',
                                    glow: 'rgba(228, 77, 38, 0.4)',
                                },
                                {
                                    name: 'JavaScript',
                                    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
                                    color: '#F7DF1E',
                                    glow: 'rgba(247, 223, 30, 0.4)',
                                },
                                {
                                    name: 'CSS',
                                    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
                                    color: '#1572B6',
                                    glow: 'rgba(21, 114, 182, 0.4)',
                                },
                                {
                                    name: 'Python',
                                    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
                                    color: '#3776AB',
                                    glow: 'rgba(55, 118, 171, 0.4)',
                                },
                                {
                                    name: 'Unity',
                                    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg',
                                    color: '#FFFFFF',
                                    glow: 'rgba(255, 255, 255, 0.3)',
                                },
                                {
                                    name: 'C#',
                                    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg',
                                    color: '#68217A',
                                    glow: 'rgba(104, 33, 122, 0.4)',
                                },
                            ]
                            return skills.map((skill, i) => (
                                <div
                                    key={`${setIndex}-${i}`}
                                    className="skill-card"
                                    style={{
                                        '--skill-color': skill.color,
                                        '--skill-glow': skill.glow,
                                    }}
                                >
                                    <img src={skill.icon} alt={skill.name} draggable={false} />
                                    <span>{skill.name}</span>
                                </div>
                            ))
                        })}
                    </div>
                </div>
            </motion.div>

            <motion.div {...reveal} className="mt-16">
                <Credentials />
            </motion.div>

            {/* Next Page Button */}
            <motion.div {...reveal} className="mt-10 text-center">
                <motion.button
                    onClick={onNext}
                    className="cyber-btn"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(0,240,255,0.3)' }}
                    whileTap={{ scale: 0.95 }}
                >
                    Next Page →
                </motion.button>
            </motion.div>
        </div>
    )
}
