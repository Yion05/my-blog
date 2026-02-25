import { motion } from 'framer-motion'

const projects = [
    {
        title: 'Sudoku Mobile Game',
        titleColor: 'text-orange-400',
        subtitle: 'Mobile App Development',
        logo: 'https://junyong.vercel.app/sudoku_icon.jpeg',
        logoFallback: 'https://placehold.co/200x80/0a0a1a/00f0ff?text=Sudoku',
        logoBg: 'bg-gray-800/50',
        description: (
            <>
                My very first <span className="text-neon-yellow font-bold">mobile app</span> development project. I designed the{' '}
                <span className="text-green-400 font-semibold">game backgrounds</span>,{' '}
                <span className="text-cyber-purple font-semibold">logos</span>, and{' '}
                <span className="text-pink-400 font-semibold">store descriptions</span> from scratch, and handled all the{' '}
                <span className="text-red-400 font-semibold">bug fixes</span> to ensure a smooth{' '}
                <span className="text-cyber-cyan font-semibold">puzzle-solving experience</span> for players.
            </>
        ),
        link: 'https://play.google.com/store/apps/details?id=com.junyong.sudoku',
        linkText: 'View on Google Play',
        tags: ['Mobile App', 'Game Development'],
    },
    {
        title: 'Yion Workshop',
        titleColor: 'text-cyber-cyan',
        subtitle: 'Personal Project',
        logo: 'https://yion.vercel.app/logo2.png',
        logoFallback: 'https://placehold.co/200x80/0a0a1a/00f0ff?text=Yion',
        logoBg: 'bg-gray-800/50',
        description: (
            <>
                <span className="text-cyber-cyan font-semibold">Yion</span> is a personal workshop project I developed to explore{' '}
                <span className="text-neon-yellow font-semibold">new web technologies</span> and showcase my skills. It's a platform where I experiment with{' '}
                <span className="text-green-400 font-semibold">front-end frameworks</span> and build{' '}
                <span className="text-orange-400 font-semibold">creative components</span>. This project represents my passion for{' '}
                <span className="text-pink-400 font-semibold">continuous learning</span> and my dedication to mastering the craft of{' '}
                <span className="text-cyber-purple font-bold">web development</span>.
            </>
        ),
        link: 'https://yion.vercel.app',
        linkText: 'Visit Workshop',
        tags: ['Web Development', 'Personal'],
    },
    {
        title: 'HealthX Axis',
        titleColor: 'text-green-400',
        subtitle: 'Website Development Project',
        logo: 'https://junyong.vercel.app/HealthAxisLogo.png',
        logoFallback: 'https://placehold.co/200x80/ffffff/0a0a1a?text=HealthX+Axis',
        logoBg: 'bg-white/90',
        description: (
            <>
                I had the privilege of collaborating with <span className="text-green-400 font-bold">HealthX Axis</span>, a forward-thinking company in the{' '}
                <span className="text-cyber-cyan font-semibold">healthcare technology</span> sector. My role was to lead the{' '}
                <span className="text-orange-400 font-semibold">development</span> of their new{' '}
                <span className="text-neon-yellow font-semibold">corporate website</span>, which is{' '}
                <a
                    href="https://mpppa.org.my"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyber-purple hover:underline font-semibold"
                >
                    mpppa.org.my
                </a>.
            </>
        ),
        link: 'https://mpppa.org.my',
        linkText: 'Visit Website',
        tags: ['Web Development', 'Healthcare'],
    },
    {
        title: 'Lexus Roadshow',
        titleColor: 'text-neon-yellow',
        subtitle: 'Website Development Project',
        logo: 'https://purepng.com/public/uploads/large/purepng.com-lexus-logoslexusluxury-vehicletoyotalexus-logos-1701527516757eqw1o.png',
        logoFallback: 'https://placehold.co/200x80/0a0a1a/00f0ff?text=Lexus',
        logoBg: 'bg-white/90',
        description: (
            <>
                Together with my <span className="text-cyber-cyan font-semibold">team</span>, we developed the{' '}
                <span className="text-green-400 font-semibold">frontend</span> and{' '}
                <span className="text-orange-400 font-semibold">backend</span> system for the{' '}
                <span className="text-neon-yellow font-bold">Lexus roadshow</span> event, which includes{' '}
                <span className="text-pink-400 font-semibold">OTP verification</span> and a{' '}
                <span className="text-cyber-purple font-semibold">login feature</span> that stores data{' '}
                <span className="text-red-400 font-semibold">securely</span> in the database.
            </>
        ),
        link: 'https://lexusexperienceamazing.com.my',
        linkText: 'Visit Website',
        tags: ['Web Development', 'Automotive'],
    },
    {
        title: 'CSPS Landing Page',
        titleColor: 'text-pink-400',
        subtitle: 'Website Development Project',
        logo: 'https://csps.vercel.app/picture/logo.png',
        logoFallback: 'https://placehold.co/200x80/0a0a1a/00f0ff?text=CSPS',
        logoBg: 'bg-white/90',
        description: (
            <>
                I made this <span className="text-cyber-cyan font-semibold">website</span> with{' '}
                <span className="text-neon-yellow font-semibold">client's design</span>.
            </>
        ),
        link: 'https://csps.vercel.app/',
        linkText: 'Visit Website',
        tags: ['Web Development', 'Client Work'],
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

export default function Portfolio() {
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
                Portfolio & Cooperation
            </motion.h2>

            <div className="space-y-8">
                {projects.map((project, i) => (
                    <motion.div
                        key={i}
                        variants={fadeUp}
                        custom={i + 1}
                        className="glass-card p-6 md:p-8"
                    >
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            {/* Logo or Icon */}
                            {project.logo ? (
                                <div
                                    className={`${project.logoBg} p-4 rounded-xl flex-shrink-0 flex items-center justify-center min-w-[120px]`}
                                >
                                    <img
                                        src={project.logo}
                                        alt={`${project.title} Logo`}
                                        className="h-16 w-auto max-w-[160px] object-contain"
                                        onError={(e) => {
                                            e.target.onerror = null
                                            e.target.src = project.logoFallback
                                        }}
                                    />
                                </div>
                            ) : (
                                <div className="bg-gradient-to-br from-cyber-purple/20 to-cyber-cyan/10 p-6 rounded-xl flex-shrink-0 flex items-center justify-center min-w-[120px] min-h-[88px] neon-border-purple">
                                    <i className={`${project.logoIcon || 'fa-solid fa-code'} text-4xl text-cyber-purple`} />
                                </div>
                            )}

                            {/* Content */}
                            <div className="flex-1 text-center md:text-left">
                                <h3 className={`font-orbitron text-2xl font-bold ${project.titleColor} mb-1`}>
                                    {project.title}
                                </h3>
                                <p className="font-rajdhani text-gray-500 text-sm mb-3 tracking-wider uppercase">
                                    {project.subtitle}
                                </p>

                                {/* Tags */}
                                {project.tags && (
                                    <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                                        {project.tags.map((tag, j) => (
                                            <span
                                                key={j}
                                                className="px-3 py-1 text-xs font-orbitron tracking-wider rounded-full border border-cyber-cyan/20 text-cyber-cyan/70 bg-cyber-cyan/5"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <p className="font-rajdhani text-gray-300 leading-relaxed text-lg mb-5">
                                    {project.description}
                                </p>

                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="cyber-btn inline-block text-sm"
                                    >
                                        {project.linkText}
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}
