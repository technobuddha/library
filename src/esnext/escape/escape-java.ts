import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';
import { isPrintable } from '../unicode/is-printable.ts';
import { empty } from '../unicode/unicode.ts';

import { type EscapeOptions } from './escape.ts';
import { isOct, u4 } from './helpers.ts';
/**
 * Escape a string for use in Java
 *
 * | Character          | Hex                  | Escape Sequence      |
 * | ------------------ | -------------------- | -------------------- |
 * | NUL                | 0x00                 | \\u0000              |
 * | Backspace          | 0x08                 | \\b                  |
 * | Tab                | 0x09                 | \\t                  |
 * | Newline            | 0x0a                 | \\n                  |
 * | Form Feed          | 0x0c                 | \\f                  |
 * | Carriage Return    | 0x0d                 | \\r                  |
 * | Double Quote       | 0x22                 | \\"                  |
 * | Single Quote       | 0x27                 | \\'                  |
 * | Backslash          | 0x5c                 | \\\\                 |
 * | Control Characters | 0x00-0x1f, 0x7f-0x9f | \\u····              |
 * | BMP                | 0x0100-0xffff    | \\u····              |
 * | Astral             | 0x10000-0x10ffff   | \\u····\\u····[^1]   |
 *
 * [^1]: Java does not support unicode escapes beyond 0xFFFF.  Astral characters must be
 * encoded as a two character surrogate pair.
 * @param input - The string to escape
 * @param options - Escape options. The `quote` property controls which quote characters are escaped
 * (set to `'single'` or `'double'` to escape only that type). The `ascii` property, when `true`,
 * forces all non-ASCII characters (above U+007F) to be escaped using Unicode escape sequences
 * (\\u····), even if they are printable. By default, printable Unicode characters are preserved
 * in the output. See {@link EscapeOptions}
 * @returns The string escaped for Java
 * @example
 * ```typescript
 * escapeJava('Hello\nWorld'); // "Hello\\nWorld"
 * escapeJava('"\\');          // "\\"\\\\"
 * escapeJava('\b');           // "\\b"
 * escapeJava('\u20ac');       // "\\u20ac"
 * escapeJava('"', { quote: 'double' }); // "\\""
 * escapeJava("'", { quote: 'single' }); // "\\'"
 *
 * // With ascii option
 * escapeJava('café');         // "café"
 * escapeJava('café', { ascii: true }); // "caf\\u00e9"
 * escapeJava('😀', { ascii: true });   // "\\ud83d\\ude00"
 * ```
 * @group Escape
 * @category Java
 */
export function escapeJava(input: StringLike, { ascii = false }: EscapeOptions = {}): string {
  const text = toString(input);

  const output: string[] = [];
  for (let i = 0; i < text.length; ++i) {
    let u0 = text.codePointAt(i)!;
    let u1 = text.codePointAt(i + 1);

    if (u0 < 0x20) {
      switch (u0) {
        case 0x00: {
          output.push(isOct(u1) ? '\\000' : '\\0');
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
      // eslint-disable-next-line unicorn/no-duplicate-if-branches
    } else if (u0 < 0x010000) {
      if (ascii || !isPrintable(u0)) {
        output.push(u4(u0));
      } else {
        output.push(String.fromCharCode(u0));
      }
    } else if (ascii || !isPrintable(u0)) {
      // Astral characters must be encoded as surrogate pairs in Java
      u0 = text.charCodeAt(i);
      u1 = text.charCodeAt(++i);
      output.push(u4(u0), u4(u1));
    } else {
      output.push(String.fromCodePoint(u0));
      ++i;
    }
  }

  return output.join(empty);
}
