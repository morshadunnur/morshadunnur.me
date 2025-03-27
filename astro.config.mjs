import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  trailingSlash: 'never',
  site: 'https://morshadunnur.me',
  integrations: [
    tailwind(),
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/admin/'), // Exclude admin pages
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        // Customize the sitemap entries
        return {
          url: item.url,
          lastmod: item.lastmod,
          changefreq: item.changefreq || 'weekly',
          priority: item.priority || 0.7,
        };
      },
      entryLimit: 10000, // Increase the entry limit if needed
    }),
  ]
});
