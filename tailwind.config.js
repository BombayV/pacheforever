/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{svelte,html}'],
	theme: {
		extend: {
			fontFamily: {
				script: ['Dancing Script', 'cursive'],
				raleway: ['Raleway', 'sans-serif']
			}
		}
	},
	plugins: []
};
