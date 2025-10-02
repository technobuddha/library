import { type RandomProperties } from './random.ts';
import { randomInteger } from './random-integer.ts';

/**
 * Returns a new array with the elements of the input array shuffled in random order.
 *
 * Uses the Fisher-Yates (Knuth) shuffle algorithm to ensure an unbiased shuffle.
 * @typeParam T - The type of elements in the array.
 * @param deck - The array of items to shuffle. The original array is not modified.
 * @param random - A function that returns a random number in the range [0, 1). Defaults to `Math.random`.
 * @returns A new array containing the shuffled elements.
 * @example
 * ```typescript
 * const items = [1, 2, 3];
 * randomShuffle(items, () => 0.5); // deterministic shuffle for example
 * // result could be: [2, 3, 1]
 * randomShuffle([]); // []
 * ```
 * @group Random
 * @category Shuffle
 */
export function randomShuffle<T>(
  deck: readonly T[],
  { random = Math.random }: RandomProperties = {},
): T[] {
  const items = [...deck];

  for (let i = items.length - 1; i > 0; --i) {
    const j = randomInteger(0, i, { random });
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}
