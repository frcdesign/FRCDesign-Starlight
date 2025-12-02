# FRCDesign.org

A community-driven learning course and resource hub for FRC Design and CAD, using Onshape. Built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).

## Project Structure

```
.
├── public/                    # Static assets (favicon)
├── src/
│   ├── assets/
│   │   ├── content/          # Optimized images for documentation
│   │   ├── footer/           # Footer assets
│   │   ├── header/           # Header assets
│   │   ├── home/             # Homepage assets
│   │   └── universal/        # Shared assets
│   ├── components/           # Custom Astro components
│   │   ├── Aside.astro       # Styled callout boxes (note, tip, caution, danger, example)
│   │   ├── Countdown.astro   # Countdown timer component
│   │   ├── Glossary.astro    # Glossary term definitions
│   │   ├── HomeCard.astro    # Homepage card component
│   │   ├── LinkButton.astro  # Styled link buttons
│   │   ├── Slides.astro      # Image/video slideshow with lightbox
│   │   └── YouTube.astro     # YouTube video embeds
│   ├── config/               # Sidebar configuration
│   ├── content/
│   │   └── docs/             # MDX documentation pages
│   ├── data/                 # Static data files
│   ├── plugins/              # Remark/Rehype plugins
│   ├── starlightOverrides/   # Custom Starlight component overrides
│   │   ├── Footer.astro      # Custom footer
│   │   ├── Header.astro      # Custom header with navigation
│   │   ├── Hero.astro        # Custom hero component
│   │   ├── Pagination.astro  # Custom pagination
│   │   └── Sidebar.astro     # Custom sidebar
│   └── styles/               # Global styles
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

Image and video slideshow with lightbox support. Images are automatically optimized when placed in `src/assets/content/`.

**Markdown format (preferred):**

```mdx
import Slides from '@components/Slides.astro';

<Slides>
  ![alt text](/path/to/image1.webp)
  Caption for slide 1

  ![](/path/to/image2.webp)
  Caption for slide 2

  ![](https://www.youtube.com/embed/VIDEO_ID)
  Caption for YouTube video
</Slides>
```

**Legacy format (still supported):**

```mdx
<Slides images={[
  { src: "/path/to/image1.webp", alt: "Description" },
  { src: "/path/to/image2.webp" },
]}>
  Caption for slide 1

  Caption for slide 2
</Slides>
```

Supported media types:
- Images (`.webp`, `.png`, `.jpg`, `.jpeg`) - automatically optimized
- YouTube videos (watch URLs, embed URLs, or short URLs)
- Video files (`.webm`, `.mp4`)

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
<LinkButton href="/path" center>Centered Button</LinkButton>
<LinkButton href="/path" blank={false}>Internal Link (no new tab)</LinkButton>
```

Props:
- `href` (required): Link URL
- `center`: Centers the button (default: `false`)
- `blank`: Opens in new tab (default: `true`)

## Images

Standard markdown images are automatically optimized. Use the extended syntax for centering, sizing, and captions.

### Basic Image

```markdown
![Alt text](/path/to/image.webp)
```

### Extended Image Syntax

Add modifiers after the alt text, separated by `|`:

```markdown
![Alt text |center](/path/to/image.webp)
![Alt text |center|80%](/path/to/image.webp)
![Alt text |center|60%|Caption text here](/path/to/image.webp)
```

**Available modifiers:**

| Modifier | Description | Example |
|----------|-------------|---------|
| `center` | Centers the image | `\|center` |
| `XX%` | Sets max-width | `\|80%`, `\|60%` |
| Caption text | Wraps in figure with figcaption (must be last) | `\|My caption` |

**Examples:**

```markdown
<!-- Centered image -->
![Robot photo |center](/images/robot.webp)

<!-- Centered image at 60% width -->
![Gearbox diagram |center|60%](/images/gearbox.webp)

<!-- Centered image with caption -->
![CAD model |center|80%|Team 1234's 2024 robot intake](/images/intake.webp)

<!-- Just resize without centering -->
![Small icon |50%](/images/icon.webp)
```

### Image Location

Place images in `src/assets/content/` for automatic optimization. The path in markdown should match the folder structure without the `src/assets/content` prefix:

- File location: `src/assets/content/learning-course/stage1/image.webp`
- Markdown path: `![](/learning-course/stage1/image.webp)`

## Features

- **Custom Header**: Green branded header with navigation tabs, search, and theme toggle
- **Theme Switching**: Light/dark mode with persistent preference
- **Image Optimization**: Automatic image optimization for images in `src/assets/content/`
- **Image Lightbox**: Click any image to view full-screen with keyboard navigation and captions
- **Glossary System**: Automatic tooltip definitions for technical terms
- **Responsive Design**: Mobile-friendly with unified hamburger menu navigation

## Getting Started

### Prerequisites

- **Node.js** (version 18 or higher): Download from [nodejs.org](https://nodejs.org/)
- **Git**: Download from [git-scm.com](https://git-scm.com/)
- A code editor (e.g., [VS Code](https://code.visualstudio.com/))

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/frcdesign/FRCDesign.org.git
   cd FRCDesign.org
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**

   Visit [http://localhost:4321](http://localhost:4321) to see the site running locally.

5. **Make changes**

   Edit files in `src/content/docs/` to modify content. The browser will automatically reload when you save changes.

### Verify Installation

To check your Node.js and npm versions:
```bash
node --version   # Should be 18.x or higher
npm --version    # Should be 9.x or higher
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
