/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#CF6BDD',
          dark: '#B44EC4',
          light: '#D98AE4',
        },
        dark: {
          DEFAULT: '#0E1820',
          lighter: '#1A2730',
          card: '#141F28',
        },
      },
    },
  },
  plugins: [],
};