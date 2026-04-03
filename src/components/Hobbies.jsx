import { motion } from 'framer-motion'

const hobbies = [
    {
        title: 'Ping Pong',
        titleColor: 'text-green-400',
        image: 'pictures/Ping pong.jpeg',
        fallback: 'https://placehold.co/400x300/0a0a1a/00f0ff?text=Ping+Pong',
        segments: [
            { text: "I really enjoy playing " },
            { text: "ping pong", className: "text-green-400 font-semibold" },
            { text: ", and I play " },
            { text: "twice a week", className: "text-neon-yellow font-semibold" },
            { text: " at the " },
            { text: "MMU mini sports hall", className: "text-cyber-cyan font-semibold" },
            { text: "." }
        ]
    },
    {
        title: 'Collecting',
        titleColor: 'text-orange-400',
        image: 'pictures/Collecting.jpeg',
        fallback: 'https://placehold.co/400x300/0a0a1a/00f0ff?text=Collecting',
        segments: [
            { text: "I have a passion for collecting items with " },
            { text: "history", className: "text-orange-400 font-semibold" },
            { text: " and " },
            { text: "nostalgia", className: "text-pink-400 font-semibold" },
            { text: ", such as " },
            { text: "old money", className: "text-neon-yellow font-semibold" },
            { text: ", " },
            { text: "Pokémon cards", className: "text-red-400 font-semibold" },
            { text: ", and other " },
            { text: "unique memorabilia", className: "text-cyber-purple font-semibold" },
            { text: "." }
        ]
    },
    {
        title: 'Traveling',
        titleColor: 'text-cyber-purple',
        image: 'pictures/me2.jpeg',
        fallback: 'https://placehold.co/400x300/0a0a1a/00f0ff?text=Traveling',
        segments: [
            { text: "Exploring new " },
            { text: "cultures", className: "text-cyber-cyan font-semibold" },
            { text: ", " },
            { text: "cuisines", className: "text-orange-400 font-semibold" },
            { text: ", and " },
            { text: "landscapes", className: "text-green-400 font-semibold" },
            { text: " broadens my " },
            { text: "perspective", className: "text-neon-yellow font-semibold" },
            { text: " and fuels my " },
            { text: "creativity", className: "text-pink-400 font-semibold" },
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
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.7, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] },
    }),
}

export default function Hobbies({ onNext }) {
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
                My Hobbies
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hobbies.map((hobby, i) => (
                    <motion.div
                        key={i}
                        variants={cardVariants}
                        custom={i + 1}
                        whileHover={{
                            y: -12,
                            rotateY: 5,
                            rotateX: -3,
                            transition: { duration: 0.4 },
                        }}
                        className="glass-card overflow-hidden group"
                        style={{ transformStyle: 'preserve-3d', perspective: '800px' }}
                    >
                        {/* Image with zoom + shimmer overlay */}
                        <div className="overflow-hidden relative">
                            <img
                                src={hobby.image}
                                alt={hobby.title}
                                className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                                onError={(e) => {
                                    e.target.onerror = null
                                    e.target.src = hobby.fallback
                                }}
                            />
                            {/* Gradient shimmer overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-transparent to-transparent opacity-60" />
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                                initial={{ x: '-100%' }}
                                whileHover={{ x: '100%' }}
                                transition={{ duration: 0.8 }}
                            />
                        </div>

                        <div className="p-6">
                            <motion.h3
                                className={`font-orbitron text-lg font-bold ${hobby.titleColor} mb-2`}
                                whileHover={{ x: 5 }}
                                transition={{ duration: 0.3 }}
                            >
                                {hobby.title}
                            </motion.h3>
                            <p className="font-rajdhani text-gray-300 text-lg leading-relaxed">
                                <AnimatedText segments={hobby.segments} />
                            </p>
                        </div>

                        {/* Bottom neon accent */}
                        <div className="h-[2px] bg-gradient-to-r from-cyber-cyan via-cyber-purple to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Corner glow on hover */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyber-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tr-2xl" />
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: hobbies.length * 0.2 + 0.5 }}
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
