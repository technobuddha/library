import { u4 } from '../escape/helpers.ts';
import { empty } from '../unicode/unicode.ts';
/**
 * Escape a string for use in GraphQL
 *
 * | Character          | Hex                  | Escape Sequence      |
 * | ------------------ | -------------------- | -------------------- |
 * | Backspace          | 0x08                 | \\b                  |
 * | Tab                | 0x09                 | \\t                  |
 * | Newline            | 0x0a                 | \\n                  |
 * | Form Feed          | 0x0c                 | \\f                  |
 * | Carriage Return    | 0x0d                 | \\r                  |
 * | Double Quote       | 0x22                 | \\"                  |
 * | Single Quote       | 0x27                 | \\'                  |
 * | Backslash          | 0x5c                 | \\\\                 |
 * | Control Characters | 0x00-0x1f, 0x7f-0x9f | \\u····              |
 * @param input - The string to escape
 * @returns the escaped string
 * @example
 * ```typescript
 * escapeGraphQL('Hello\nWorld'); // "Hello\\nWorld"
 * escapeGraphQL('"\\');          // "\\\"\\\\"
 * escapeGraphQL('\b');           // "\\b"
 * escapeGraphQL('\u20ac');       // "\\u20ac"
 * ```
 * @group GraphQL
 * @category Escaping
 */
export function escapeGraphQL(input: string): string {
  const output: string[] = [];
  for (let i = 0; i < input.length; ++i) {
    const u = input.codePointAt(i)!;

    if (u < 0x00000020) {
      switch (u) {
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
        case 0x0000000c: {
          output.push('\\f');
          break;
        }
        case 0x0000000d: {
          output.push('\\r');
          break;
        }
        default: {
          output.push(u4(u));
        }
      }
    } else if (u < 0x0000007f) {
      switch (u) {
        case 0x00000022: {
          output.push('\\"');
          break;
        }
        case 0x0000002f: {
          output.push('\\/');
          break;
        }
        case 0x0000005c: {
          output.push('\\\\');
          break;
        }
        default: {
          output.push(String.fromCharCode(u));
        }
      }
    } else if (u < 0x000000a1) {
      output.push(u4(u));
    } else if (u < 0x00010000) {
      output.push(String.fromCodePoint(u));
    } else {
      i++;
      output.push(String.fromCodePoint(u));
    }
  }

  return output.join(empty);
}
