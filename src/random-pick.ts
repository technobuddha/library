/**
 * Pick a random items from a list.
 * @param list - Array of items to pick from
 * @param random - Random number generator
 * @returns Randomly selected item
 * @group Random
 * @category Pick
 * @example
 * ```typescript
 * const items = ['a', 'b', 'c'];
 * randomPick(items, () => 0.5); // 'b' (deterministic for example)
 * randomPick([], () => 0.5); // undefined
 * ```
 */
export function randomPick<T = unknown>(
  list: readonly T[],
  random: () => number = Math.random,
): T | undefined {
  return list.length === 0 ? undefined : list[Math.floor(random() * list.length)];
}
