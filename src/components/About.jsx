import { motion } from 'framer-motion'

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] },
    }),
}

export default function About({ onNext }) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            className="max-w-5xl mx-auto"
        >
            {/* Section Title */}
            <motion.h2
                variants={fadeUp}
                custom={0}
                className="font-orbitron text-4xl md:text-5xl font-bold mb-10 section-title text-neon-cyan"
            >
                About Me
            </motion.h2>

            {/* Profile Card */}
            <motion.div
                variants={fadeUp}
                custom={1}
                className="glass-card p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 mb-8"
            >
                <img
                    src="https://junyong.vercel.app/me2.jpg"
                    alt="Khoo Jun Yong"
                    className="h-56 w-40 object-cover rounded-xl border border-cyber-cyan/20 flex-shrink-0 transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                        e.target.onerror = null
                        e.target.src = 'https://placehold.co/160x224/0a0a1a/00f0ff?text=Photo'
                    }}
                />
                <div className="flex-1 text-center md:text-left">
                    <h3 className="font-orbitron text-2xl font-bold text-neon-yellow mb-1">
                        Khoo Jun Yong
                    </h3>
                    <p className="font-rajdhani text-gray-400 mb-4">
                        Instagram:{' '}
                        <a
                            href="https://www.instagram.com/jyong_05/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyber-cyan hover:underline"
                        >
                            @jyong_05
                        </a>
                    </p>
                    <p className="font-rajdhani text-gray-300 leading-relaxed text-justify text-lg">
                        Hi everyone, my name is{' '}
                        <span className="text-cyber-cyan font-semibold">Khoo Jun Yong</span>.
                        I'm 21 years old this year, though people often say I still look quite young.
                        According to my MBTI test, I'm an{' '}
                        <span className="text-red-400 font-semibold">ENFJ-A</span>.
                        Currently, I'm pursuing a{' '}
                        <span className="text-neon-yellow font-semibold">DEGREE</span> in{' '}
                        <span className="text-cyber-cyan font-semibold">Computer Science</span>{' '}
                        with a focus on{' '}
                        <span className="text-cyber-purple font-semibold">Artificial Intelligence</span>{' '}
                        at{' '}
                        <span className="text-red-500 font-semibold">Multimedia University</span>.
                        At the same time, I work as a part-time{' '}
                        <span className="text-cyber-purple font-semibold">freelance web developer</span>{' '}
                        to gain{' '}
                        <span className="text-neon-yellow font-bold">EXPERIENCE</span>{' '}
                        and earn some extra income. I'm determined to study hard so that I can one day
                        join the company I've always dreamed of.
                    </p>
                </div>
            </motion.div>

            {/* Details Section */}
            <motion.div variants={fadeUp} custom={2} className="mb-8">
                <h3 className="font-orbitron text-2xl font-bold text-cyber-purple mb-4">
                    {'// '}Details
                </h3>
                <div className="glass-card p-6 space-y-5 neon-border-purple">
                    {[
                        { icon: 'fa-graduation-cap', text: 'Multimedia University', color: 'text-neon-yellow' },
                        { icon: 'fa-location-dot', text: 'Lives in Malaysia', color: 'text-neon-yellow' },
                        { icon: 'fa-user', text: 'Male', color: 'text-neon-yellow' },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4"
                        >
                            <div className="w-10 h-10 rounded-lg bg-cyber-purple/20 flex items-center justify-center flex-shrink-0">
                                <i className={`fas ${item.icon} text-cyber-purple`} />
                            </div>
                            <p className={`font-rajdhani text-xl ${item.color}`}>{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* My Posts */}
            <motion.div variants={fadeUp} custom={3}>
                <h3 className="font-orbitron text-2xl font-bold text-cyber-cyan mb-6 text-center">
                    {'< '}My Posts{' />'}
                </h3>
                <div className="max-w-2xl mx-auto">
                    <div className="glass-card overflow-hidden group">
                        <div className="overflow-hidden">
                            <img
                                src="https://junyong.vercel.app/me3.jpg"
                                alt="My First time going Disneyland"
                                className="w-full transition-transform duration-700 group-hover:scale-105"
                                onError={(e) => {
                                    e.target.onerror = null
                                    e.target.src = 'https://placehold.co/800x400/0a0a1a/00f0ff?text=Disneyland'
                                }}
                            />
                        </div>
                        <div className="p-6">
                            <h4 className="font-orbitron text-xl font-bold text-cyber-cyan mb-2">
                                My First Time Visiting{' '}
                                <span className="text-neon-yellow">Disneyland</span>
                            </h4>
                            <p className="font-rajdhani text-gray-500 text-sm mb-3 tracking-wider uppercase">
                                28 November 2019
                            </p>
                            <p className="font-rajdhani text-gray-300 text-lg">
                                In <span className="text-neon-yellow font-semibold">2019</span>, I traveled to{' '}
                                <span className="text-cyber-purple font-semibold">Shanghai, China</span>, and this
                                marked my first visit to{' '}
                                <span className="text-neon-yellow font-semibold">Disneyland</span>.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Next Page Button */}
            <motion.div variants={fadeUp} custom={4} className="mt-10 text-center">
                <button onClick={onNext} className="cyber-btn">
                    Next Page →
                </button>
            </motion.div>
        </motion.div>
    )
}
