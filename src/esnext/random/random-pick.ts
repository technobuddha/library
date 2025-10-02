import { type RandomProperties } from './random.ts';
import { randomIndex } from './random-index.ts';

/**
 * Pick a random items from a list.
 * @param list - Array of items to pick from
 * @param random - Random number generator
 * @returns Randomly selected item
 * @example
 * ```typescript
 * const items = ['a', 'b', 'c'];
 * randomPick(items, () => 0.5); // 'b' (deterministic for example)
 * randomPick([], () => 0.5); // undefined
 * ```
 * @group Random
 * @category Pick
 */
export function randomPick<T = unknown>(
  list: readonly T[],
  { random = Math.random }: RandomProperties = {},
): T | undefined {
  const index = randomIndex(list, { random });
  return index == null ? undefined : list[index];
}
