import { floor } from '../math/floor.ts';
import { type NumberLike } from '../number/number-like.ts';
import { toNumber } from '../number/to-number.ts';

import { type RandomProperties } from './random.ts';

/**
 * Generates a random integer between the specified minimum and maximum values, inclusive.
 *
 * @param min - The minimum integer value (inclusive).
 * @param max - The maximum integer value (inclusive).
 * @param random - A function that returns a random number in the range [0, 1). Defaults to `Math.random`.
 * @returns A random integer between `min` and `max`.
 * @example
 * ```typescript
 * randomNumber(1, 10); // could be any integer between 1 and 10
 * randomNumber(5, 5);  // always 5
 * ```
 * @group Random
 * @category Number
 */
export function randomInteger(
  min: NumberLike,
  max: NumberLike,
  { random = Math.random }: RandomProperties = {},
): number {
  const n = toNumber(min);
  const x = toNumber(max);

  return floor(random() * (x - n + 1)) + n;
}
