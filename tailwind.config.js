/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        teal:      '#00BFA5',
        'teal-dark': '#003D36',
        'teal-mid':  '#00897B',
        orange:    '#FF6B35',
        'orange-light': '#FF8C5A',
        cream:     '#F2FAFA',
        ink:       '#002B22',
        muted:     '#4A706A',
        border:    '#A8D8D0',
        light:     '#E0F5F1',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
