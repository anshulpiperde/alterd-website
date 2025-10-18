/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#000000',           // Pure black background
          'bg-secondary': '#0A0A0A', // Slightly lighter black
          'bg-elevated': '#141414',  // Elevated surfaces
          'bg-hover': '#1A1A1A',     // Hover states
          border: '#262626',         // Borders
          'border-light': '#333333', // Lighter borders
          text: '#FFFFFF',           // Primary text (white)
          'text-secondary': '#A3A3A3', // Secondary text (gray)
          'text-muted': '#737373',   // Muted text
          accent: '#FFFFFF',         // Accent color (white)
        }
      },
    },
  },
  plugins: [],
};
