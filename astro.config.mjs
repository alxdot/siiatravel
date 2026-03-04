import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://siiatravel.com',

  trailingSlash: 'never',

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});
