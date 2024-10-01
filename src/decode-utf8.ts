/* eslint-disable no-bitwise */
import { empty } from './constants.js';

/**
 * Decode a UTF8 encoded string into unicode
 *
 * @param input the utf encoded string
 * @returns the decoded strings (which is encoded as UTF-16 by javascript)
 */
export function decodeUTF8(input: string): string {
  let result = empty;

  for (let i = 0; i < input.length; ++i) {
    let c0: number = input.codePointAt(i)!;
    let c1: number;
    let c2: number;
    let c3: number;

    if (c0 > 0x0000007f) {
      if (c0 > 0x000000bf && c0 < 0x000000e0) {
        c1 = input.codePointAt(++i)!;
        if (i >= input.length) throw new Error('Incomplete 2-byte sequence');
        if ((c1 & 0xc0) !== 0x80) throw new Error('Incorrect 2 byte sequence');

        c0 = ((c0 & 0x0000001f) << 6) | (c1 & 0x0000003f);
      } else if (c0 >= 0x000000e0 && c0 < 0x000000f0) {
        c1 = input.codePointAt(++i)!;
        c2 = input.codePointAt(++i)!;
        if (i >= input.length) throw new Error('Incomplete 3-byte sequence');
        if ((c1 & 0xc0) !== 0x80 || (c2 & 0xc0) !== 0x80)
          throw new Error('Incorrect 3 byte sequence');

        c0 = ((c0 & 0x0000000f) << 12) | ((c1 & 0x0000003f) << 6) | (c2 & 0x0000003f);
      } else if (c0 >= 0x000000f0 && c0 < 0x000000f8) {
        c1 = input.codePointAt(++i)!;
        c2 = input.codePointAt(++i)!;
        c3 = input.codePointAt(++i)!;
        if (i >= input.length) throw new Error('incomplete 4 byte sequence');
        if ((c1 & 0xc0) !== 0x80 || (c2 & 0xc0) !== 0x80 || (c3 & 0xc0) !== 0x80)
          throw new Error('Incorrect 3 byte sequence');

        c0 =
          ((c0 & 0x0000000f) << 18) |
          ((c1 & 0x0000003f) << 12) |
          ((c2 & 0x0000003f) << 6) |
          (c3 & 0x0000003f);
      } else {
        throw new Error(`unknown multibyte start 0x${c0.toString(16)} @${i}`);
      }
    }

    if (c0 <= 0x0000ffff) {
      result += String.fromCodePoint(c0);
    } else if (c0 <= 0x0010ffff) {
      c0 -= 0x00010000;
      result +=
        String.fromCodePoint((c0 >> 10) | 0x0000d800) +
        String.fromCodePoint((c0 & 0x000003ff) | 0x0000dc00);
    } else {
      throw new Error(`code point 0x${c0.toString(16)} exceeds UTF-16 reach`);
    }
  }

  return result;
}

export default decodeUTF8;
