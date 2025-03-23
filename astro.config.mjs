import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://morshadunnur.me',
  integrations: [
    tailwind(),
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/admin/'), // Exclude admin pages
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ]
});
