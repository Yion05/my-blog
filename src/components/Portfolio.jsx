import { motion } from 'framer-motion'

const projects = [
    {
        title: 'Sudoku Mobile Game',
        titleColor: 'text-orange-400',
        subtitle: 'Mobile App Development',
        logo: 'pictures/sudoku_icon.jpeg',
        logoFallback: 'https://placehold.co/200x80/0a0a1a/00f0ff?text=Sudoku',
        logoBg: 'bg-gray-800/50',
        segments: [
            { text: "My very first " },
            { text: "google play store mobile app", className: "text-neon-yellow font-bold" },
            { text: " development project. I designed all things such as the " },
            { text: "game backgrounds", className: "text-green-400 font-semibold" },
            { text: ", " },
            { text: "logos", className: "text-cyber-purple font-semibold" },
            { text: ", and " },
            { text: "store descriptions", className: "text-pink-400 font-semibold" },
            { text: " from scratch, and handled all the " },
            { text: "bug fixes", className: "text-red-400 font-semibold" },
            { text: " to ensure a smooth " },
            { text: "puzzle-solving experience", className: "text-cyber-cyan font-semibold" },
            { text: " for players." }
        ],
        link: 'https://play.google.com/store/apps/details?id=com.junyong.sudoku',
        linkText: 'View on Google Play',
        tags: ['Mobile App', 'Game Development'],
    },
    {
        title: 'Yion Ai Agent',
        titleColor: 'text-yellow-400',
        subtitle: 'Personal Project',
        logo: 'pictures/yion-ai.jpeg',
        logoFallback: 'https://placehold.co/200x80/0a0a1a/00f0ff?text=Yion-ai',
        logoBg: 'bg-gray-800/50',
        segments: [
            { text: "I " },
            { text: "independently developed", className: "text-green-400 font-semibold" },
            { text: " this " },
            { text: "AI agent", className: "text-cyber-purple font-bold" },
            { text: " by integrating modern language models with the " },
            { text: "Google Search API", className: "text-orange-400 font-semibold" },
            { text: " to create a smart, autonomous assistant." }
        ],
        link: 'https://yion.my',
        linkText: 'Visit AI Agent',
        tags: ['AI Integration', 'Personal'],
    },
    {
        title: 'Yion Workshop',
        titleColor: 'text-cyber-cyan',
        subtitle: 'Personal Project',
        logo: 'https://yion.vercel.app/logo2.png',
        logoFallback: 'https://placehold.co/200x80/0a0a1a/00f0ff?text=Yion',
        logoBg: 'bg-gray-800/50',
        segments: [
            { text: "Yion", className: "text-cyber-cyan font-semibold" },
            { text: " is a personal workshop project I developed to explore " },
            { text: "new web technologies", className: "text-neon-yellow font-semibold" },
            { text: " and showcase my skills. It's a platform where I experiment with " },
            { text: "front-end frameworks", className: "text-green-400 font-semibold" },
            { text: " and build " },
            { text: "creative components", className: "text-orange-400 font-semibold" },
            { text: ". This project represents my passion for " },
            { text: "continuous learning", className: "text-pink-400 font-semibold" },
            { text: " and my dedication to mastering the craft of " },
            { text: "web development", className: "text-cyber-purple font-bold" },
            { text: "." }
        ],
        link: 'https://yion.vercel.app',
        linkText: 'Visit Workshop',
        tags: ['Web Development', 'Personal'],
    },
    {
        title: 'HealthX Axis',
        titleColor: 'text-green-400',
        subtitle: 'Website Development Project',
        logo: 'pictures/healthX logo.jpeg',
        logoFallback: 'https://placehold.co/200x80/ffffff/0a0a1a?text=HealthX+Axis',
        logoBg: 'bg-gray-800/50',
        segments: [
            { text: "I had the privilege of collaborating with " },
            { text: "HealthX Axis", className: "text-green-400 font-bold" },
            { text: ", a forward-thinking company in the " },
            { text: "healthcare technology", className: "text-cyber-cyan font-semibold" },
            { text: " sector. My role was to lead the " },
            { text: "development", className: "text-orange-400 font-semibold" },
            { text: " of their new " },
            { text: "corporate website", className: "text-neon-yellow font-semibold" },
            { text: ", which is " },
            { text: "mpppa.org.my", className: "text-cyber-purple hover:underline font-semibold", href: "https://mpppa.org.my" },
            { text: "." }
        ],
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
        segments: [
            { text: "Together with my " },
            { text: "team", className: "text-cyber-cyan font-semibold" },
            { text: ", we developed the " },
            { text: "frontend", className: "text-green-400 font-semibold" },
            { text: " and " },
            { text: "backend", className: "text-orange-400 font-semibold" },
            { text: " system for the " },
            { text: "Lexus roadshow", className: "text-neon-yellow font-bold" },
            { text: " event, which includes " },
            { text: "OTP verification", className: "text-pink-400 font-semibold" },
            { text: " and a " },
            { text: "login feature", className: "text-cyber-purple font-semibold" },
            { text: " that stores data " },
            { text: "securely", className: "text-red-400 font-semibold" },
            { text: " in the database." }
        ],
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
        segments: [
            { text: "I developed this " },
            { text: "website", className: "text-cyber-cyan font-semibold" },
            { text: " accurately translating the " },
            { text: "client's design", className: "text-neon-yellow font-semibold" },
            { text: " into functional code." }
        ],
        link: 'https://csps.vercel.app/',
        linkText: 'Visit Website',
        tags: ['Web Development', 'Client Work'],
    },
    {
        title: 'SWSG Website',
        titleColor: 'text-cyber-purple',
        subtitle: 'Website Development Project',
        logo: 'https://csps.vercel.app/picture/logo.png',
        logoFallback: 'https://placehold.co/200x80/0a0a1a/00f0ff?text=SWSG',
        logoBg: 'bg-white/90',
        segments: [
            { text: "I collaborated with my friends to build this " },
            { text: "website", className: "text-pink-400 font-semibold" },
            { text: ", carefully implementing the " },
            { text: "client's design", className: "text-green-400 font-semibold" },
            { text: " requirements." }
        ],
        link: 'https://swsg1.vercel.app/',
        linkText: 'Visit Website',
        tags: ['Web Development', 'Client Work'],
    },
    {
        title: 'Mosaic Residence',
        titleColor: 'text-blue-400',
        subtitle: 'Website Development Project',
        logo: 'pictures/mosaic.jpg',
        logoFallback: 'https://placehold.co/200x80/0a0a1a/00f0ff?text=Mosaic',
        logoBg: 'bg-white/90',
        segments: [
            { text: "My team and I developed this " },
            { text: "website", className: "text-orange-400 font-semibold" },
            { text: ", bringing the " },
            { text: "client's design", className: "text-cyber-purple font-semibold" },
            { text: " vision to life." }
        ],
        link: 'https://mosaic-residence.my',
        linkText: 'Visit Website',
        tags: ['Web Development', 'Client Work'],
    },
    {
        title: 'EPF-Calculate-Simulator',
        titleColor: 'text-teal-400',
        subtitle: 'Personal Project',
        logo: 'pictures/epf-cal.png',
        logoFallback: 'https://placehold.co/200x80/0a0a1a/00f0ff?text=EPF',
        logoBg: 'bg-white/90',
        segments: [
            { text: "I independently developed this " },
            { text: "simulator", className: "text-teal-400 font-semibold" },
            { text: " as a " },
            { text: "personal project", className: "text-blue-400 font-semibold" },
            { text: " to help users estimate their EPF calculations." }
        ],
        link: 'https://yion05.my',
        linkText: 'Visit Website',
        tags: ['Web Development', 'Utility'],
    },
    {
        title: 'Solidventura',
        titleColor: 'text-red-400',
        subtitle: 'Website Development Project',
        logo: 'pictures/svr.jpg',
        logoFallback: 'https://placehold.co/200x80/0a0a1a/00f0ff?text=Solidventura',
        logoBg: 'bg-white/90',
        segments: [
            { text: "My team and I built this " },
            { text: "website", className: "text-red-400 font-semibold" },
            { text: " featuring our " },
            { text: "custom design", className: "text-yellow-400 font-semibold" },
            { text: " and interactive elements." }
        ],
        link: 'https://solidventura.com',
        linkText: 'Visit Website',
        tags: ['Web Development', 'Client Work'],
    },
    {
        title: 'Consen Renovation Construction',
        titleColor: 'text-fuchsia-400',
        subtitle: 'Website Development Project',
        logo: 'pictures/CRC.png',
        logoFallback: 'https://placehold.co/200x80/0a0a1a/00f0ff?text=CRC',
        logoBg: 'bg-gray-800/50',
        segments: [
            { text: "I independently designed and developed this " },
            { text: "corporate website", className: "text-fuchsia-400 font-semibold" },
            { text: " from scratch for the " },
            { text: "client", className: "text-green-400 font-semibold" },
            { text: "." }
        ],
        link: 'https://crcjj.vercel.app/',
        linkText: 'Visit Website',
        tags: ['Web Development', 'Client Work'],
    },
    {
        title: 'PD Leisure',
        titleColor: 'text-indigo-400',
        subtitle: 'Website Development Project',
        logo: 'https://www.creativefabrica.com/wp-content/uploads/2020/03/09/Beach-logo-Graphics-3535417-1.jpg',
        logoFallback: 'https://placehold.co/200x80/0a0a1a/00f0ff?text=PD+Leisure',
        logoBg: 'bg-gray-800/50',
        segments: [
            { text: "I independently " },
            { text: "designed and developed", className: "text-indigo-400 font-semibold" },
            { text: " this entire website for " },
            { text: "PD Leisure", className: "text-cyber-cyan font-bold" },
            { text: ". It holds special significance as the " },
            { text: "very first website", className: "text-pink-400 font-semibold" },
            { text: " I ever built." }
        ],
        link: 'https://pdleisure.my',
        linkText: 'Visit Website',
        tags: ['Web Development', 'Family Project'],
    }
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

                const spanContent = (
                    <motion.span
                        variants={{
                            hidden: { opacity: 0, filter: 'blur(4px)', y: 4 },
                            visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.3 } }
                        }}
                        className={`inline-block ${seg.className || ''}`}
                    >
                        {part}
                    </motion.span>
                );

                if (seg.href) {
                    return (
                        <a key={`${i}-${j}`} href={seg.href} target="_blank" rel="noopener noreferrer">
                            {spanContent}
                        </a>
                    );
                }

                return <span key={`${i}-${j}`}>{spanContent}</span>;
            });
        })}
    </motion.span>
);

