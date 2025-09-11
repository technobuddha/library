/**
 * SHA "choose" function: (x & y) ^ (~x & z)
 * @param x - 32-bit integer
 * @param y - 32-bit integer
 * @param z - 32-bit integer
 * @returns Unsigned 32-bit integer result
 * @group Binary
 * @category Arithmetic
 */
export function ch(x: number, y: number, z: number): number {
  // eslint-disable-next-line no-bitwise
  return ((x & y) ^ (~x & z)) >>> 0;
}
