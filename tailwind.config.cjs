/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#14B8A6',
        secondary: '#0F766E',
        dark: '#111827',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
};