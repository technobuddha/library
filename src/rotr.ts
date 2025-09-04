/**
 * Rotates the bits of a 32-bit number to the right by a specified number of bits.
 *
 * @param num - The 32-bit integer to rotate.
 * @param bits - The number of bits to rotate to the right.
 * @returns The result of rotating `num` to the right by `bits` positions as an unsigned 32-bit integer.
 * @group Binary
 * @category Arithmetic
 */
export function rotr(num: number, bits: number): number {
  // eslint-disable-next-line no-bitwise
  return ((num >>> bits) | (num << (32 - bits))) >>> 0;
}
