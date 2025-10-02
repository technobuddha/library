import { type NumberLike } from '../number/number-like.ts';
import { toNumber } from '../number/to-number.ts';

/**
 * Performs linear interpolation between values a and b. Returns the value
 * between a and b proportional to x (when x is between 0 and 1. When x is
 * outside this range, the return value is a linear extrapolation).
 * @param a - A number.
 * @param b - A number.
 * @param proportion - The proportion between a and b.
 * @returns The interpolated value between a and b.
 * @example
 * ```typescript
 * lerp(0, 10, 0); // 0
 * lerp(0, 10, 0.5); // 5
 * lerp(0, 10, 1); // 10
 * lerp(10, 20, 0.25); // 12.5
 * lerp(10, 20, -1); // 0
 * lerp(10, 20, 2); // 30
 * ```
 * @group Math
 * @category Operations
 */
export function lerp(a: NumberLike, b: NumberLike, proportion: NumberLike): number {
  const aNum = toNumber(a);
  const bNum = toNumber(b);
  const proportionNum = toNumber(proportion);

  return aNum + proportionNum * (bNum - aNum);
}
