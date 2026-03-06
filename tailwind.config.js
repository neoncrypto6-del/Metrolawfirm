
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        metro: {
          black: '#0A0A0A',
          gold: '#C5A55A',
          'gold-hover': '#D4B86A',
          surface: '#111111',
          border: '#1A1A1A',
          muted: '#808080',
          body: '#B0B0B0'
        }
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
