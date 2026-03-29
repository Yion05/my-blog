import { motion } from 'framer-motion'

const journeyData = [
    {
        title: 'My University',
        image: 'pictures/university.jpeg',
        fallback: 'https://placehold.co/800x400/0a0a1a/00f0ff?text=University',
        content: (
            <>
                My journey into the world of <span className="text-cyber-cyan font-semibold">technology</span> began at my academy. After successfully completing
                my <span className="text-green-400 font-semibold">middle</span> and <span className="text-green-400 font-semibold">secondary school</span> exams, I enrolled at{' '}
                <span className="text-neon-yellow font-bold">Multimedia University (MMU) Melaka</span>.
            </>
        ),
    },
    {
        title: 'Education & Growth',
        content: (
            <>
                I subsequently enrolled in a comprehensive <span className="text-cyber-cyan font-semibold">Computer Science</span> with{' '}
                <span className="text-cyber-purple font-semibold">Artificial Intelligence</span>{' '}
                program. Here, I've delved deeper into <span className="text-orange-400 font-semibold">database management</span>,{' '}
                <span className="text-pink-400 font-semibold">operating systems</span> and{' '}
                <span className="text-green-400 font-semibold">advanced web technologies</span>. I chose this course due to my fascination with{' '}
                <span className="text-neon-yellow font-semibold">new technologies</span> and my
                strong desire to learn more about the field of <span className="text-cyber-purple font-bold">AI</span>.
            </>
        ),
    },
    {
        title: 'Future Aspirations',
        content: (
            <>
                I am always exploring <span className="text-cyber-cyan font-semibold">new technologies</span> and continuously building my{' '}
                <span className="text-neon-yellow font-semibold">skills</span>. My goal is to
                work on <span className="text-orange-400 font-semibold">exciting projects</span> that push the boundaries of what's possible with{' '}
                <span className="text-green-400 font-bold">code</span>. I am
                passionate about <span className="text-pink-400 font-semibold">problem-solving</span> and eager to contribute to{' '}
                <span className="text-cyber-purple font-semibold">innovative web applications</span>,
                learning from <span className="text-red-400 font-semibold">real-world challenges</span>.
            </>
        ),
    },
]

const cardVariants = {
    hidden: { opacity: 0, x: -60, rotateY: -8 },
    visible: (i) => ({
        opacity: 1,
        x: 0,
        rotateY: 0,
        transition: { duration: 0.8, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] },
    }),
}

export default function Journey({ onNext }) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-5xl mx-auto"
        >
            <motion.h2
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-orbitron text-4xl md:text-5xl font-bold mb-10 section-title gradient-text"
            >
                My Journey
            </motion.h2>

            {/* Timeline line */}
            <div className="relative">
                <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                    className="absolute left-4 md:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyber-cyan via-cyber-purple to-transparent origin-top hidden md:block"
                />

                <div className="space-y-8">
                    {journeyData.map((item, i) => (
                        <motion.div
                            key={i}
                            variants={cardVariants}
                            custom={i + 1}
                            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                            className="glass-card p-6 md:p-8 tilt-card relative md:ml-12"
                        >
                            {/* Timeline dot */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5 + i * 0.2, type: 'spring', stiffness: 400 }}
                                className="absolute -left-[22px] top-8 w-3 h-3 rounded-full bg-cyber-cyan animate-glow-pulse hidden md:block"
                            />

                            {item.image ? (
                                <div className="flex flex-col md:flex-row items-center gap-6">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
                                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                        className="w-full md:w-1/2 overflow-hidden rounded-xl border border-white/5"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full object-contain transition-transform duration-700 hover:scale-110 img-reveal"
                                            onError={(e) => {
                                                e.target.onerror = null
                                                e.target.src = item.fallback
                                            }}
                                        />
                                    </motion.div>
                                    <div className="md:w-1/2">
                                        <h3 className="font-orbitron text-xl font-bold text-cyber-cyan mb-4 flex items-center gap-2">
                                            <span className="text-cyber-purple font-mono text-sm">0{i + 1}</span>
                                            {item.title}
                                        </h3>
                                        <p className="font-rajdhani text-gray-300 leading-relaxed text-lg">
                                            {item.content}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h3 className="font-orbitron text-xl font-bold text-cyber-cyan mb-3 flex items-center gap-2">
                                        <span className="text-cyber-purple font-mono text-sm">0{i + 1}</span>
                                        {item.title}
                                    </h3>
                                    <p className="font-rajdhani text-gray-300 leading-relaxed text-lg">
                                        {item.content}
                                    </p>
                                </>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: journeyData.length * 0.2 + 0.5 }}
                className="mt-10 text-center"
            >
                <motion.button
                    onClick={onNext}
                    className="cyber-btn"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(0,240,255,0.3)' }}
                    whileTap={{ scale: 0.95 }}
                >
                    Next Page →
                </motion.button>
            </motion.div>
        </motion.div>
    )
}
