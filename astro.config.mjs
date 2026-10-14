// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	site: "https://avantgardev.com.mx",
	trailingSlash: "never",
	build: { format: "file" },
	integrations: [react(), sitemap({ serialize: (item) => ({ ...item, lastmod: new Date().toISOString() }) })],
	vite: {
		plugins: [tailwindcss()],
	},
});
