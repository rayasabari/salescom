const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    fontFamily: {
      'poppins': ['"Poppins"'],
    },
    extend: {
      colors: {
        primary: colors.teal
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
