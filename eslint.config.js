import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default defineConfig([
	// public/ is served as-is (static sub-sites and libraries), roundabout is a vendored minified build
	globalIgnores(["dist/", "public/", "src/modules/roundabout/"]),
	js.configs.recommended,
	pluginVue.configs["flat/recommended"],
	{
		languageOptions: {
			globals: globals.browser,
		},
		rules: {
			"vue/multi-word-component-names": "off",
			// Props are passed camelCase throughout (e.g. :iconColor)
			"vue/attribute-hyphenation": "off",
			"no-unused-vars": "warn",
			"no-unused-private-class-members": "warn",
		},
	},
	{
		files: ["*.config.js"],
		languageOptions: {
			globals: globals.node,
		},
	},
	// Must be last: turns off rules that conflict with Prettier
	prettier,
]);