const cardVariants = {
    hidden: (i) => ({
        opacity: 0,
        x: i % 2 === 0 ? -80 : 80,
        rotateY: i % 2 === 0 ? -10 : 10,
    }),
    visible: (i) => ({
        opacity: 1,
        x: 0,
        rotateY: 0,
        transition: { duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] },
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
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-orbitron text-4xl md:text-5xl font-bold mb-10 section-title gradient-text"
            >
                Portfolio & Cooperation
            </motion.h2>

            <div className="space-y-8">
                {projects.map((project, i) => (
                    <motion.div
                        key={i}
                        variants={cardVariants}
                        custom={i + 1}
                        whileHover={{
                            y: -6,
                            transition: { duration: 0.3 },
                        }}
                        className="glass-card p-6 md:p-8 tilt-card group relative overflow-hidden"
                    >
                        {/* Animated corner accent */}
                        <motion.div
                            className="absolute top-0 left-0 w-16 h-16"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                        >
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyber-cyan to-transparent" />
                            <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-cyber-cyan to-transparent" />
                        </motion.div>

                        {/* Background glow on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/5 via-transparent to-cyber-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" />

                        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                            {/* Logo or Icon with float animation on hover */}
                            {project.logo ? (
                                <motion.div
                                    className={`${project.logoBg} p-4 rounded-xl flex-shrink-0 flex items-center justify-center min-w-[120px]`}
                                    whileHover={{ y: -5, rotate: 3 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
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
                                </motion.div>
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

                                {/* Tags with pop-in animation */}
                                {project.tags && (
                                    <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                                        {project.tags.map((tag, j) => (
                                            <motion.span
                                                key={j}
                                                initial={{ scale: 0, opacity: 0 }}
                                                whileInView={{ scale: 1, opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{
                                                    delay: 0.3 + j * 0.1,
                                                    type: 'spring',
                                                    stiffness: 400,
                                                    damping: 15,
                                                }}
                                                className="px-3 py-1 text-xs font-orbitron tracking-wider rounded-full border border-cyber-cyan/20 text-cyber-cyan/70 bg-cyber-cyan/5"
                                            >
                                                {tag}
                                            </motion.span>
                                        ))}
                                    </div>
                                )}

                                <p className="font-rajdhani text-gray-300 leading-relaxed text-lg mb-5">
                                    <AnimatedText segments={project.segments} />
                                </p>

                                {project.link && (
                                    <motion.a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="cyber-btn inline-block text-sm"
                                        whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0,240,255,0.3)' }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {project.linkText}
                                    </motion.a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}
