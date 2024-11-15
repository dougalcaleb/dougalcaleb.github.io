/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}",
	],
	theme: {
		colors: {},
		fontFamily: {
			sans: [
				"Inter",
				"system-ui",
				"-apple-system",
				"BlinkMacSystemFont",
				"Segoe UI",
				"Roboto",
				"Helvetica Neue",
				"Arial",
				"sans-serif",
			],
			serif: [
				"Georgia",
				"Cambria",
				"Times New Roman",
				"Times",
				"serif"
			],
		},
		extend: {}
	},
	plugins: [],
};
