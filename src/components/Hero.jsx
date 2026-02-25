import { motion } from 'framer-motion'

export default function Hero({ onStart }) {
    return (
        <div className="h-screen flex flex-col items-center justify-center text-center px-4 relative z-10">
            {/* Glitch Title */}
            <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-orbitron text-6xl md:text-8xl lg:text-9xl font-black tracking-[0.3em] mb-6 text-neon-cyan animate-glow-pulse"
            >
                BLOG
            </motion.h1>

            {/* Decorative line */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="w-48 h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan to-transparent mb-8"
            />

            {/* Subtitle */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="font-rajdhani text-lg md:text-xl text-gray-400 mb-12 tracking-widest uppercase"
            >
                <span className="text-cyber-purple">{'>'}</span> Welcome to my personal space
                <span className="animate-flicker text-cyber-cyan ml-1">_</span>
            </motion.p>

            {/* CTA Button */}
            <motion.button
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onStart}
                className="cyber-btn"
            >
                Start Exploring
            </motion.button>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-10 flex flex-col items-center gap-2"
            >
                <span className="font-rajdhani text-xs text-gray-500 tracking-widest uppercase">
                    Press the button to enter
                </span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-[1px] h-6 bg-gradient-to-b from-cyber-cyan/50 to-transparent"
                />
            </motion.div>
        </div>
    )
}
