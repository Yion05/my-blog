import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import CinematicBackground from './components/CinematicBackground'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Journey from './components/Journey'
import Hobbies from './components/Hobbies'
import Portfolio from './components/Portfolio'
import Footer from './components/Footer'

const pageVariants = {
    initial: { opacity: 0, y: 40, scale: 0.96, rotateX: 4 },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
}

const pages = {
    about: About,
    journey: Journey,
    hobbies: Hobbies,
    portfolio: Portfolio,
}

export default function App() {
    const [showLanding, setShowLanding] = useState(true)
    const [activePage, setActivePage] = useState('about')
    const [transitioning, setTransitioning] = useState(false)
    const audioRef = useRef(null)
    const cinemaRef = useRef(null)
    const [entryPhase, setEntryPhase] = useState('landing')
    const [sceneVersion, setSceneVersion] = useState(0)

    const handleStart = () => {
        if (audioRef.current) {
            audioRef.current.volume = 0.5
            audioRef.current.play().catch((err) => {
                console.warn('Audio autoplay blocked:', err)
            })
        }
    }

    const handleEntryComplete = () => {
        // NAVIGATE HERE: GSAP calls this AFTER pull, dive, blackout, and star reveal.
        // Replace these setters with window.location.href = '/your-page'
        // or router.push('/your-page') when using a router.
        setShowLanding(false)
        setEntryPhase('arrived')
        setActivePage('about')
        setTransitioning(false)
    }

    const handleNavigate = (pageId) => {
        setActivePage(pageId)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleLogoClick = () => {
        setTransitioning(true)
        setTimeout(() => {
            setActivePage('about')
            setEntryPhase('landing')
            setSceneVersion(version => version + 1) // Fresh scenery and refs for replay.
            setShowLanding(true)
            setTransitioning(false)
        }, 400)
    }

    const nextPageMap = {
        about: 'journey',
        journey: 'hobbies',
        hobbies: 'portfolio',
    }

    const handleNext = () => {
        const next = nextPageMap[activePage]
        if (next) handleNavigate(next)
    }

    const ActivePageComponent = pages[activePage]

    return (
        <div className={`min-h-screen scanline-overlay ${entryPhase === 'arrived' ? 'cinema-arrived' : entryPhase !== 'landing' ? 'cinema-traveling' : ''}`}>
            {/* Background Music */}
            <audio ref={audioRef} loop preload="auto">
                <source src="song/yujian.mp3" type="audio/mpeg" />
            </audio>

            {/* Three.js Background */}
            <CinematicBackground key={sceneVersion} ref={cinemaRef} phase={entryPhase} />

            {/* Content layer */}
            <div
                className="relative z-10"
                style={{
                    opacity: transitioning ? 0 : 1,
                    transition: 'opacity 0.4s ease',
                }}
            >
                {showLanding ? (
                    <Hero onStart={handleStart} onEntryComplete={handleEntryComplete}
                        cinemaRef={cinemaRef} onPhase={setEntryPhase} />
                ) : (
                    <div>
                        <Navigation
                            activePage={activePage}
                            onNavigate={handleNavigate}
                            onLogoClick={handleLogoClick}
                        />

                        <main className="container mx-auto px-4 md:px-8 lg:px-12 py-10 md:py-16">
                            <motion.div
                                key={activePage}
                                variants={pageVariants}
                                initial="initial"
                                animate="animate"
                            >
                                <ActivePageComponent
                                    onNext={nextPageMap[activePage] ? handleNext : undefined}
                                />
                            </motion.div>
                        </main>

                        <Footer />
                    </div>
                )}
            </div>
        </div>
    )
}
