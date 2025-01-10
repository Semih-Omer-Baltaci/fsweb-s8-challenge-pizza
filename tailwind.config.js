/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pizza-yellow': '#FDC913',
        'pizza-light-gray': '#5F5F5F',
        'pizza-dark-gray': '#292929',
        'pizza-red': '#CE2829',
        'pizza-beige': '#FAF7F2',
      },
      fontFamily: {
        'roboto-condensed': ['"Roboto Condensed"', 'sans-serif'],
        'barlow': ['Barlow', 'sans-serif'],
        'quattrocento': ['Quattrocento', 'serif'],
        'satisfy': ['Satisfy', 'cursive'],
      },
    },
  },
  plugins: [],
}
