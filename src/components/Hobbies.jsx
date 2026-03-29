import { motion } from 'framer-motion'

const hobbies = [
    {
        title: 'Ping Pong',
        titleColor: 'text-green-400',
        image: 'pictures/Ping pong.jpeg',
        fallback: 'https://placehold.co/400x300/0a0a1a/00f0ff?text=Ping+Pong',
        description: (
            <>
                I really enjoy playing <span className="text-green-400 font-semibold">ping pong</span>, and I play{' '}
                <span className="text-neon-yellow font-semibold">twice a week</span> at the{' '}
                <span className="text-cyber-cyan font-semibold">MMU mini sports hall</span>.
            </>
        ),
    },
    {
        title: 'Collecting',
        titleColor: 'text-orange-400',
        image: 'pictures/Collecting.jpeg',
        fallback: 'https://placehold.co/400x300/0a0a1a/00f0ff?text=Collecting',
        description: (
            <>
                I have a passion for collecting items with <span className="text-orange-400 font-semibold">history</span> and{' '}
                <span className="text-pink-400 font-semibold">nostalgia</span>, such as{' '}
                <span className="text-neon-yellow font-semibold">old money</span>,{' '}
                <span className="text-red-400 font-semibold">Pokémon cards</span>, and other{' '}
                <span className="text-cyber-purple font-semibold">unique memorabilia</span>.
            </>
        ),
    },
    {
        title: 'Traveling',
        titleColor: 'text-cyber-purple',
        image: 'pictures/me2.jpeg',
        fallback: 'https://placehold.co/400x300/0a0a1a/00f0ff?text=Traveling',
        description: (
            <>
                Exploring new <span className="text-cyber-cyan font-semibold">cultures</span>,{' '}
                <span className="text-orange-400 font-semibold">cuisines</span>, and{' '}
                <span className="text-green-400 font-semibold">landscapes</span> broadens my{' '}
                <span className="text-neon-yellow font-semibold">perspective</span> and fuels my{' '}
                <span className="text-pink-400 font-semibold">creativity</span>.
            </>
        ),
    },
]

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
                                {hobby.description}
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
