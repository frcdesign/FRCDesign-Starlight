import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkGlossary from './src/plugins/remark-glossary';

import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  image: {
    service: {
      entrypoint: 'astro/assets/services/compile',
    },
  },

  markdown: {
    remarkPlugins: [remarkGlossary],
  },

  integrations: [
    starlight({
      title: 'FRCDesign.org',
      logo: {
        src: './src/assets/universal/book.svg',
        alt: 'FRCDesign.org logo',
      },
      customCss: [
        './src/styles/global.css',
      ],
      components: {
        Header: './src/starlightOverrides/Header.astro',
        Footer: './src/starlightOverrides/Footer.astro',
        Sidebar: './src/starlightOverrides/Sidebar.astro',
        Pagination: './src/starlightOverrides/Pagination.astro',
        Hero: './src/starlightOverrides/Hero.astro',
      },
      tableOfContents: false,
      // Sidebar configuration is now managed in src/config/sidebarConfig.ts
      // This allows different sidebars per top-level navigation section
    }),
  ],

  adapter: cloudflare(),
});
