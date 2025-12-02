/**
 * Rehype plugin to enhance images with centering, width, captions, and borders
 *
 * Syntax: ![alt |caption |width |align |border](/path/to/image.webp)
 *
 * Props (in order, all optional after alt):
 * - alt: The alt text for the image
 * - caption: Caption text (wraps in figure with figcaption)
 * - width: Max width as percentage (e.g., 60%, 80%)
 * - align: Alignment - center (default), left, right, or none
 * - border: CSS border value (e.g., 2px solid red, 1px dashed #333)
 *
 * Examples:
 * ![Robot photo](/image.webp)                                    - Centered (default)
 * ![Robot photo |The 2024 robot](/image.webp)                    - Centered with caption
 * ![Robot photo |The 2024 robot |60%](/image.webp)               - Centered, 60% width, with caption
 * ![Robot photo |The 2024 robot |60% |left](/image.webp)         - Left aligned, 60% width, with caption
 * ![Robot photo | |80%](/image.webp)                             - Centered, 80% width, no caption
 * ![Robot photo | | |none](/image.webp)                          - No centering, no caption
 * ![Robot photo | |80% | |2px solid red](/image.webp)            - With red border
 * ![Robot photo |Caption |60% |center |1px solid #ccc](/image.webp) - Full example with border
 */

import { visit } from 'unist-util-visit';
import type { Root, Element } from 'hast';

interface ImageModifiers {
  alt: string;
  caption: string | null;
  width: string | null;
  align: 'center' | 'left' | 'right' | 'none';
  border: string | null;
}

function parseAltText(alt: string): ImageModifiers {
  const parts = alt.split('|').map(p => p.trim());

  const result: ImageModifiers = {
    alt: parts[0] || '',
    caption: null,
    width: null,
    align: 'center', // Default to centered
    border: null,
  };

  // Part 1: caption (if exists and not empty)
  if (parts.length > 1 && parts[1].length > 0) {
    result.caption = parts[1];
  }

  // Part 2: width (if exists and matches percentage pattern)
  if (parts.length > 2 && /^\d+%$/.test(parts[2])) {
    result.width = parts[2];
  }

  // Part 3: alignment
  if (parts.length > 3 && parts[3].length > 0) {
    const alignValue = parts[3].toLowerCase();
    if (alignValue === 'left' || alignValue === 'right' || alignValue === 'none' || alignValue === 'center') {
      result.align = alignValue;
    }
  }

  // Part 4: border (CSS border value)
  if (parts.length > 4 && parts[4].length > 0) {
    result.border = parts[4];
  }

  return result;
}

export function rehypeImageFigure() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element, index, parent) => {
      if (!parent || index === undefined) return;
      if (node.tagName !== 'img') return;

      const alt = (node.properties?.alt as string) || '';

      const modifiers = parseAltText(alt);

      // Update alt text to clean version
      node.properties = node.properties || {};
      node.properties.alt = modifiers.alt;

      // Build style string
      const styles: string[] = [];
      if (modifiers.width) {
        styles.push(`max-width: ${modifiers.width}`);
      }
      if (modifiers.border) {
        styles.push(`border: ${modifiers.border}`);
      }

      if (styles.length > 0) {
        node.properties.style = styles.join('; ');
      }

      // Determine wrapper class based on alignment
      const getAlignClass = (align: string, isCaption: boolean): string | undefined => {
        if (align === 'none') return undefined;
        if (isCaption) {
          return align === 'center' ? 'centered-figure' : `${align}-figure`;
        }
        return align === 'center' ? 'centered-image' : `${align}-image`;
      };

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
            class: getAlignClass(modifiers.align, true),
          },
          children: figureChildren,
        };

        parent.children.splice(index, 1, figure);
      } else if (modifiers.align !== 'none' || modifiers.width || modifiers.border) {
        // Wrap for alignment, width, or border (default is centered)
        const wrapper: Element = {
          type: 'element',
          tagName: 'div',
          properties: {
            class: getAlignClass(modifiers.align, false),
          },
          children: [node as Element],
        };

        parent.children.splice(index, 1, wrapper);
      }
    });
  };
}

export default rehypeImageFigure;
