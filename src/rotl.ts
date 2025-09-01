/**
 * Rotates the bits of a 32-bit number to the left by a specified number of bits.
 *
 * @param num - The 32-bit integer to rotate.
 * @param bits - The number of bits to rotate to the left.
 * @returns The result of rotating `num` to the left by `bits` positions as an unsigned 32-bit integer.
 * @group Math
 * @category 32-bit Arithmetic
 */
export function rotl(num: number, bits: number): number {
  // eslint-disable-next-line no-bitwise
  return ((num << bits) | (num >>> (32 - bits))) >>> 0;
}
