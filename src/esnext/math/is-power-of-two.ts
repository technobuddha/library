import { type NumberLike } from '../number/number-like.ts';
import { toNumber } from '../number/to-number.ts';

/**
 * Checks if a number is a power of two.
 *
 * Uses bitwise operations to efficiently determine if the given number is a power of two.
 * A number is a power of two if it has exactly one bit set in its binary representation.
 *
 * The algorithm uses the property that for any power of two `x`, the expression `x & (x - 1)`
 * equals zero because subtracting 1 from a power of two flips all the bits after and including
 * the single set bit.
 *
 * @param x - The number to check
 * @returns True if the number is a power of two, false otherwise
 *
 * @example
 * ```typescript
 * isPowerOfTwo(1);   // returns true (2^0)
 * isPowerOfTwo(2);   // returns true (2^1)
 * isPowerOfTwo(4);   // returns true (2^2)
 * isPowerOfTwo(8);   // returns true (2^3)
 * isPowerOfTwo(16);  // returns true (2^4)
 * isPowerOfTwo(3);   // returns false
 * isPowerOfTwo(5);   // returns false
 * isPowerOfTwo(0);   // returns false
 * isPowerOfTwo(-4);  // returns false
 * ```
 *
 * @group Math
 * @category Comparison
 */
export function isPowerOfTwo(x: NumberLike): boolean {
  const value = toNumber(x);

  if (!Number.isSafeInteger(value)) {
    return false;
  }

  if (value === 1) {
    return true;
  }
  if (value < 2) {
    return false;
  }

  return !(value & (value - 1));
}
