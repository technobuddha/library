/**
 * Converts a number to a 32-bit signed integer.
 *
 * This function effectively truncates the decimal part of the number
 * and ensures the result fits within the 32-bit signed integer range.
 * @param x - The number to convert.
 * @returns The 32-bit signed integer representation of the input.
 * @group Binary
 * @category Arithmetic
 */
export function int32(x: number): number {
  // eslint-disable-next-line unicorn/prefer-math-trunc, no-bitwise
  return x | 0;
}
