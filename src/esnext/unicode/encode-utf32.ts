import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';

import { unicodeLength } from './unicode-length.ts';

/**
 * Encodes a UTF-16 JavaScript string into a UTF-32 array of code points.
 *
 * Each Unicode code point in the input string is extracted and stored as a 32-bit integer.
 * @param str - The input string to encode.
 * @returns A `Uint32Array` containing the UTF-32 encoded code points.
 * @example
 * ```typescript
 * const arr = encodeUTF32('A💡');
 * // [0x41, 0x1F4A1]
 * ```
 * @group Unicode
 * @category Encoding
 */
export function encodeUTF32(str: StringLike): Uint32Array {
  const text = toString(str);
  const trueLength = unicodeLength(text);
  const buf = new Uint32Array(trueLength);

  let index = 0;
  for (let i = 0; i < trueLength; ++i, ++index) {
    const code = text.codePointAt(index)!;

    buf[i] = code;

    if (code > 0xffff) {
      index++;
    }
  }

  return buf;
}
