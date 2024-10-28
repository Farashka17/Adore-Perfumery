/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '390px',
      'md': '391px',
      'lg': '1025px',
      'xl': '1920px',
      '2xl': '1536px',
      
    },
    extend: {
      fontFamily: {
        'sans': ['Helvetica', 'Arial', 'sans-serif'],
        'serif': ['Georgia', 'serif'],
        'nunito': ['Nunito Sans', 'sans-serif'], // Özelleştirilmiş font
        'raleway': ['Raleway', 'sans-serif'], // Raleway fontu eklendi
        'inter': ['Inter', 'sans-serif'], // Inter fontu eklendi4
        'dancing': ['Dancing Script', 'cursive'], // Dancing Script fontu eklendi
      },
    },
  },
  plugins: [],
}
