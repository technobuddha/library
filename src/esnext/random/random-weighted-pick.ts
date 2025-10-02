import { type RandomProperties } from './random.ts';
import { randomInteger } from './random-integer.ts';
import { type Weighted } from './weighted.ts';

/**
 * Selects a random item from a list, where each item has an associated weight that determines its likelihood of being picked.
 *
 * If the list is empty, it returns `undefined`.
 * @typeParam T - The type of items in the list, extending the `Weighted` interface (must have a `weight` property).
 * @param list - The array of weighted items to pick from.
 * @param random - A function that returns a random number between 0 (inclusive) and 1 (exclusive). Defaults to `Math.random`.
 * @returns The randomly selected item based on weights, or `undefined` if the list is empty.
 * @group Random
 * @category Pick
 * @example
 * ```typescript
 * const items = [
 *   { value: 'a', weight: 1 },
 *   { value: 'b', weight: 3 },
 *   { value: 'c', weight: 6 },
 * ];
 * randomWeightedPick(items, () => 0.0); // { value: 'a', weight: 1 }
 * randomWeightedPick(items, () => 0.2); // { value: 'b', weight: 3 }
 * randomWeightedPick(items, () => 0.8); // { value: 'c', weight: 6 }
 * randomWeightedPick([], () => 0.5); // undefined
 * ```
 */
export function randomWeightedPick<T extends Weighted>(
  list: readonly T[],
  { random = Math.random }: RandomProperties = {},
): T | undefined {
  if (list.length === 0) {
    return undefined;
  }

  const totalWeight = list.reduce((sum, item) => sum + (item.weight ?? 0), 0);
  const index = randomInteger(0, totalWeight - 1, { random });

  let cumulativeWeight = 0;
  for (const item of list) {
    cumulativeWeight += item.weight ?? 0;
    if (index < cumulativeWeight) {
      return item;
    }
  }

  return undefined;
}
