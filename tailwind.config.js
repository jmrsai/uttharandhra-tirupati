
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "spiritual-maroon": "#800000",
        "spiritual-gold": "#FF9933",
        "spiritual-cream": "#fdfaf3",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        header: ['Cinzel', 'serif'],
        telugu: ['Mandali', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
