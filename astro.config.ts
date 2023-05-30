import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import vercel from "@astrojs/vercel/serverless";
import dotenv from 'dotenv'; 



// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), solidJs()],
  publicDir: 'public',
  site: 'https://www.multiexam.vercel.app',
  cacheDir: './node_modules/.astro',
  compressHTML: true,
  output: 'server',
  build: {
    server: './server'
  },
  adapter: vercel()
});