import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
    { id: 'about', label: 'About Me', color: 'text-cyan-400', activeColor: 'text-cyan-300', glowColor: 'rgba(0,240,255,0.5)' },
    { id: 'journey', label: 'My Journey', color: 'text-purple-400', activeColor: 'text-purple-300', glowColor: 'rgba(176,0,255,0.5)' },
    { id: 'hobbies', label: 'Hobbies', color: 'text-yellow-400', activeColor: 'text-yellow-300', glowColor: 'rgba(230,255,0,0.5)' },
    { id: 'portfolio', label: 'Portfolio', color: 'text-pink-400', activeColor: 'text-pink-300', glowColor: 'rgba(255,0,128,0.5)' },
]

export default function Navigation({ activePage, onNavigate, onLogoClick }) {
    const [mobileOpen, setMobileOpen] = useState(false)

    const handleNav = (id) => {
        onNavigate(id)
        setMobileOpen(false)
    }

    return (
        <header className="sticky top-0 z-50 bg-cyber-darker/70 backdrop-blur-xl border-b border-cyber-cyan/10">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <button
                        onClick={onLogoClick}
                        className="font-orbitron text-xl font-bold tracking-widest hover:opacity-80 transition-all duration-300 cursor-pointer"
                        style={{ color: '#00f0ff', textShadow: '0 0 10px rgba(0,240,255,0.5)' }}
                    >
                        Home
                    </button>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => handleNav(link.id)}
                                className={`relative px-4 py-2 font-rajdhani text-sm font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer hover:scale-105 ${activePage === link.id
                                    ? link.activeColor
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                                style={
                                    activePage === link.id
                                        ? { textShadow: `0 0 12px ${link.glowColor}` }
                                        : {}
                                }
                            >
                                {link.label}
                                {activePage === link.id && (
                                    <motion.div
                                        layoutId="nav-underline"
                                        className="absolute bottom-0 left-2 right-2 h-[2px]"
                                        style={{
                                            background: `linear-gradient(90deg, ${link.glowColor}, transparent)`,
                                            boxShadow: `0 0 8px ${link.glowColor}`,
                                        }}
                                    />
                                )}
                            </button>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-cyber-cyan text-2xl cursor-pointer"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        <i className={`fas ${mobileOpen ? 'fa-times' : 'fa-bars'}`} />
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden overflow-hidden border-t border-cyber-cyan/10"
                        >
                            {navLinks.map((link, i) => (
                                <motion.button
                                    key={link.id}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.08 }}
                                    onClick={() => handleNav(link.id)}
                                    className={`block w-full text-left px-4 py-3 font-rajdhani text-sm font-bold tracking-wider uppercase transition-colors cursor-pointer ${activePage === link.id
                                        ? `${link.activeColor} bg-white/5`
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <span className={`mr-2 font-orbitron text-xs ${link.color}`}>
                                        0{i + 1}
                                    </span>
                                    {link.label}
                                </motion.button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    )
}
