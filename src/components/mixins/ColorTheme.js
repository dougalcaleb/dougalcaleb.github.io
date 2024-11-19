export default {
	data() {
		return {
			dark: false
		}
	},
	methods: {
		setTheme(dark) {
			if (dark) {
				localStorage.setItem("theme", "dark");
				document.documentElement.classList.add("dark");
			} else {
				localStorage.setItem("theme", "light");
				document.documentElement.classList.remove("dark");
			}
			this.dark = dark;
		},
		switchTheme() {
			this.setTheme(!this.dark);
		}
	},
	mounted() {
		this.dark = localStorage.getItem("theme") === "dark";
	}
}