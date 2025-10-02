import { type RandomProperties } from './random.ts';
import { randomInteger } from './random-integer.ts';

/**
 * Returns a random valid index from an array.
 *
 * Generates a random integer between 0 and the array length minus 1, suitable for indexing into the array.
 * Returns `undefined` for empty arrays.
 * @param list - Array to get a random index for
 * @param random - Random number generator function (defaults to Math.random)
 * @returns Random valid index for the array, or `undefined` if the array is empty
 * @example
 * ```typescript
 * const items = ['a', 'b', 'c', 'd', 'e'];
 * randomIndex(items); // 0, 1, 2, 3, or 4
 *
 * randomIndex([]); // undefined (empty array)
 *
 * // With custom random function (deterministic example)
 * randomIndex(items, () => 0.0); // 0 (first index)
 * randomIndex(items, () => 0.99); // 4 (last index)
 * ```
 * @group Random
 * @category Index
 */
export function randomIndex(
  list: readonly unknown[],
  { random = Math.random }: RandomProperties = {},
): number | undefined {
  return list.length === 0 ? undefined : randomInteger(0, list.length - 1, { random });
}
