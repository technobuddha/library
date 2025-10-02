import { type NumberLike } from '../number/number-like.ts';
import { toNumber } from '../number/to-number.ts';

import { type RandomProperties } from './random.ts';

/**
 * Returns `true` with the specified probability.
 *
 * Generates a random boolean value based on the given probability threshold.
 * The function returns `true` if the random value is less than the probability.
 * @param probability - Probability of returning `true` (0.0 to 1.0, where 0 = never, 1 = always)
 * @param random - Random number generator function (defaults to Math.random)
 * @returns `true` with the specified probability, `false` otherwise
 * @example
 * ```typescript
 * randomChance(0.5); // 50% chance of true
 * randomChance(0.75); // 75% chance of true
 * randomChance(0.0); // always false
 * randomChance(1.0); // always true
 *
 * // With custom random function (deterministic example)
 * randomChance(0.6, () => 0.5); // true (0.5 < 0.6)
 * randomChance(0.4, () => 0.5); // false (0.5 >= 0.4)
 * ```
 * @group Random
 * @category Probability
 */
export function randomChance(
  probability: NumberLike,
  { random = Math.random }: RandomProperties = {},
): boolean {
  return random() < toNumber(probability);
}
