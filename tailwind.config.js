module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        daygray: '#1E40AF',
        darkgray300: '#DDDDDD',
        darkgray400: '#3c4043',
        darkgray500: '#292a2d',
        darkgray600: '#202124',
        darkblue: '#8ab4f8',
        LightBackground:'#F6F8FC',
        lightgray300: '#F1F3F4',
        lightgray400: '#B8B9BA',
        lightgray500: '#5E5E5E',
        lightgray600: '#3c3b3b',
        lightgray700: '#464646',
        lightblue: '#1A73E8',
        bordermutted: '#292A2E',
        muttedpurple: '#3B3F4C',
      },
      fontSize: {
        title: '28px',
        heading: '21px',
        regular: '14px',
        
      },
      animation: {
        grow: 'grow 0.5s linear',
      },
      keyframes: {
        grow: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
    },
  },
  plugins: [],
};
