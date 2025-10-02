import { type NumberLike } from '../number/number-like.ts';
import { toNumber } from '../number/to-number.ts';

/**
 * The % operator in JavaScript returns the remainder of a / b, but differs from
 * some other languages in that the result will have the same sign as the
 * dividend. For example, -1 % 8 == -1, whereas in some other languages
 * (such as Python) the result would be 7. This function emulates the more
 * correct modulo behavior, which is useful for certain applications such as
 * calculating an offset index in a circular list.
 * @param a - The dividend.
 * @param b - The divisor.
 * @returns `dividend` modulo `divisor`
 * @returns The result of the modulo operation, always non-negative and less than the divisor (or non-positive and greater than the divisor if the divisor is negative).
 * @example
 * ```typescript
 * modulo(7, 5); // 2
 * modulo(-1, 8); // 7
 * modulo(10, 3); // 1
 * modulo(-10, 3); // 2
 * modulo(10, -3); // -2
 * modulo(-10, -3); // -1
 * ```
 * @group Math
 * @category Operations
 */
export function modulo(a: NumberLike, b: NumberLike): number {
  const dividend = toNumber(a);
  const divisor = toNumber(b);

  const remainder = dividend % divisor;
  return dividend * divisor < 0 && remainder !== 0 ? divisor + remainder : remainder;
}
