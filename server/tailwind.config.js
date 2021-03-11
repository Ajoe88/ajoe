module.exports = {
  purge: ['./pages/**/*.{jsx,tsx}', './client/**/*.{jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  variants: {
    extend: {
      backgroundOpacity: ['active'],
      rotate: ['group-hover'],
    },
  },
  plugins: [],
}
