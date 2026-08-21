/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        surface: {
          ground: '#FBFBFA',
          card: '#FFFFFF',
          muted: '#F4F4F0',
          dark: '#0F0F12',
          'dark-card': '#18181C',
          'dark-elevated': '#222228',
        },
        brand: {
          amber: '#D97706',
          'amber-hover': '#B45309',
          blue: '#2563EB',
          emerald: '#16A34A',
        },
        border: {
          subtle: '#EAEAE4',
          muted: '#D8D8D0',
          dark: '#27272A',
          'dark-subtle': '#1F1F24',
        },
        content: {
          primary: '#111114',
          secondary: '#52525B',
          muted: '#71717A',
          light: '#F4F4F5',
          'light-muted': '#A1A1AA',
        },
      },
      fontFamily: {
        sans: ['"Outfit"', '"Outfit Variablefont Wght"', 'Arial', 'sans-serif'],
        display: ['"Red Hat Display"', '"Redhatdisplay Variablefont Wght"', 'Arial', 'sans-serif'],
        mono: ['Geist Mono', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};