import { type TextEncoding } from './@types/text-encoding.ts';
import { type TypedArray } from './@types/typed-array.ts';

const REPLACEMENT = 0xfffd;

/* eslint-disable no-bitwise */
/**
 * Decode a UTF8 encoded string into unicode
 *
 * @param input - the utf encoded string
 * @returns the decoded strings (which is encoded as UTF-16 by javascript)
 * @group Unicode
 * @category Encoding
 */
export function decodeText(
  input: ArrayLike<number> | TypedArray | ArrayBuffer,
  _encoding: TextEncoding = 'utf8',
): string {
  const buffer =
    ArrayBuffer.isView(input) ?
      new Uint8Array(input.buffer, input.byteOffset, input.byteLength)
    : new Uint8Array(input);

  const result: number[] = [];
  for (let i = 0; i < buffer.byteLength; ++i) {
    let c0: number = buffer[i];
    let c1: number;
    let c2: number;
    let c3: number;

    if (c0 > 0x7f) {
      if (c0 > 0xbf && c0 < 0xe0) {
        // two byte utf-8 sequence
        c1 = buffer[++i];
        c0 =
          i >= buffer.byteLength || (c1 & 0x00c0) !== 0x80 ?
            REPLACEMENT
          : ((c0 & 0x1f) << 6) | (c1 & 0x3f);
      } else if (c0 >= 0xe0 && c0 < 0xf0) {
        // three byte utf-8 sequence
        c1 = buffer[++i];
        c2 = buffer[++i];
        c0 =
          i >= buffer.byteLength || (c1 & 0xc0) !== 0x80 || (c2 & 0xc0) !== 0x80 ?
            REPLACEMENT
          : ((c0 & 0x0f) << 12) | ((c1 & 0x3f) << 6) | (c2 & 0x3f);
      } else if (c0 >= 0xf0 && c0 < 0xf8) {
        // four byte utf-8 sequence
        c1 = buffer[++i];
        c2 = buffer[++i];
        c3 = buffer[++i];
        c0 =
          (
            i >= buffer.byteLength ||
            (c1 & 0xc0) !== 0x80 ||
            (c2 & 0xc0) !== 0x80 ||
            (c3 & 0xc0) !== 0x80
          ) ?
            REPLACEMENT
          : ((c0 & 0x0f) << 18) | ((c1 & 0x3f) << 12) | ((c2 & 0x3f) << 6) | (c3 & 0x3f);
      } else {
        c0 = REPLACEMENT;
      }
    }

    // re-encode the result as UTF-16
    if (c0 <= 0xffff) {
      result.push(c0);
    } else if (c0 <= 0x0010ffff) {
      c0 -= 0x00010000;
      result.push((c0 >> 10) | 0xd800, (c0 & 0x03ff) | 0xdc00);
    } else {
      result.push(REPLACEMENT);
    }
  }

  // eslint-disable-next-line unicorn/prefer-code-point
  return String.fromCharCode(...result);
}
/* eslint-enable no-bitwise */
