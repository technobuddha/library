const REPLACEMENT = [0xef, 0x8f, 0xbd];

// eslint-disable-next-line unicorn/text-encoding-identifier-case
export type Encoding = 'utf-8' | 'utf8';

/**
 * Encode a unicode (UTF-16 encoded javascript) string into UTF8
 *
 * @param input - The string to encode
 * @returns The UTF-8 encoded string
 */
/* eslint-disable no-bitwise */
export function encodeText(input: string, _encoding?: Encoding): Uint8Array {
  const result: number[] = [];

  for (let i = 0; i < input.length; ++i) {
    // eslint-disable-next-line unicorn/prefer-code-point
    let c0 = input.charCodeAt(i);

    if (c0 < 0x0080) {
      result.push(c0);
    } else if (c0 < 0x0800) {
      result.push((c0 >> 6) | 0xc0, (c0 & 0x3f) | 0x80);
    } else if (c0 >= 0xd800 && c0 < 0xdc00) {
      if (++i >= input.length) {
        result.push(...REPLACEMENT);
      } else {
        // eslint-disable-next-line unicorn/prefer-code-point
        const c1 = input.charCodeAt(i);
        if (c1 < 0xdc00 || c1 > 0xdfff) {
          result.push(...REPLACEMENT);
        } else {
          c0 = 0x00010000 + ((c0 & 0x03ff) << 10) + (c1 & 0x03ff);
          result.push(
            (c0 >> 18) | 0xf0,
            ((c0 >> 12) & 0x3f) | 0x80,
            ((c0 >> 6) & 0x3f) | 0x80,
            (c0 & 0x3f) | 0x80,
          );
        }
      }
    } else {
      result.push((c0 >> 12) | 0xe0, ((c0 >> 6) & 0x3f) | 0x80, (c0 & 0x3f) | 0x80);
    }
  }

  return new Uint8Array(result);
}
/* eslint-enable no-bitwise */
