import { motion } from 'framer-motion'

const journeyData = [
    {
        title: 'My University',
        image: 'pictures/university.jpeg',
        fallback: 'https://placehold.co/800x400/0a0a1a/00f0ff?text=University',
        segments: [
            { text: "My journey into the world of " },
            { text: "technology", className: "text-cyber-cyan font-semibold" },
            { text: " began at my academy. After successfully completing my " },
            { text: "middle", className: "text-green-400 font-semibold" },
            { text: " and " },
            { text: "secondary school", className: "text-green-400 font-semibold" },
            { text: " exams, I enrolled at " },
            { text: "Multimedia University (MMU) Melaka", className: "text-neon-yellow font-bold" },
            { text: "." }
        ]
    },
    {
        title: 'Education & Growth',
        segments: [
            { text: "I subsequently enrolled in a comprehensive " },
            { text: "Computer Science", className: "text-cyber-cyan font-semibold" },
            { text: " with " },
            { text: "Artificial Intelligence", className: "text-cyber-purple font-semibold" },
            { text: " program. Here, I've delved deeper into " },
            { text: "database management", className: "text-orange-400 font-semibold" },
            { text: ", " },
            { text: "operating systems", className: "text-pink-400 font-semibold" },
            { text: " and " },
            { text: "advanced web technologies", className: "text-green-400 font-semibold" },
            { text: ". I chose this course due to my fascination with " },
            { text: "new technologies", className: "text-neon-yellow font-semibold" },
            { text: " and my strong desire to learn more about the field of " },
            { text: "AI", className: "text-cyber-purple font-bold" },
            { text: "." }
        ]
    },
    {
        title: 'Future Aspirations',
        segments: [
            { text: "I am always exploring " },
            { text: "new technologies", className: "text-cyber-cyan font-semibold" },
            { text: " and continuously building my " },
            { text: "skills", className: "text-neon-yellow font-semibold" },
            { text: ". My goal is to work on " },
            { text: "exciting projects", className: "text-orange-400 font-semibold" },
            { text: " that push the boundaries of what's possible with " },
            { text: "code", className: "text-green-400 font-bold" },
            { text: ". I am passionate about " },
            { text: "problem-solving", className: "text-pink-400 font-semibold" },
            { text: " and eager to contribute to " },
            { text: "innovative web applications", className: "text-cyber-purple font-semibold" },
            { text: ", learning from " },
            { text: "real-world challenges", className: "text-red-400 font-semibold" },
            { text: "." }
        ]
    },
]

const AnimatedText = ({ segments }) => (
    <motion.span
        variants={{
            hidden: { opacity: 1 },
            visible: {
                opacity: 1,
                transition: { staggerChildren: 0.03 }
            }
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
    >
        {segments.map((seg, i) => {
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
    </motion.span>
);

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
                                            <AnimatedText segments={item.segments} />
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
                                        <AnimatedText segments={item.segments} />
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
