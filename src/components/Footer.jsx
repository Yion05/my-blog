export default function Footer() {
    return (
        <footer className="relative z-10 mt-20 border-t border-cyber-cyan/10">
            {/* Neon accent line at top */}
            <div className="h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan/50 to-transparent" />

            <div className="container mx-auto px-6 py-6 text-center">
                <p className="font-rajdhani text-gray-500 text-sm tracking-wider">
                    <span className="text-cyber-cyan/40 font-orbitron text-xs">{'<'}</span>
                    {' '}© 2025 Khoo Jun Yong. All Rights Reserved.{' '}
                    <span className="text-cyber-cyan/40 font-orbitron text-xs">{'/>'}</span>
                </p>
            </div>
        </footer>
    )
}
