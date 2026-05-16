# THIS IS A DEVELOPMENT REPO NOT THE MAIN REPO.

# FRCDesign.org

A community-driven learning course and resource hub for FRC design and CAD, focused on Onshape. The site is built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build), and deploys with the Cloudflare adapter.

## Project Structure

```text
.
├── .github/workflows/          # GitHub Actions checks
├── public/                     # Static files served exactly by URL
├── scripts/                    # Maintenance scripts
│   └── check-local-links.mjs   # Rendered local link/asset checker
├── src/
│   ├── assets/                 # Imported theme, header, footer, and homepage assets
│   ├── components/
│   │   ├── content/            # Components used inside MDX pages
│   │   ├── general/            # Site-wide utility components
│   │   └── homepage/           # Homepage components
│   ├── config/                 # Sidebar and table-of-contents configuration
│   ├── content/docs/           # Starlight MDX documentation pages
│   ├── data/                   # Static data such as glossary terms
│   ├── plugins/                # Remark plugins
│   ├── starlightOverrides/     # Custom Starlight component overrides
│   └── styles/                 # Global CSS
├── astro.config.mjs            # Astro, Starlight, sitemap, and Cloudflare config
├── package.json
├── package-lock.json
├── tsconfig.json
└── wrangler.jsonc
```

Generated folders such as `dist/`, `.astro/`, and `node_modules/` are ignored by git.

## Content Organization

All docs live under `src/content/docs/`. Page URLs are based on the folder path and `.mdx` filename.

File naming rules:
- Use lowercase filenames.
- Use hyphens between words: `methods-of-contributing.mdx`, not `methodsofcontributing.mdx`.
- Keep `index.mdx` for section landing pages.
- Existing team/year mechanism examples use underscore-style identifiers, such as `2910_2023_dt.mdx`.

When renaming a page, update:
- `src/config/sidebarConfig.ts`
- Any Markdown links to the old route
- Header or navigation links if the page is a nav target

## Assets

For normal content images, place images near the page that uses them, usually in an `img/` folder beside the MDX file, and reference them with `ContentFigure`, `Slides`, or Markdown image syntax.

Use `public/` only when the browser needs to request an exact static URL, such as raw HTML `<video>` sources or files that should not go through Astro image optimization.

## Content Components

Import content components from `@components/content/` in MDX files.

### ContentFigure

Use `ContentFigure` for images, animated media, and YouTube videos.

```mdx
import ContentFigure from '@components/content/ContentFigure.astro';

<ContentFigure src="../img/example.webp" alt="Description" />

<ContentFigure src="../img/example.webp" alt="Description" width="70%" border align="center">
  Caption with **markdown** and [links](url)
</ContentFigure>

<ContentFigure src="../img/example.webp" alt="Description" captionPosition="right">
  Caption beside the image.
</ContentFigure>

<ContentFigure src="https://www.youtube.com/watch?v=VIDEO_ID" width="80%" />
<ContentFigure src="VIDEO_ID">Video caption</ContentFigure>

<ContentFigure src="../img/animation.webm" gif width="60%" />
<ContentFigure src="../img/icon.webp" alt="Icon description" inline />
```

Props:
- `src`: Image path, `ImageMetadata`, YouTube URL, bare YouTube video ID, or animated media path
- `alt`: Alt text for images
- `width`: CSS width of the figure, default `70%`
- `border`: Boolean for default border, or a CSS border string
- `align`: `left`, `center`, or `right`, default `center`
- `captionPosition`: `center`, `left`, or `right`, default `center`; `left` and `right` place caption text beside the media
- `gif`: Renders animated media as autoplaying looped media
- `inline`: Renders an inline image without the figure wrapper

### ContentRow

Use `ContentRow` to place multiple figures side by side.

```mdx
import ContentRow from '@components/content/ContentRow.astro';
import ContentFigure from '@components/content/ContentFigure.astro';

<ContentRow mediaHeight="18rem">
  <ContentFigure src="../img/left.webp" alt="Left" />
  <ContentFigure src="../img/right.webp" alt="Right" />
</ContentRow>
```

