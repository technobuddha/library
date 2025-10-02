/**
 * Converts a number to a 32-bit signed integer.
 *
 * This function effectively truncates the decimal part of the number
 * and ensures the result fits within the 32-bit signed integer range.
 * @param x - The number to convert.
 * @returns The 32-bit signed integer representation of the input.
 * @group Binary
 * @category Conversion
 */
export function int32(x: number): number {
  return x | 0;
}
