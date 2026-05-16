import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateSocialCards } from '../../scripts/social-cards.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..', '..');
const publicCardsDir = path.join(rootDir, 'public', 'social-cards');

const routeFromHtmlPath = (htmlPath, outDir) => {
  const relative = path.relative(outDir, htmlPath).replace(/\\/g, '/');
  if (relative === 'index.html') return '/';
  return `/${relative.replace(/\/index\.html$/, '/').replace(/\.html$/, '/')}`;
};

const cardFileFromRoute = (route) =>
  route === '/'
    ? path.join(publicCardsDir, 'index.png')
    : path.join(publicCardsDir, route.replace(/^\/|\/$/g, ''), 'index.png');

const cardPathFromRoute = (route) =>
  route === '/' ? '/social-cards/index.png' : `/social-cards${route}index.png`;

const listHtmlFiles = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listHtmlFiles(fullPath)));
    } else if (entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }

  return files;
};

const hasFile = async (filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

const injectAfter = (html, marker, tags) => {
  if (!html.includes(marker)) return html.replace('</head>', `${tags}</head>`);
  return html.replace(marker, `${marker}${tags}`);
};

const socialTags = (imageUrl) =>
  [
    `<meta property="og:image" content="${imageUrl}">`,
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    '<meta property="og:image:type" content="image/png">',
    `<meta name="twitter:image" content="${imageUrl}">`,
  ].join('');

export default function socialCardsIntegration() {
  let site;
  let outDir;

  return {
    name: 'frcdesign-social-cards',
    hooks: {
      'astro:config:done': ({ config }) => {
        site = config.site?.toString() || 'https://star.frcdesign.org';
        outDir = fileURLToPath(config.outDir);
      },
      'astro:build:start': async () => {
        await generateSocialCards({ site });
      },
      'astro:build:done': async () => {
        const htmlFiles = await listHtmlFiles(outDir);

        for (const htmlFile of htmlFiles) {
          const route = routeFromHtmlPath(htmlFile, outDir);
          if (!(await hasFile(cardFileFromRoute(route)))) continue;

          const html = await fs.readFile(htmlFile, 'utf8');
          if (html.includes('property="og:image"') || html.includes('name="twitter:image"')) continue;

          const imageUrl = cardPathFromRoute(route);
          const updated = injectAfter(
            html,
            '<meta name="twitter:card" content="summary_large_image"/>',
            socialTags(imageUrl)
          );

          await fs.writeFile(htmlFile, updated);
        }
      },
    },
  };
}