Props:
- `gap`: Space between figures, default `0.5rem`
- `mediaHeight`: Shared media height so captions line up

### Slides

Use `Slides` for step-by-step image or video sequences.

```mdx
import Slides from '@components/content/Slides.astro';

<Slides scale={0.8}>
  ![](../img/step1.webp)
  Caption for step 1

  ![](../img/step2.webp)
  Caption for step 2

  ![](https://www.youtube.com/embed/VIDEO_ID)
  Caption for a YouTube slide
</Slides>
```

Props:
- `scale`: Width of the slideshow as a number from `0.1` to `1`, default `0.8`

Supported media includes `.webp`, `.png`, `.jpg`, YouTube URLs/embeds, `.webm`, and `.mp4`.

### Aside

Use `Aside` for callouts.

```mdx
import Aside from '@components/content/Aside.astro';

<Aside type="tip">This is a tip.</Aside>
<Aside type="note" title="Custom Title">Content here.</Aside>
<Aside type="caution" collapse>Collapsible content.</Aside>
```

Types: `note`, `tip`, `caution`, `danger`, `example`, `video`.

### LinkButton

Use `LinkButton` for prominent links.

```mdx
import LinkButton from '@components/content/LinkButton.astro';

<LinkButton href="https://example.com">External Link</LinkButton>
<LinkButton href="/path/" blank={false}>Internal Link</LinkButton>
<LinkButton href="/path/" center blank={false}>Centered Internal Link</LinkButton>
```

Props:
- `href`: Link URL
- `blank`: Opens in a new tab when true, default `true`
- `center`: Centers the button

### CustomCard

Use `CustomCard` with Starlight's `CardGrid`.

```mdx
import { CardGrid } from '@astrojs/starlight/components';
import CustomCard from '@components/homepage/CustomCard.astro';

<CardGrid>
  <CustomCard title="Card Title" subTitle="Subtitle" href="https://example.com">
    Card body content.
  </CustomCard>
</CardGrid>
```

Props:
- `title`: Card title
- `subTitle`: Optional subtitle
- `href`: Makes the title a link and enables the copy-link button

## Centered Content

Use the `:::center` directive to center content:

```md
:::center
**Centered text or formula**
:::
```

## Local Development

### Prerequisites

- Node.js 22 is used in CI. Node.js 18 or higher should work locally.
- Git
- A code editor such as VS Code

### Setup

```bash
git clone https://github.com/frcdesign/FRCDesign.org.git
cd FRCDesign.org
npm install
npm run dev
```

Visit [http://localhost:4321](http://localhost:4321).

## Commands

| Command | Action |
| :-- | :-- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the dev server at `localhost:4321` |
| `npm run build` | Build the production site to `./dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run check:links:local` | Build the site and check rendered local links/assets plus Onshape workspace-link rules |

## Link Checking

`npm run check:links:local` builds the site, serves `dist/` locally, crawls rendered same-origin links, and fails on broken local `href`, `src`, `srcset`, and `poster` URLs.

The checker also inspects `cad.onshape.com/documents/...` links. Onshape document links must use workspace URLs containing `/w/`; version URLs containing `/v/` and placeholder document links fail the check.

External links other than Onshape document shape checks are not fetched, which keeps PR checks stable.

## CI

GitHub Actions runs `.github/workflows/checks.yml` on pull requests and pushes to `main`.

The workflow:
- Installs dependencies with `npm ci`
- Runs `npm run check:links:local`

## Deployment

The site is configured for Cloudflare via `@astrojs/cloudflare` and `wrangler.jsonc`.

## Contributing

See the [Contribution Guide](https://frcdesign.org/contribution/methods-of-contributing/) on the website.

## Links

- [FRCDesign.org](https://frcdesign.org)
- [GitHub Repository](https://github.com/frcdesign/FRCDesign.org)
- [Discord Server](https://discord.gg/frcdesign)
