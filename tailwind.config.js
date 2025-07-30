/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kajkhuji-green': '#10b981',
        'background': '#f8fafc',
      }
    },
  },
  plugins: [],
}