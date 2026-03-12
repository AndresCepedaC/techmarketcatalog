/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary:   "#0B1D29",
          secondary: "#4BA99F",
          accent:    "#EBFFFF",
          light:     "#62D2C0",
          dark:      "#35766F",
        },
        quantum: {
          cyan:    "#00F5FF",
          purple:  "#9D00FF",
          deep:    "#02040A",
          glass:   "rgba(11, 29, 41, 0.4)",
        },
        surface: {
          base:     "#0B0D17",
          elevated: "#121521",
          overlay:  "#1A1E2C",
          border:   "rgba(75, 169, 159, 0.2)"
        },
        text: {
          primary:   "#FFFFFF",
          secondary: "rgba(235, 255, 255, 0.8)",
          muted:     "rgba(75, 169, 159, 0.6)",
          inverse:   "#0B0D17"
        }
      },
      boxShadow: {
        'neon-sm':  "0 0 6px rgba(0, 245, 255, 0.5)",
        'neon-md':  "0 0 20px rgba(0, 245, 255, 0.4), 0 0 40px rgba(0, 245, 255, 0.1)",
        'neon-lg':  "0 0 30px rgba(0, 245, 255, 0.4), 0 0 60px rgba(0, 245, 255, 0.15)",
        'neon-xl':  "0 0 60px rgba(0, 245, 255, 0.2), 0 0 120px rgba(0, 245, 255, 0.08)",
        'neon-volumetric': "0 0 40px rgba(0, 245, 255, 0.3), 0 0 80px rgba(0, 245, 255, 0.15), 0 0 120px rgba(0, 245, 255, 0.05), 0 30px 60px rgba(0, 0, 0, 0.5)",
        'island-float': "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 245, 255, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        'double-cyan': "0 0 0 1px rgba(0, 245, 255, 0.3), 0 0 0 3px rgba(0, 245, 255, 0.1), 0 0 30px rgba(0, 245, 255, 0.08)",
        'double-purple': "0 0 0 1px rgba(157, 0, 255, 0.3), 0 0 0 3px rgba(157, 0, 255, 0.1)",
        'card': "0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(75, 169, 159, 0.1)",
      },
      backgroundImage: {
        'nebula': "url('/photos/backgrounds/nebula_bg.png')",
        'quantum-gradient': "linear-gradient(to right, #00F5FF, #9D00FF)",
      },
      animation: {
        'neon-pulse':    'neonPulse 3s ease-in-out infinite',
        'float':         'float 3s ease-in-out infinite',
        'shimmer':       'shimmer 1.4s infinite linear',
        'dot-pulse':     'dotPulse 2s ease-in-out infinite',
        'fade-in':       'fadeIn 0.4s ease-out',
        'slide-up':      'slideUp 0.4s ease-out',
        'data-stream':   'dataStream 20s linear infinite',
        'levitate-slow': 'levitate-slow 6s ease-in-out infinite',
        'levitate-med':  'levitate-med 4.5s ease-in-out infinite',
        'levitate-fast': 'levitate-fast 3.5s ease-in-out infinite',
        'pulse-glow':    'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        neonPulse: {
          '0%,100%': { opacity: '1', filter: 'brightness(1)' },
          '50%':     { opacity: '0.85', filter: 'brightness(1.3)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        dotPulse: {
          '0%,100%': { transform: 'scale(1)',   opacity: '1'   },
          '50%':     { transform: 'scale(1.35)', opacity: '0.6' },
        },
        fadeIn:  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(12px)' },
                   '100%': { opacity: '1', transform: 'translateY(0)' } },
        dataStream: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 1000px' },
        },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 20px rgba(0, 245, 255, 0.1), 0 0 40px rgba(0, 245, 255, 0.05)' },
          '50%':     { boxShadow: '0 0 40px rgba(0, 245, 255, 0.2), 0 0 80px rgba(0, 245, 255, 0.1)' },
        },
      }
    },
  },
  plugins: [],
}
