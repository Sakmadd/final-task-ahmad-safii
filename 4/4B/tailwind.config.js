const { newUtilities } = require('./src/js/customUtility')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,hbs}'],
  theme: {
    extend: {},
  },
  plugins: [
    function({ addUtilities }) {
      newUtilities
      addUtilities(newUtilities)
    },
  ],
}
