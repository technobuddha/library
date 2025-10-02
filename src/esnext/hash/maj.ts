/**
 * Computes the majority function of three numbers.
 *
 * For each bit position, returns the value that is present in at least two of the three inputs.
 * This is commonly used in cryptographic hash functions such as SHA.
 *
 * @param x - The first input number.
 * @param y - The second input number.
 * @param z - The third input number.
 * @returns The majority value for each bit position among the three inputs.
 * @group Binary
 * @category Arithmetic
 */
export function maj(x: number, y: number, z: number): number {
  return ((x & y) | (z & (x | y))) >>> 0;
}
