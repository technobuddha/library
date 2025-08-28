/**
 * Returns a new array with the elements of the input array shuffled in random order.
 *
 * Uses the Fisher-Yates (Knuth) shuffle algorithm to ensure an unbiased shuffle.
 * @typeParam T - The type of elements in the array.
 * @param deck - The array of items to shuffle. The original array is not modified.
 * @param random - Optional. A function that returns a random number in the range [0, 1). Defaults to `Math.random`.
 * @returns A new array containing the shuffled elements.
 * @group Random
 * @category Shuffle
 */
export function randomShuffle<T>(deck: readonly T[], random: () => number = Math.random): T[] {
  const items = [...deck];
  let index = items.length;

  while (index > 1) {
    const rnd = Math.floor(random() * index);
    const tmp = items[--index];
    items[index] = items[rnd];
    items[rnd] = tmp;
  }

  return items;
}
