/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgba(26, 26, 26, 0.90)', // Dark semi-transparent background - adjusted for visibility
        secondary: '#facc15', // Yellow accent (Skinhead/Punk vibe)
        accent: '#dc2626', // Red accent
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
