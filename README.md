# FRCDesign.org

A community-driven learning course and resource hub for FRC Design and CAD, using Onshape. Built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).

## Project Structure

```
.
├── public/                    # Static assets (favicon, images)
├── src/
│   ├── assets/               # Images and SVGs used in components
│   ├── components/           # Custom Astro components
│   │   ├── Aside.astro       # Styled callout boxes (note, tip, caution, danger, example)
│   │   ├── Glossary.astro    # Glossary term definitions
│   │   ├── LinkButton.astro  # Styled link buttons
│   │   ├── Slides.astro      # Image/video slideshow with lightbox
│   │   └── YouTube.astro     # YouTube video embeds
│   ├── config/               # Sidebar configuration
│   ├── content/
│   │   └── docs/             # MDX documentation pages
│   ├── fonts/                # Custom fonts (Author font family)
│   ├── plugins/              # Remark plugins (glossary)
│   ├── starlightOverrides/   # Custom Starlight component overrides
│   │   ├── Header.astro      # Custom header with navigation
│   │   ├── Footer.astro      # Custom footer
│   │   └── Sidebar.astro     # Custom sidebar
│   └── styles/
│       └── global.css        # Global styles
├── astro.config.mjs          # Astro configuration
├── package.json
└── tsconfig.json
```

## Custom Components

### Aside

Styled callout boxes with optional collapse functionality.

```mdx
import Aside from '@components/Aside.astro';

<Aside type="tip">This is a tip!</Aside>
<Aside type="note" title="Custom Title">Content here</Aside>
<Aside type="caution" collapse>Collapsible content</Aside>
```

Types: `note`, `tip`, `caution`, `danger`, `example`

### Slides

Image and video slideshow with lightbox support.

```mdx
import Slides from '@components/Slides.astro';

<Slides images={[
  { src: "/path/to/image1.webp", alt: "Description" },
  { src: "/path/to/image2.webp" },
  { src: "https://www.youtube.com/watch?v=VIDEO_ID" },
]}>
  Caption for slide 1

  Caption for slide 2

  Caption for slide 3
</Slides>
```

### YouTube

YouTube video embed with optional caption.

```mdx
import YouTube from '@components/YouTube.astro';

<YouTube id="VIDEO_ID" />
<YouTube url="https://www.youtube.com/watch?v=VIDEO_ID">
  Optional caption with **markdown** support
</YouTube>
```

### LinkButton

Styled button link component.

```mdx
import LinkButton from '@components/LinkButton.astro';

<LinkButton href="/path">Button Text</LinkButton>
```

## Features

- **Custom Header**: Green branded header with navigation tabs, search, and theme toggle
- **Theme Switching**: Light/dark mode with persistent preference
- **Image Lightbox**: Click any image to view full-screen
- **Glossary System**: Automatic tooltip definitions for technical terms
- **Responsive Design**: Mobile-friendly with unified hamburger menu navigation

## Prerequisites

- **Node.js** (version 18 or higher): Download from [nodejs.org](https://nodejs.org/)
- **npm** (comes with Node.js)

To verify your installation:
```bash
node --version
npm --version
```

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start local dev server at `localhost:4321`   |
| `npm run build`   | Build production site to `./dist/`           |
| `npm run preview` | Preview build locally before deploying       |

## Deployment

This site is configured for deployment on Cloudflare Pages using the `@astrojs/cloudflare` adapter.

## Contributing

See the [Contribution Guide](/contribution/methodsofcontributing/) on the website for details on how to contribute to FRCDesign.org.

## Links

- [FRCDesign.org](https://frcdesign.org)
- [GitHub Repository](https://github.com/frcdesign/FRCDesign.org)
- [Discord Server](https://discord.gg/frcdesign)
