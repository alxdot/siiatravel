import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://siiatravel.com',

  trailingSlash: 'never',

  integrations: [react()],

  adapter: vercel(),

  vite: {
    plugins: [tailwindcss()]
  }
});
