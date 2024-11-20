import { defaultStore } from "../state/store";
import { mapStores } from "pinia";

export default {
	data() {
		return {
			executeOnThemeSwitch: [],
		}
	},
	computed: {
		...mapStores(defaultStore),
		isDarkTheme() {
			return this.defaultStore.isDarkTheme;
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
			this.defaultStore.isDarkTheme = dark;
		},
		switchTheme() {
			this.setTheme(!this.defaultStore.isDarkTheme);
		},
		watchForThemeSwitch(callback) {
			this.executeOnThemeSwitch.push(callback);
		}
	},
	beforeMount() {
		this.defaultStore.isDarkTheme = localStorage.getItem("theme") === "dark";
	}
}