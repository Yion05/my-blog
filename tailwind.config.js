/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                orbitron: ['Orbitron', 'sans-serif'],
                rajdhani: ['Rajdhani', 'sans-serif'],
                grotesk: ['Space Grotesk', 'sans-serif'],
            },
            colors: {
                cyber: {
                    cyan: '#00f0ff',
                    purple: '#b000ff',
                    yellow: '#e6ff00',
                    dark: '#0a0a1a',
                    darker: '#050510',
                    card: 'rgba(10, 10, 40, 0.6)',
                },
            },
            boxShadow: {
                'neon-cyan': '0 0 5px #00f0ff, 0 0 20px rgba(0, 240, 255, 0.3)',
                'neon-purple': '0 0 5px #b000ff, 0 0 20px rgba(176, 0, 255, 0.3)',
                'neon-yellow': '0 0 5px #e6ff00, 0 0 20px rgba(230, 255, 0, 0.3)',
                'glass': '0 8px 32px 0 rgba(0, 240, 255, 0.1)',
            },
            animation: {
                'glow-pulse': 'glowPulse 3s ease-in-out infinite',
                'scan-line': 'scanLine 8s linear infinite',
                'flicker': 'flicker 0.15s infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                glowPulse: {
                    '0%, 100%': { textShadow: '0 0 10px #00f0ff, 0 0 20px rgba(0,240,255,0.3)' },
                    '50%': { textShadow: '0 0 20px #00f0ff, 0 0 40px rgba(0,240,255,0.5), 0 0 60px rgba(0,240,255,0.2)' },
                },
                scanLine: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100vh)' },
                },
                flicker: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.8' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
            },
        },
    },
    plugins: [],
}
