/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        zara: {
          white: '#FFFFFF',
          'off-white': '#FAFAFA',
          'light-gray': '#F5F5F5',
          'medium-gray': '#E5E5E5',
          'gray': '#D4D4D4',
          'dark-gray': '#A3A3A3',
          'charcoal': '#737373',
          'deep-gray': '#525252',
          'near-black': '#262626',
          black: '#000000',
        }
      },
    },
  },
  plugins: [],
};
