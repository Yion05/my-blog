import { motion } from 'framer-motion'

export default function Footer() {
    return (
        <footer className="relative z-10 mt-20 border-t border-cyber-cyan/10">
            {/* Animated neon accent line at top */}
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="h-[2px] bg-gradient-to-r from-transparent via-cyber-cyan/50 to-transparent origin-center"
            />

            <div className="container mx-auto px-6 py-6 text-center">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="font-rajdhani text-gray-500 text-sm tracking-wider"
                >
                    <span className="text-cyber-cyan/40 font-orbitron text-xs">{'<'}</span>
                    {' '}© 2025 Khoo Jun Yong. All Rights Reserved.{' '}
                    <span className="text-cyber-cyan/40 font-orbitron text-xs">{'/>'}</span>
                </motion.p>
            </div>
        </footer>
    )
}
