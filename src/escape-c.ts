import { empty } from './constants.ts';
import { hex, oct, u4, u8, x2 } from './escape.ts';

/**
 * Escape a string for use in C/C++
 *
 * @param input - The string to escape
 * @returns the escaped string
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
