import { type NumberLike } from '../number/number-like.ts';
import { toNumber } from '../number/to-number.ts';

/**
 * Clamps a number within the inclusive range specified by `min` and `max`.
 * @param value - The number to clamp.
 * @param min - The lower bound of the range.
 * @param max - The upper bound of the range.
 * @returns The clamped value, which will be no less than `min` and no greater than `max`.
 * @example
 * ```typescript
 * clamp(5, 1, 10); // 5
 * clamp(-2, 0, 7); // 0
 * clamp(15, 0, 10); // 10
 * clamp(3, 3, 3); // 3
 * ```
 * @group Math
 * @category Operations
 */
export function clamp(value: NumberLike, min: NumberLike, max: NumberLike): number {
  return Math.min(Math.max(toNumber(value), toNumber(min)), toNumber(max));
}
