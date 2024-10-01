import build from './build.js';
import { escu4, escUU, escx2, isHex, isOct } from './escape.js';

/**
 * Escape a string for use in Javascript
 *
 * @param input The string to escape
 * @returns Sting escaped for Javascript
 */
export function escapeJS(input: string): string {
  const output: string[] = [];
  for (let i = 0; i < input.length; ++i) {
    const u0 = input.codePointAt(i)!;
    const u1 = input.codePointAt(i + 1);

    if (u0 < 0x00000020) {
      switch (u0) {
        case 0x00000000: {
          output.push(isOct(u1) ? '\\x00' : '\\0');
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
          output.push(isHex(u1) ? escu4(u0) : escx2(u0));
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
          output.push(String.fromCodePoint(u0));
        }
      }
    } else if (u0 < 0x000000a1) {
      output.push(isHex(u1) ? escu4(u0) : escx2(u0));
    } else if (u0 < 0x00000100) {
      output.push(String.fromCodePoint(u0));
    } else if (u0 < 0x00010000) {
      output.push(escu4(u0));
    } else {
      ++i;
      output.push(escUU(u0));
    }
  }

  return build(output);
}

export default escapeJS;
