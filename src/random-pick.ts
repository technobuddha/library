/**
 * Pick a random items from a list.
 * @param list - Array of items to pick from
 * @param random - Random number generator
 * @defaultValue random  Math.random
 * @returns Randomly selected item
 * @group Random
 * @category Pick
 */
export function randomPick<T = unknown>(
  list: readonly T[],
  random: () => number = Math.random,
): T | undefined {
  return list.length === 0 ? undefined : list[Math.floor(random() * list.length)];
}
