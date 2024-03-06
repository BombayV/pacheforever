/** @type {import('tailwindcss').Config} */
export default {
  content: [
      './src/**/*.{svelte,html}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'raleway': ['Raleway', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

