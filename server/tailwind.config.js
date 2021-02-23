module.exports = {
  purge: ['./pages/**/*.{jsx,tsx}', './client/**/*.{jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    extend: {},
  },
  variants: {
    extend: {
      backgroundOpacity: ['active'],
    },
  },
  plugins: [],
}
