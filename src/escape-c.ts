import { hex, oct, u4, u8, x2 } from './escape.ts';
import { empty } from './unicode.ts';

// cspell:ignore unnnn Unnnnnnnn
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
 * | Control Characters | 0x00-0x1f, 0x7f-0x9f | \\xnn or \\unnnn[^3]     |
 * | BMP                | 0x0100-0xffff    | \\unnnn                  |
 * | Astral             | 0x10000-0x10ffff   | \\Unnnnnnnn              |
 *
 * [^1]: The sequence \\0 must not be followed by a octal digit (0-7) to avoid being interpreted
 * as a different character, \\000 will be used to avoid ambiguity.
 * [^2]: The non-standard sequence \\e represents the escape character in GCC, clang and tcc.
 * It was not added to the C standard because it has no meaningful equivalent in some character sets
 * (such as EBCDIC).
 * [^3]: The sequence \\xnn must not be followed by a hexadecimal digit (0-9, a-f, A-F) to avoid
 * being interpreted as a different character, \\unnnn will be used to avoid ambiguity.
 * @param input - The string to escape
 * @returns the escaped string
 * @example
 * ```typescript
 * escapeC('Hello\nWorld'); // "Hello\\nWorld"
 * escapeC('"\\');          // "\\\"\\\\"
 * escapeC('\x07');         // "\\a"
 * escapeC('\u20ac');       // "\\u20ac"
 * ```
 * @group Encoding
 * @category Escaping
 */
export function escapeC(input: string): string {
  const output: string[] = [];
  for (let i = 0; i < input.length; ++i) {
    const u0 = input.codePointAt(i)!;
    const u1 = input.codePointAt(i + 1);

    if (u0 < 0x00000020) {
      switch (u0) {
        case 0x00000000: {
          output.push(oct(u1) ? '\\000' : '\\0');
          break;
        }
        case 0x00000007: {
          output.push('\\a');
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
          output.push(hex(u1) ? u4(u0) : x2(u0));
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
        case 0x0000003f: {
          output.push('\\?');
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
      output.push(hex(u1) ? u4(u0) : x2(u0));
    } else if (u0 < 0x00000100) {
      // eslint-disable-next-line unicorn/prefer-code-point
      output.push(String.fromCharCode(u0));
    } else if (u0 < 0x00010000) {
      output.push(u4(u0));
    } else {
      ++i;
      output.push(u8(u0));
    }
  }

  return output.join(empty);
}
