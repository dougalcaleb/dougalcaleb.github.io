/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{vue,js,ts,jsx,tsx}",
	],
	darkMode: ['selector'],
	theme: {
		colors: {
			"gray-0": 	"hsl(0, 0%, 3%)",
			"gray-1": 	"hsl(0, 0%, 10%)",
			"gray-2": 	"hsl(0, 0%, 12%)",
			"gray-3": 	"hsl(0, 0%, 16%)",
			"gray-4": 	"hsl(0, 0%, 19%)",
			"gray-5": 	"hsl(0, 0%, 24%)",
			"gray-6": 	"hsl(0, 0%, 39%)",
			"gray-7": 	"hsl(0, 0%, 52%)",
			"gray-8": 	"hsl(0, 0%, 70%)",
			"gray-9": 	"hsl(0, 0%, 80%)",
			"gray-10": 	"hsl(0, 0%, 90%)",
			"white": 	"hsl(0, 0%, 98%)",
			"blue-0":	"hsl(194, 100%, 27%)",
			"blue-1":	"hsl(197, 100%, 36%)",
			"blue-2":	"hsl(197, 100%, 50%)",
			"purple-0": "hsl(268, 41%, 23%)",
			"purple-1": "hsl(271, 41%, 28%)",
			"purple-2": "hsl(267, 40%, 34%)",
			"purple-3": "hsl(265, 40%, 39%)",
			"purple-4": "hsl(271, 41%, 56%)",
			"purple-5": "hsl(272, 41%, 70%)",
			"green-0": 	"hsl(138, 51%, 38%)",
			"green-1": 	"hsl(137, 50%, 43%)",
			"green-2": 	"hsl(138, 47%, 64%)",
			"red-0": 	"hsl(10, 65%, 41%)",
			"red-1": 	"hsl(10, 65%, 48%)",
			"red-2": 	"hsl(10, 65%, 56%)",
			"yellow-0": "hsl(36, 98%, 52%)",
			"yellow-1": "hsl(36, 99%, 56%)",
			"yellow-2": "hsl(36, 99%, 64%)",
			"ls-blue-dark": "hsl(213, 52%, 38%)",
			"ls-blue-light": "hsl(210, 50%, 59%)",
		},
		fontFamily: {
			title: [
				'Poppins',
				'Miriam Libre',
				'system-ui',
				'-apple-system',
				'sans-serif',
			],
			subtitle: [
				"Miriam Libre",
				"system-ui",
				"-apple-system",
				"sans-serif",
			],
			ls: [
				"Metropolis",
				"Miriam Libre",
				"Poppins",
				"sans-serif",
			],
			body: [
				"Ubuntu",
				"system-ui",
				"-apple-system",
				"sans-serif",
			],
			mono: [
				'Ubuntu Mono',
				'monospace',
			],
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
				"serif",
			],
		},
	},
	safelist: [
		'h-1', 'h-2', 'h-3', 'h-4', 'h-5', 'h-6', 'h-7', 'h-8', 'h-9', 'h-10', 'h-16', 'h-20',
		'w-1', 'w-2', 'w-3', 'w-4', 'w-5', 'w-6', 'w-7', 'w-8', 'w-9', 'w-10', 'w-16', 'w-20'
	],
	plugins: [],
};
