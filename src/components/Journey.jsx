import { motion } from 'framer-motion'

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] },
    }),
}

const journeyData = [
    {
        title: 'My University',
        image: 'https://junyong.vercel.app/uni.png',
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

export default function Journey({ onNext }) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-5xl mx-auto"
        >
            <motion.h2
                variants={fadeUp}
                custom={0}
                className="font-orbitron text-4xl md:text-5xl font-bold mb-10 section-title text-neon-cyan"
            >
                My Journey
            </motion.h2>

            <div className="space-y-8">
                {journeyData.map((item, i) => (
                    <motion.div
                        key={i}
                        variants={fadeUp}
                        custom={i + 1}
                        className="glass-card p-6 md:p-8"
                    >
                        {item.image ? (
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full md:w-1/2 object-contain rounded-xl border border-white/5"
                                    onError={(e) => {
                                        e.target.onerror = null
                                        e.target.src = item.fallback
                                    }}
                                />
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

            <motion.div variants={fadeUp} custom={journeyData.length + 1} className="mt-10 text-center">
                <button onClick={onNext} className="cyber-btn">
                    Next Page →
                </button>
            </motion.div>
        </motion.div>
    )
}
