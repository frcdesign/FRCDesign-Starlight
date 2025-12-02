/**
 * Rehype plugin to enhance images with centering and captions
 *
 * Syntax options:
 * 1. Center an image: ![alt text |center](/path/to/image.webp)
 * 2. Add width: ![alt text |center|60%](/path/to/image.webp)
 * 3. Caption with figure: ![alt text |center|80%|Caption text here](/path/to/image.webp)
 *
 * The pipe-separated modifiers in alt text:
 * - |center - centers the image
 * - |XX% - sets max-width (e.g., |60%, |80%)
 * - |Caption text - wraps in figure with figcaption (must be last)
 */

import { visit } from 'unist-util-visit';
import type { Root, Element } from 'hast';

interface ImageModifiers {
  alt: string;
  center: boolean;
  width: string | null;
  caption: string | null;
}

function parseAltText(alt: string): ImageModifiers {
  const parts = alt.split('|').map(p => p.trim());

  const result: ImageModifiers = {
    alt: parts[0] || '',
    center: false,
    width: null,
    caption: null,
  };

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];

    if (part.toLowerCase() === 'center') {
      result.center = true;
    } else if (/^\d+%$/.test(part)) {
      result.width = part;
    } else if (part.length > 0) {
      // Assume it's a caption (should be last)
      result.caption = part;
    }
  }

  return result;
}

export function rehypeImageFigure() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element, index, parent) => {
      if (!parent || index === undefined) return;
      if (node.tagName !== 'img') return;

      const alt = (node.properties?.alt as string) || '';

      // Skip if no modifiers
      if (!alt.includes('|')) return;

      const modifiers = parseAltText(alt);

      // Update alt text to clean version
      node.properties = node.properties || {};
      node.properties.alt = modifiers.alt;

      // Build style string
      const styles: string[] = [];
      if (modifiers.width) {
        styles.push(`max-width: ${modifiers.width}`);
      }

      // If we have a caption, wrap in figure
      if (modifiers.caption) {
        const figureChildren: Element[] = [node as Element];

        figureChildren.push({
          type: 'element',
          tagName: 'figcaption',
          properties: {},
          children: [{ type: 'text', value: modifiers.caption }],
        });

        const figure: Element = {
          type: 'element',
          tagName: 'figure',
          properties: {
            class: modifiers.center ? 'centered-figure' : undefined,
          },
          children: figureChildren,
        };

        if (styles.length > 0) {
          node.properties.style = styles.join('; ');
        }

        parent.children.splice(index, 1, figure);
      } else if (modifiers.center || modifiers.width) {
        // Just center/resize without figure
        const wrapper: Element = {
          type: 'element',
          tagName: 'div',
          properties: {
            class: modifiers.center ? 'centered-image' : undefined,
          },
          children: [node as Element],
        };

        if (styles.length > 0) {
          node.properties.style = styles.join('; ');
        }

        parent.children.splice(index, 1, wrapper);
      }
    });
  };
}

export default rehypeImageFigure;
