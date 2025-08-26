import { build } from './build.ts';
import { oct, u4, uu, x2 } from './escape.ts';

// cspell:ignore unnnn
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
 * | Control Characters | 0x00-0x1f, 0x7f-0x9f | \\xnn                |
 * | BMP                | 0x0100-0xffff    | \\unnnn              |
 * | Astral             | 0x10000-0x10ffff   | \\u\{nnn...\}        |
 *
 * [^1]: The sequence \\0 must not be followed by a octal digit (0-7) to avoid being interpreted
 * as a different character, \\x00 will be used to avoid ambiguity.
 *
 * @param input - The string to escape
 * @returns Sting escaped for Javascript
 * @group Encoding
 * @category Escaping
 */
export function escapeJS(input: string): string {
  const output: string[] = [];
  for (let i = 0; i < input.length; ++i) {
    const u0 = input.codePointAt(i)!;
    const u1 = input.codePointAt(i + 1);

    if (u0 < 0x00000020) {
      switch (u0) {
        case 0x00000000: {
          output.push(oct(u1) ? '\\x00' : '\\0');
          break;
        }
        case 0x00000008: {
          output.push('\\b');
          break;
        }
        case 0x00000009: {
          output.push('\\t');
          break;
        }
        case 0x0000000a: {
          output.push('\\n');
          break;
        }
        case 0x0000000b: {
          output.push('\\v');
          break;
        }
        case 0x0000000c: {
          output.push('\\f');
          break;
        }
        case 0x0000000d: {
          output.push('\\r');
          break;
        }
        default: {
          output.push(x2(u0));
        }
      }
    } else if (u0 < 0x0000007f) {
      switch (u0) {
        case 0x00000022: {
          output.push('\\"');
          break;
        }
        case 0x00000027: {
          output.push("\\'");
          break;
        }
        case 0x0000005c: {
          output.push('\\\\');
          break;
        }
        default: {
          // eslint-disable-next-line unicorn/prefer-code-point
          output.push(String.fromCharCode(u0));
        }
      }
    } else if (u0 < 0x000000a1) {
      output.push(x2(u0));
    } else if (u0 < 0x00000100) {
      // eslint-disable-next-line unicorn/prefer-code-point
      output.push(String.fromCharCode(u0));
    } else if (u0 < 0x00010000) {
      output.push(u4(u0));
    } else {
      ++i;
      output.push(uu(u0));
    }
  }

  return build(output);
}
