import { empty } from './unicode.ts';

/**
 * Decodes a UTF-32 array of code points into a UTF-16 JavaScript string.
 *
 * Each 32-bit integer in the input array is converted back into one or two UTF-16 code units.
 * @param array - The input `Uint32Array` containing UTF-32 encoded code points.
 * @returns A string decoded from the UTF-32 code points.
 * @example
 * ```typescript
 * const arr = new Uint32Array([0x41, 0x1F4A1]);
 * const str = decodeUTF32Array(arr); // "A💡"
 * ```
 * @group Unicode
 * @category Encoding
 */
export function decodeUTF32(array: Uint32Array): string {
  return Array.from(array, (code) => String.fromCodePoint(code)).join(empty);
}
