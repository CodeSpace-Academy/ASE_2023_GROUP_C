/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
   
    './components/recipe-list.js', 
    './components/layout/layout.js',
    './components/recipe-cart/recipecard.js'
   
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
