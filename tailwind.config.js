/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './*.{js,ts,jsx,tsx}',
    './components/**/*.{jsx,tsx}',
    './lib/**/*.ts',
    './services/**/*.ts',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#1A1A1A',
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E5C565',
          dark: '#B59020',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        spotlight: 'spotlight 2s ease .75s 1 forwards',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        spotlight: {
          '0%': { opacity: 0, transform: 'translate(-72%, -62%) scale(0.5)' },
          '100%': { opacity: 1, transform: 'translate(-50%,-40%) scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
