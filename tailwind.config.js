/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: [ 'Poppins', 'sans-serif' ],
    },
    extend: {},
  },
  darkMode: 'class',
  plugins: [],
}
