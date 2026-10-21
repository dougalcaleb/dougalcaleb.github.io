import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// The dev server doesn't resolve directory URLs (e.g. /portfolio/parallel/) to an index.html inside public/,
// so it would fall back to the main app. Mirror GitHub Pages' behaviour.
function publicDirIndex() {
	return {
		name: "public-dir-index",
		configureServer(server) {
			server.middlewares.use((req, _res, next) => {
				const [pathname, query] = req.url.split("?");
				if (pathname.endsWith("/") && pathname !== "/") {
					const indexFile = path.join(server.config.publicDir, decodeURIComponent(pathname), "index.html");
					if (fs.existsSync(indexFile)) {
						req.url = `${pathname}index.html${query ? `?${query}` : ""}`;
					}
				}
				next();
			});
		},
	};
}

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue(), tailwindcss(), publicDirIndex()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
});
