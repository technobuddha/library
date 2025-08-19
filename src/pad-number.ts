/**
 * Add leading zeros to a number to ensure a string of a minimum length
 *
 * @param input - The number to pad
 * @param length - The minimum length of the resulting string
 * @returns number as a string with leading zeros as needed
 * @group Math
 * @category Numbers
 */
export function padNumber(input: number, length = 2): string {
  if (Number.isNaN(input) || !Number.isFinite(input)) {
    return input.toString().padStart(length, ' ');
  } else if (input < 0) {
    return `-${Math.abs(input)
      .toString()
      .padStart(length - 1, '0')}`;
  }
  return input.toString().padStart(length, '0');
}
