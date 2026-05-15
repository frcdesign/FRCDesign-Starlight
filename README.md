# FRCDesign.org

A community-driven learning course and resource hub for FRC Design and CAD, using Onshape. Built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).

## Project Structure

```
.
├── public/                        # Static assets (favicon, videos)
├── src/
│   ├── assets/
│   │   ├── content/               # Optimized images referenced by absolute path
│   │   ├── footer/                # Footer assets
│   │   ├── header/                # Header assets
│   │   ├── home/                  # Homepage assets
│   │   └── universal/             # Shared assets (logo, icons)
│   ├── components/
│   │   ├── content/               # Components used inside MDX pages
│   │   │   ├── Aside.astro        # Callout boxes (note, tip, caution, danger, example, video)
│   │   │   ├── ContentFigure.astro# Images, GIFs, YouTube videos, inline icons
│   │   │   ├── ContentRow.astro   # Side-by-side ContentFigure layout
│   │   │   ├── LinkButton.astro   # Styled link buttons
│   │   │   ├── LinkCard.astro     # Linked card component
│   │   │   └── Slides.astro       # Image/video slideshow with lightbox
│   │   ├── general/               # Site-wide utility components
│   │   │   └── Glossary.astro     # Glossary term tooltip definitions
│   │   └── homepage/              # Components used on the homepage
│   │       ├── Countdown.astro    # Countdown timer
│   │       ├── CustomCard.astro   # Feature card (used with CardGrid)
│   │       └── HomeCard.astro     # Homepage section card
│   ├── config/                    # Sidebar configuration
│   ├── content/
│   │   └── docs/                  # MDX documentation pages
│   ├── data/                      # Static data files (glossary terms, etc.)
│   ├── plugins/                   # Remark plugins
│   │   ├── remark-center.ts       # :::center block directive
│   │   └── remark-glossary.ts     # Auto-linking glossary terms
│   ├── starlightOverrides/        # Custom Starlight component overrides
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── Pagination.astro
│   │   ├── Sidebar.astro
│   │   └── TableOfContents.astro
│   └── styles/                    # Global CSS
├── astro.config.mjs               # Astro + Starlight configuration
├── package.json
└── tsconfig.json
```

## Content Components

All content components are imported from `@components/content/` in MDX files.

### ContentFigure

The primary component for all images, GIFs, and videos. Handles optimization automatically — no per-file image imports needed.

```mdx
import ContentFigure from '@components/content/ContentFigure.astro';

<!-- Image (resolved via glob, optimized automatically) -->
<ContentFigure src="../img/example.webp" alt="Description" />

<!-- With caption, width, border, and alignment -->
<ContentFigure src="../img/example.webp" alt="Description" width="70%" border align="center">
  Caption with **markdown** and [links](url)
</ContentFigure>

<!-- YouTube (bare video ID or any YouTube URL) -->
<ContentFigure src="VIDEO_ID">Video caption</ContentFigure>
<ContentFigure src="https://www.youtube.com/watch?v=VIDEO_ID" width="80%" />

<!-- Animated GIF / looping video -->
<ContentFigure src="../img/animation.webp" gif />
<ContentFigure src="../img/animation.webm" gif width="60%" />

<!-- Inline icon (renders as inline <img>, no figure wrapper) -->
<ContentFigure src="../img/icon.webp" alt="Icon description" inline />
```

Props:
- `src`: Image path, YouTube URL, bare YouTube video ID, or animated media path
- `alt`: Alt text for accessibility
- `width`: CSS width of the figure (default: `100%`)
- `border`: Add a border — boolean for default style, or string for custom CSS (e.g. `"2px dashed red"`)
- `align`: `"left"`, `"center"`, or `"right"` (default: `"center"`)
- `gif`: Render as autoplay looping video/image with no controls
- `inline`: Render as an inline `<img>` without the figure wrapper (for icons in text)

### ContentRow

Places multiple `ContentFigure` components side by side.

```mdx
import ContentRow from '@components/content/ContentRow.astro';

<ContentRow>
  <ContentFigure src="../img/left.webp" alt="Left" />
  <ContentFigure src="../img/right.webp" alt="Right" />
</ContentRow>
```

Props:
- `gap`: Space between figures (default: `"0.5rem"`)

### Slides

Slideshow with lightbox support. Each slide is an image (or YouTube embed) immediately followed by a caption.

```mdx
import Slides from '@components/content/Slides.astro';

<Slides>
  ![](../img/step1.webp)
  Caption for step 1

  ![](../img/step2.webp)
  Caption for step 2

  ![](https://www.youtube.com/embed/VIDEO_ID)
  Caption for a YouTube slide
</Slides>
```

Props:
- `scale`: Width of the slideshow as a fraction (default: `0.8` = 80%)

Supported media: images (`.webp`, `.png`, `.jpg`), YouTube URLs/embeds, video files (`.webm`, `.mp4`).

### Aside

Styled callout boxes with optional collapse.

```mdx
import Aside from '@components/content/Aside.astro';

<Aside type="tip">This is a tip!</Aside>
<Aside type="note" title="Custom Title">Content here</Aside>
<Aside type="caution" collapse>Collapsible content</Aside>
```

Types: `note`, `tip`, `caution`, `danger`, `example`, `video`

### LinkButton

Styled button link.

```mdx
import LinkButton from '@components/content/LinkButton.astro';

<LinkButton href="/path">Button Text</LinkButton>
<LinkButton href="https://example.com" center external>Centered External Link</LinkButton>
```

Props:
- `href` (required): Link URL
- `center`: Centers the button
- `external`: Opens in a new tab

### CustomCard

Feature card, intended for use with Starlight's `CardGrid`.

```mdx
import { CardGrid } from '@astrojs/starlight/components';
import CustomCard from '@components/homepage/CustomCard.astro';

<CardGrid>
  <CustomCard title="Card Title" subTitle="Subtitle" href="https://example.com">
    Card body content — markdown, images, components.
    <Aside type="video" title="Demo" collapse>
      <ContentFigure src="VIDEO_ID" />
    </Aside>
  </CustomCard>
</CardGrid>
```

Props:
- `title`: Bold card title (also the link text when `href` is set)
- `subTitle`: Italicized text next to the title
- `href`: Makes the title a hyperlink and shows a copy-link button

## Centered Text

Use `:::center` to center any content:

```markdown
:::center
**Centered text or formula**
:::
```

## Getting Started

### Prerequisites

- **Node.js** 18 or higher — [nodejs.org](https://nodejs.org/)
- **Git** — [git-scm.com](https://git-scm.com/)
- A code editor (e.g. [VS Code](https://code.visualstudio.com/))

### Setup

```bash
git clone https://github.com/frcdesign/FRCDesign.org.git
cd FRCDesign.org
npm install
npm run dev
```

Visit [http://localhost:4321](http://localhost:4321).

## Commands

| Command           | Action                                     |
| :---------------- | :----------------------------------------- |
| `npm install`     | Install dependencies                       |
| `npm run dev`     | Start dev server at `localhost:4321`       |
| `npm run build`   | Build production site to `./dist/`         |
| `npm run check:links:local` | Build and check rendered local links/assets |
| `npm run preview` | Preview production build locally           |

## Deployment

Deployed on Cloudflare Pages via the `@astrojs/cloudflare` adapter.

## Contributing

See the [Contribution Guide](https://frcdesign.org/contribution/methodsofcontributing/) on the website.

## Links

- [FRCDesign.org](https://frcdesign.org)
- [GitHub Repository](https://github.com/frcdesign/FRCDesign.org)
- [Discord Server](https://discord.gg/frcdesign)
