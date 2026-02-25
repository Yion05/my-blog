import { motion } from 'framer-motion'

const hobbies = [
    {
        title: 'Ping Pong',
        titleColor: 'text-green-400',
        image: 'https://junyong.vercel.app/pp.jpg',
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
        image: 'https://junyong.vercel.app/m.jpg',
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
        image: 'https://junyong.vercel.app/me.jpg',
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

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] },
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
                variants={fadeUp}
                custom={0}
                className="font-orbitron text-4xl md:text-5xl font-bold mb-10 section-title text-neon-cyan"
            >
                My Hobbies
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hobbies.map((hobby, i) => (
                    <motion.div
                        key={i}
                        variants={fadeUp}
                        custom={i + 1}
                        className="glass-card overflow-hidden group"
                    >
                        <div className="overflow-hidden">
                            <img
                                src={hobby.image}
                                alt={hobby.title}
                                className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                                onError={(e) => {
                                    e.target.onerror = null
                                    e.target.src = hobby.fallback
                                }}
                            />
                        </div>
                        <div className="p-6">
                            <h3 className={`font-orbitron text-lg font-bold ${hobby.titleColor} mb-2`}>
                                {hobby.title}
                            </h3>
                            <p className="font-rajdhani text-gray-300 text-lg leading-relaxed">
                                {hobby.description}
                            </p>
                        </div>
                        {/* Bottom neon accent */}
                        <div className="h-[2px] bg-gradient-to-r from-cyber-cyan via-cyber-purple to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.div>
                ))}
            </div>

            <motion.div variants={fadeUp} custom={hobbies.length + 1} className="mt-10 text-center">
                <button onClick={onNext} className="cyber-btn">
                    Next Page →
                </button>
            </motion.div>
        </motion.div>
    )
}
