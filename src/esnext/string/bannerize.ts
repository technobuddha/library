import { splitLines } from '../tokenization/split-lines.ts';

import { type StringLike } from './string-like.ts';
import { toString } from './to-string.ts';

/**
 * Warning marker used in banners to indicate file modifications will be overridden.
 *
 * @internal
 */
export const bannerMarker = '🚨';

/**
 * Builds the standard three-line warning banner used by generators.
 *
 * The middle line includes the warning marker followed by the provided message.
 *
 * @param message - The warning message to place in the center line of the banner.
 * @returns A three-line banner containing the top marker, message line, and bottom marker.
 *
 * @example
 * ```typescript
 * defaultBanner();
 * // ['🚨', '🚨 CHANGES TO THIS FILE WILL BE OVERRIDDEN', '🚨']
 *
 * defaultBanner('AUTO-GENERATED FILE');
 * // ['🚨', '🚨 AUTO-GENERATED FILE', '🚨']
 * ```
 *
 * @group String
 * @category Banner
 */
export function defaultBanner(message = 'CHANGES TO THIS FILE WILL BE OVERRIDDEN'): string[] {
  return [bannerMarker, `${bannerMarker} ${message}`, bannerMarker];
}

/**
 * Available banner comment styles for different file types.
 *
 * - `'#'` - Hash comments (shell scripts, YAML, etc.)
 * - `'<!->'` - HTML/XML comments
 * - `'/**\/'` - Block comments (JavaScript, CSS, etc.)
 * - `'//'` - Line comments (JavaScript, TypeScript, etc.)
 * - `'%'` - Percent comments (LaTeX)
 * - `';'` - Semicolon comments (Assembly, etc.)
 *
 * @group String
 * @category Banner
 */
export type BannerStyle = '#' | '<!->' | '/**/' | '//' | '%' | ';' | 'md';

/**
 * Adds a comment banner to text content using the specified style.
 *
 * Wraps the provided banner text in the appropriate comment syntax
 * for different file types and prepends it to the content.
 *
 * @param text - The content to add the banner to
 * @param style - The comment style to use for the banner
 * @param banner - Custom banner lines (defaults to override warning)
 * @returns The text content with the banner prepended
 *
 * @example
 * ```typescript
 * // Add a warning banner to JavaScript code
 * bannerize('//', 'console.log("Hello");');
 * // Returns:
 * // // 🚨
 * // // 🚨 CHANGES TO THIS FILE WILL BE OVERRIDDEN
 * // // 🚨
 * // console.log("Hello");
 *
 * // Add custom banner to CSS
 * bannerize('/**\/', 'body { margin: 0; }', ['Custom Header', 'Version 1.0']);
 * // Returns:
 * // /**
 * //  * Custom Header
 * //  * Version 1.0
 * //  *\/
 * // body { margin: 0; }
 * ```
 *
 * @group String
 * @category Banner
 */
export function bannerize(
  text: StringLike,
  style: BannerStyle = '//',
  banner = defaultBanner(),
): string {
  const content = toString(text);

  switch (style) {
    case '#': {
      if (content.startsWith('#!')) {
        const [shebang, ...rest] = splitLines(content);
        return `${shebang}\n${banner.map((b) => `# ${b}`).join('\n')}\n${rest.join('\n')}`;
      }

      return `${banner.map((b) => `# ${b}`).join('\n')}\n${content}`;
    }

    case '<!->': {
      return `<!--\n${banner.map((b) => `  ${b}`).join('\n')}\n-->\n${content}`;
    }

    case '/**/': {
      return `/**\n${banner.map((b) => ` * ${b}`).join('\n')} */\n${content}`;
    }

    case '//': {
      return `${banner.map((b) => `// ${b}`).join('\n')}\n${content}`;
    }

    case '%': {
      return `${banner.map((b) => `% ${b}`).join('\n')}\n${content}`;
    }

    case ';': {
      return `${banner.map((b) => `; ${b}`).join('\n')}\n${content}`;
    }

    case 'md': {
      return `<!-- markdown-lint-disable MD041\n${banner.map((b) => `     ${b}`).join('\n')}\n-->\n${content}`;
    }

    default: {
      return content;
    }
  }
}
