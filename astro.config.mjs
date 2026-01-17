// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import clerk from "@clerk/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://changemanaged.io",
  output: "server",
  adapter: vercel(),
  integrations: [sitemap(), clerk()],
  vite: {
    plugins: [tailwindcss()],
  },
});
