/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "originalsurfer":['Original Surfer','sans-serif']
      },
      height:{'83px':"83px",'370px':"376.5px"},
      cursor: {
        'fancy': 'url(hand.cur), pointer',
      }

    },

    
  },
  plugins: [],
}