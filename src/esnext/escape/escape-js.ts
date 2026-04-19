import { build } from '../string/build.ts';
import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';
import { isPrintable } from '../unicode/is-printable.ts';

import { type EscapeOptions } from './escape.ts';
import { isOct, u4, uu } from './helpers.ts';
/**
 * Escape a string for use in Javascript
 *
 * | Character          | Hex                  | Escape Sequence      |
 * | ------------------ | -------------------- | -------------------- |
 * | NUL                | 0x00                 | \\0 or \\x00[^1]     |
 * | Backspace          | 0x08                 | \\b                  |
 * | Tab                | 0x09                 | \\t                  |
 * | Newline            | 0x0a                 | \\n                  |
 * | Vertical Tab       | 0x0b                 | \\v                  |
 * | Form Feed          | 0x0c                 | \\f                  |
 * | Carriage Return    | 0x0d                 | \\r                  |
 * | Double Quote       | 0x22                 | \\"                  |
 * | Single Quote       | 0x27                 | \\'                  |
 * | Backslash          | 0x5c                 | \\\\                 |
 * | Control Characters | 0x00-0x1f, 0x7f-0x9f | \\x··                |
 * | BMP                | 0x0100-0xffff        | \\u····              |
 * | Astral             | 0x10000-0x10ffff     | \\u\{···…\}          |
 *
 * [^1]: The sequence \\0 must not be followed by a octal digit (0-7) to avoid being interpreted
 * as a different character, \\x00 will be used to avoid ambiguity.
 * @param input - The string to escape
 * @param options - Escape options. The `quote` property controls which quote characters are escaped
 * (set to `'single'` or `'double'` to escape only that type). The `ascii` property, when `true`,
 * forces all non-ASCII characters (above U+007F) to be escaped using Unicode escape sequences
 * (\\x··, \\u····, or \\u\{···…\}), even if they are printable. By default, printable Unicode
 * characters are preserved in the output. See {@link EscapeOptions}
 * @returns Sting escaped for Javascript
 * @example
 * ```typescript
 * escapeJS('Hello\nWorld'); // "Hello\\nWorld"
 * escapeJS('"\\');          // "\\"\\\\"
 * escapeJS('\b');           // "\\b"
 * escapeJS('\u20ac');       // "\\u20ac"
 *
 * // With ascii option
 * escapeJS('café');         // "café"
 * escapeJS('café', { ascii: true }); // "caf\\xe9"
 * escapeJS('😀', { ascii: true });   // "\\u{1f600}"
 * ```
 * @group Escape
 * @category JavaScript
 */
export function escapeJS(input: StringLike, { ascii = false }: EscapeOptions = {}): string {
  const text = toString(input);

  const output: string[] = [];
  for (let i = 0; i < text.length; ++i) {
    const u0 = text.codePointAt(i)!;
    const u1 = text.codePointAt(i + 1);

    if (u0 < 0x20) {
      switch (u0) {
        case 0x00: {
          output.push(isOct(u1) ? '\\u0000' : '\\0');
          break;
        }
        case 0x08: {
          output.push('\\b');
          break;
        }
        case 0x09: {
          output.push('\\t');
          break;
        }
        case 0x0a: {
          output.push('\\n');
          break;
        }
        case 0x0b: {
          output.push('\\v');
          break;
        }
        case 0x0c: {
          output.push('\\f');
          break;
        }
        case 0x0d: {
          output.push('\\r');
          break;
        }
        default: {
          output.push(u4(u0));
        }
      }
    } else if (u0 < 0x7f) {
      switch (u0) {
        case 0x5c: {
          output.push('\\\\');
          break;
        }
        default: {
          output.push(String.fromCharCode(u0));
        }
      }
    } else if (u0 < 0xa1) {
      output.push(u4(u0));
    } else if (u0 < 0x0100) {
      if (ascii || !isPrintable(u0)) {
        output.push(u4(u0));
      } else {
        output.push(String.fromCharCode(u0));
      }
    } else if (u0 < 0x010000) {
      if (ascii || !isPrintable(u0)) {
        output.push(u4(u0));
      } else {
        output.push(String.fromCharCode(u0));
      }
    } else {
      ++i;
      if (ascii || !isPrintable(u0)) {
        output.push(uu(u0));
      } else {
        output.push(String.fromCodePoint(u0));
      }
    }
  }

  return build(output);
}
