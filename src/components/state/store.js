import { defineStore } from "pinia"

export const defaultStore = defineStore("default", {
	state: () => ({
		isDarkTheme: false,
	}),
	mutations: {
		switchTheme() {
			this.isDarkTheme = !this.isDarkTheme;
		},
		setTheme(dark) {
			this.isDarkTheme = dark;
		},
	},
	getters: {
		
	},
	actions: {

	},
});