// tailwind.config.js
module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false,
    theme: {
      extend: {
        colors: {
          'passareprimary': '#1A355E',
          'passaresecondary': '#3E7C92',
          'passaretert': '#E6644F',
        }
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }