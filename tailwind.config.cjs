/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#0056b3', // Darker blue with better contrast on white
      secondary: '#004085', // Even darker blue for hover states
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#6b7280', // Darker gray for better contrast
        500: '#4b5563',
        600: '#374151',
        700: '#1f2937',
        800: '#111827',
        900: '#0f172a',
      },
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
};