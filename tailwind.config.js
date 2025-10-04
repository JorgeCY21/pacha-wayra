/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2D6A4F',
        secondary: '#95D5B2',
        accent: '#FFC300',
        earth: '#B08968',
      },
    },
  },
  plugins: [],
}
// refactor: update language attribute, clean up App component, and enhance styling with Tailwind CSS