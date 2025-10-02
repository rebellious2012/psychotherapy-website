/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html"], // важно: сканирует твои HTML-файлы
  theme: {
    extend: {
      colors: {
        'primary-bg': '#2D1B14',
        'accent-gold': '#FFD700',
        'text-secondary': '#B0B0B0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    }
  },
  plugins: [],
}