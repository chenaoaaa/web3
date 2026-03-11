/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-purple': '#B026FF',
        'neon-blue': '#00D4FF',
        'neon-green': '#00FF88',
        'neon-pink': '#FF2D78',
        'neon-gold': '#FFD700',
        'dark-bg': '#030712',
        'dark-card': '#0D1117',
        'dark-border': '#1a2035',
        'cyber-purple': '#7B2FBE',
        'cyber-blue': '#0EA5E9',
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(0, 212, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.05) 1px, transparent 1px)',
        'neon-gradient': 'linear-gradient(135deg, #B026FF 0%, #00D4FF 50%, #00FF88 100%)',
        'dark-gradient': 'linear-gradient(135deg, #030712 0%, #0D1117 50%, #111827 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(176, 38, 255, 0.1) 0%, rgba(0, 212, 255, 0.1) 100%)',
        'glow-gradient': 'radial-gradient(ellipse at center, rgba(176, 38, 255, 0.15) 0%, transparent 70%)',
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
      fontFamily: {
        'cyber': ['Orbitron', 'monospace'],
        'mono': ['Space Mono', 'monospace'],
      },
      animation: {
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glitch': 'glitch 3s infinite',
        'scan': 'scan 2s linear infinite',
        'rotate-slow': 'rotate 20s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'bounce-glow': 'bounceGlow 2s ease-in-out infinite',
      },
      keyframes: {
        pulseNeon: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(176, 38, 255, 0.5), 0 0 20px rgba(176, 38, 255, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(176, 38, 255, 0.8), 0 0 40px rgba(176, 38, 255, 0.5), 0 0 60px rgba(176, 38, 255, 0.3)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        bounceGlow: {
          '0%, 100%': { transform: 'translateY(0)', filter: 'drop-shadow(0 0 8px rgba(0, 255, 136, 0.5))' },
          '50%': { transform: 'translateY(-10px)', filter: 'drop-shadow(0 0 20px rgba(0, 255, 136, 0.9))' },
        }
      },
      boxShadow: {
        'neon-purple': '0 0 20px rgba(176, 38, 255, 0.5)',
        'neon-blue': '0 0 20px rgba(0, 212, 255, 0.5)',
        'neon-green': '0 0 20px rgba(0, 255, 136, 0.5)',
        'neon-pink': '0 0 20px rgba(255, 45, 120, 0.5)',
        'card': '0 4px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      dropShadow: {
        'neon': '0 0 8px rgba(176, 38, 255, 0.8)',
        'neon-blue': '0 0 8px rgba(0, 212, 255, 0.8)',
      }
    },
  },
  plugins: [],
}
