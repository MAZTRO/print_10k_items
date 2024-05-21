/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'p-white': 'var(--color-white)',
        'p-black': 'var(--color-black)',
        'p-green': 'var(--color-green)',
        'p-yellow': 'var(--color-yellow)',
        'p-red': 'var(--color-red)'
      }
    }
  },
  plugins: []
}
