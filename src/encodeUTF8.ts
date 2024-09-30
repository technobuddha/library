import { empty } from './constants';

/**
 * Encode a unicode (UTF-16 encoded javascript) string into UTF8
 *
 * @param input The string to encode
 * @returns The UTF-8 encoded string
 */
export function encodeUTF8(input: string): string {
  let result = empty;

  for (let i = 0; i < input.length; ++i) {
    let c0 = input.charCodeAt(i);

    if (c0 < 0x0080) {
      result += input[i];
    } else if (c0 < 0x0800) {
      result += String.fromCharCode((c0 >> 6) | 0xc0) + String.fromCharCode((c0 & 0x3f) | 0x80);
    } else if (c0 >= 0xd800 && c0 < 0xdc00) {
      if (++i >= input.length) throw new Error(`Incomplete surrogate pair @${i}`);

      const c1 = input.charCodeAt(i);
      if (c1 < 0xdc00 || c1 > 0xdfff) throw new Error(`Invalid surrogate pair @${i}`);

      c0 = 0x10000 + ((c0 & 0x03ff) << 10) + (c1 & 0x03ff);
      result +=
        String.fromCharCode((c0 >> 18) | 0xf0) +
        String.fromCharCode(((c0 >> 12) & 0x3f) | 0x80) +
        String.fromCharCode(((c0 >> 6) & 0x3f) | 0x80) +
        String.fromCharCode((c0 & 0x3f) | 0x80);
    } else {
      result +=
        String.fromCharCode((c0 >> 12) | 0xe0) +
        String.fromCharCode(((c0 >> 6) & 0x3f) | 0x80) +
        String.fromCharCode((c0 & 0x3f) | 0x80);
    }
  }

  return result;
}

export default encodeUTF8;
