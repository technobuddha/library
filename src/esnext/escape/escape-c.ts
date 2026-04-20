import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';
import { isPrintable } from '../unicode/is-printable.ts';
import { empty } from '../unicode/unicode.ts';

import { type EscapeOptions } from './escape.ts';
import { isHex, isOct, u4, u8, x2 } from './helpers.ts';

/**
 * Escape a string for use in C/C++
 *
 * | Character          | Hex                  | Escape Sequence          |
 * | ------------------ | -------------------- | ------------------------ |
 * | NUL                | 0x00                 | \\0 or \\000[^1]         |
 * | Bell               | 0x07                 | \\a                      |
 * | Backspace          | 0x08                 | \\b                      |
 * | Tab                | 0x09                 | \\t                      |
 * | Newline            | 0x0a                 | \\n                      |
 * | Vertical Tab       | 0x0b                 | \\v                      |
 * | Form Feed          | 0x0c                 | \\f                      |
 * | Carriage Return    | 0x0d                 | \\r                      |
 * | Escape             | 0x1b                 | \\x1b[^2] or \\u001b[^3] |
 * | Double Quote       | 0x22                 | \\"                      |
 * | Single Quote       | 0x27                 | \\'                      |
 * | Question Mark      | 0x3f                 | \\?                      |
 * | Backslash          | 0x5c                 | \\\\                     |
 * | Control Characters | 0x00-0x1f, 0x7f-0x9f | \\x·· or \\u····[^3]     |
 * | BMP                | 0x0100-0xffff    | \\u····                  |
 * | Astral             | 0x10000-0x10ffff   | \\U········              |
 *
 * [^1]: The sequence \\0 must not be followed by a octal digit (0-7) to avoid being interpreted
 * as a different character, \\000 will be used to avoid ambiguity.
 * [^2]: The non-standard sequence \\e represents the escape character in GCC, clang and tcc.
 * It was not added to the C standard because it has no meaningful equivalent in some character sets
 * (such as EBCDIC).
 * [^3]: The sequence \\xnn must not be followed by a hexadecimal digit (0-9, a-f, A-F) to avoid
 * being interpreted as a different character, \\u···· will be used to avoid ambiguity.
 * @param input - The string to escape
 * @param options - Escape options. The `quote` property controls which quote characters are escaped
 * (set to `'single'` or `'double'` to escape only that type). The `ascii` property, when `true`,
 * forces all non-ASCII characters (above U+007F) to be escaped using Unicode escape sequences
 * (\\u···· or \\U········), even if they are printable. By default, printable Unicode characters
 * are preserved in the output. See {@link EscapeOptions}
 * @returns the escaped string
 * @example
 * ```typescript
 * escapeC('Hello\nWorld'); // "Hello\\nWorld"
 * escapeC('"\\');          // "\\\"\\\\"
 * escapeC('\x07');         // "\\a"
 * escapeC('\u20ac');       // "\\u20ac"
 *
 * // With ascii option
 * escapeC('café');         // "café"
 * escapeC('café', { ascii: true }); // "caf\\u00e9"
 * escapeC('😀', { ascii: true });   // "\\U0001f600"
 * ```
 * @group Escape
 * @category C
 */
export function escapeC(input: StringLike, { ascii = false }: EscapeOptions = {}): string {
  const text = toString(input);
  const output: string[] = [];
  for (let i = 0; i < text.length; ++i) {
    const u0 = text.codePointAt(i)!;
    const u1 = text.codePointAt(i + 1);

    if (u0 < 0x20) {
      switch (u0) {
        case 0x00: {
          output.push(isOct(u1) ? '\\000' : '\\0');
          break;
        }
        case 0x07: {
          output.push('\\a');
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
          output.push(isHex(u1) ? u4(u0) : x2(u0));
        }
      }
    } else if (u0 < 0x7f) {
      switch (u0) {
        case 0x0000003f: {
          output.push('\\?');
          break;
        }
        case 0x0000005c: {
          output.push('\\\\');
          break;
        }
        default: {
          output.push(String.fromCharCode(u0));
        }
      }
    } else if (u0 < 0xa1) {
      output.push(isHex(u1) ? u4(u0) : x2(u0));
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
        output.push(u8(u0));
      } else {
        output.push(String.fromCodePoint(u0));
      }
    }
  }

  return output.join(empty);
}
