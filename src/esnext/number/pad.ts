import { type NumberLike } from './number-like.ts';
import { toNumber } from './to-number.ts';

/**
 * Add leading zeros to a number to ensure a string of a minimum length
 * @param input - The number to pad
 * @param length - The minimum length of the resulting string
 * @returns number as a string with leading zeros as needed
 * @example
 * ```typescript
 * pad(5); // "05"
 * pad(42, 4); // "0042"
 * pad(-7, 3); // "-07"
 * pad(NaN, 4); // " NaN"
 * pad(Infinity, 6); // "Infinity"
 * ```
 * @group Number
 * @category Formatting
 */
export function pad(input: NumberLike, length = 2): string {
  const value = toNumber(input);

  if (Number.isNaN(value) || !Number.isFinite(value)) {
    return value.toString().padStart(length, ' ');
  }
  if (value < 0) {
    return `-${Math.abs(value)
      .toString()
      .padStart(length - 1, '0')}`;
  }
  return value.toString().padStart(length, '0');
}
