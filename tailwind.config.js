/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#071f38',
          900: '#0b2a4a',
          850: '#0f3458',
          800: '#123d64',
        },
        gold: {
          300: '#e6c965',
          400: '#d9b74f',
          500: '#cfa83f',
        },
      },
      boxShadow: {
        panel: '0 0 0 1px rgba(188, 207, 236, 0.12)',
      },
    },
  },
  plugins: [],
}

