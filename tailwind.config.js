/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0B0D17',
          800: '#111427',
          700: '#161A2E',
          600: '#1C2039',
          500: '#242844'
        },
        neon: {
          cyan: '#00E5FF',
          purple: '#B026FF',
          pink: '#FF2D95'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
