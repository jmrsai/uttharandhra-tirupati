/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A202C", 
        secondary: "#2D3748", 
        accent: "#F6E05E", 
        neutral: "#A0AEC0", 
        'base-100': "#EDF2F7", 
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        serif: ['"Tiro Telugu"', 'serif'],
        header: ['"Roboto Slab"', 'serif'], 
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'ray': 'ray 10s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
