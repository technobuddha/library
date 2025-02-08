import { empty } from './constants.js';

/**
 * Decode a UTF8 encoded string into unicode
 *
 * @param input - the utf encoded string
 * @returns the decoded strings (which is encoded as UTF-16 by javascript)
 */
/* eslint-disable no-bitwise */
export function decodeUTF8(input: string): string {
  let result = empty;

  for (let i = 0; i < input.length; ++i) {
    // eslint-disable-next-line unicorn/prefer-code-point
    let c0: number = input.charCodeAt(i);
    let c1: number;
    let c2: number;
    let c3: number;

    if (c0 > 0x007f) {
      if (c0 > 0x00bf && c0 < 0x00e0) {
        // eslint-disable-next-line unicorn/prefer-code-point
        c1 = input.charCodeAt(++i);
        if (i >= input.length) {
          throw new Error('Incomplete 2-byte sequence');
        }
        if ((c1 & 0xc0) !== 0x80) {
          throw new Error('Incorrect 2 byte sequence');
        }

        c0 = ((c0 & 0x001f) << 6) | (c1 & 0x003f);
      } else if (c0 >= 0x00e0 && c0 < 0x00f0) {
        // eslint-disable-next-line unicorn/prefer-code-point
        c1 = input.charCodeAt(++i);
        // eslint-disable-next-line unicorn/prefer-code-point
        c2 = input.charCodeAt(++i);
        if (i >= input.length) {
          throw new Error('Incomplete 3-byte sequence');
        }
        if ((c1 & 0xc0) !== 0x80 || (c2 & 0xc0) !== 0x80) {
          throw new Error('Incorrect 3 byte sequence');
        }

        c0 = ((c0 & 0x000f) << 12) | ((c1 & 0x003f) << 6) | (c2 & 0x003f);
      } else if (c0 >= 0x00f0 && c0 < 0x00f8) {
        // eslint-disable-next-line unicorn/prefer-code-point
        c1 = input.charCodeAt(++i);
        // eslint-disable-next-line unicorn/prefer-code-point
        c2 = input.charCodeAt(++i);
        // eslint-disable-next-line unicorn/prefer-code-point
        c3 = input.charCodeAt(++i);
        if (i >= input.length) {
          throw new Error('incomplete 4 byte sequence');
        }
        if ((c1 & 0xc0) !== 0x80 || (c2 & 0xc0) !== 0x80 || (c3 & 0xc0) !== 0x80) {
          throw new Error('Incorrect 3 byte sequence');
        }

        c0 = ((c0 & 0x000f) << 18) | ((c1 & 0x003f) << 12) | ((c2 & 0x003f) << 6) | (c3 & 0x003f);
      } else {
        throw new Error(`unknown multibyte start 0x${c0.toString(16)} @${i}`);
      }
    }

    if (c0 <= 0xffff) {
      // eslint-disable-next-line unicorn/prefer-code-point
      result += String.fromCharCode(c0);
    } else if (c0 <= 0x0010ffff) {
      c0 -= 0x00010000;
      result +=
        // eslint-disable-next-line unicorn/prefer-code-point
        String.fromCharCode((c0 >> 10) | 0xd800) + String.fromCharCode((c0 & 0x03ff) | 0xdc00);
    } else {
      throw new Error(`code point 0x${c0.toString(16)} exceeds UTF-16 reach`);
    }
  }

  return result;
}
/* eslint-enable no-bitwise */
