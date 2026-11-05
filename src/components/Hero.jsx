import { motion } from 'framer-motion'
import { useState, useEffect, useMemo, useRef } from 'react'
import useSingularityTransition from '../hooks/useSingularityTransition'

export default function Hero({ onStart, onEntryComplete, cinemaRef, onPhase }) {
    const stageRef = useRef(null)
    const { enter, isEntering } = useSingularityTransition(stageRef, {
        onBegin: onStart,
        onComplete: onEntryComplete,
        cinemaRef,
        onPhase,
    })
    const particles = useMemo(() => Array.from({ length: 6 }, () => ({
        width: 3 + Math.random() * 4,
        height: 3 + Math.random() * 4,
    })), [])
    const fullText = ' Welcome to my personal space'
    const [displayedText, setDisplayedText] = useState('')

    useEffect(() => {
        if (isEntering) return
        let interval
        const startDelay = setTimeout(() => {
            let i = 0
            interval = setInterval(() => {
                i++
                setDisplayedText(fullText.slice(0, i))
                if (i >= fullText.length) clearInterval(interval)
            }, 70)
        }, 1000)
        return () => {
            clearTimeout(startDelay)
            clearInterval(interval)
        }
    }, [isEntering])

    return (
        <div ref={stageRef} aria-busy={isEntering} className="singularity-stage landing-readable h-screen flex flex-col items-center justify-center text-center px-4 relative z-10">
            {/* Floating particles */}
            {particles.map((particle, i) => (
                <div key={i} data-singularity className="singularity-carrier singularity-particle"
                    style={{ left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 25}%` }}>
                    <motion.div
                        className="rounded-full pointer-events-none"
                        style={{
                            width: particle.width,
                            height: particle.height,
                            background: i % 2 === 0 ? '#00f0ff' : '#b000ff',
                            opacity: 0.3,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.2, 0.6, 0.2],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 3 + i * 0.5,
                            repeat: Infinity,
                            delay: i * 0.4,
                            ease: 'easeInOut',
                        }}
                    />
                </div>
            ))}

            {/* Glitch Title */}
            <div data-singularity className="singularity-carrier mb-6">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.5, rotateX: 90 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    className="font-orbitron text-6xl md:text-8xl lg:text-9xl font-black tracking-[0.3em] glitch-text gradient-text landing-title-depth"
                >
                    BLOG
                </motion.h1>
            </div>

            {/* Decorative lines — dual with stagger */}
            <div data-singularity className="singularity-carrier mb-8">
                <div className="flex items-center gap-2">
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="w-20 h-[1px] bg-gradient-to-r from-transparent to-cyber-cyan origin-right"
                    />
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.9, type: 'spring', stiffness: 300 }}
                        className="w-2 h-2 rounded-full bg-cyber-cyan animate-glow-pulse"
                    />
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="w-20 h-[1px] bg-gradient-to-l from-transparent to-cyber-cyan origin-left"
                    />
                </div>

            </div>

            {/* Subtitle with typing animation */}
            <div data-singularity className="singularity-carrier mb-12">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="font-rajdhani text-lg md:text-xl text-gray-400 tracking-widest uppercase landing-welcome"
                >
                    <span className="text-cyber-purple">{'>'}</span>{displayedText}
                    <span className="animate-flicker text-cyber-cyan ml-1">_</span>
                </motion.p>
            </div>

            {/* CTA Button with pulse ring */}
            <div data-singularity className="singularity-carrier">
                <motion.button
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    whileHover={{ scale: 1.08, boxShadow: '0 0 30px rgba(0,240,255,0.4)' }}
                    whileTap={{ scale: 0.92 }}
                    onClick={enter}
                    disabled={isEntering}
                    type="button"
                    className="cyber-btn pulse-ring landing-enter"
                >
                    Start Exploring
                </motion.button>
            </div>

            {/* Scroll indicator */}
            <div data-singularity className="singularity-carrier singularity-hint">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="font-rajdhani text-xs text-gray-500 tracking-widest uppercase landing-hint">
                        Press the button to enter
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-[1px] h-6 bg-gradient-to-b from-cyber-cyan/50 to-transparent"
                    />
                </motion.div>
            </div>
        </div>
    )
}
