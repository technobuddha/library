import { empty } from './constants.js';
import { u4 } from './escape.js';

/**
 * Escape a string for use in GraphQL
 *
 * @param input - The string to escape
 * @returns the escaped string
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
          // eslint-disable-next-line unicorn/prefer-code-point
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
