/** @type {import('tailwindcss').Config} */
const {nextui} = require('@nextui-org/react'); 
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: [ '"DM Sans"', 'sans-serif' ],
    },
    extend: {},
  },
  darkMode: 'class',
  plugins: [nextui()],
}
