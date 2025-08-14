/**
 * Represents an object with an associated weight value.
 *
 * This type is typically used in scenarios where items are selected
 * based on their relative weights, such as in weighted random selection.
 *
 * @group Random
 * @category Pick
 */
export type Weighted = {
  /**
   * The numeric weight assigned to the object.
   */
  weight: number;
};

/**
 * Selects a random item from a list, where each item has an associated weight that determines its likelihood of being picked.
 *
 * If the list is empty, it returns `undefined`.
 *
 * @typeParam T - The type of items in the list, extending the `Weighted` interface (must have a `weight` property).
 * @param list - The array of weighted items to pick from.
 * @param random - (Optional) A function that returns a random number between 0 (inclusive) and 1 (exclusive). Defaults to `Math.random`.
 * @returns The randomly selected item based on weights, or `undefined` if the list is empty.
 *
 * @group Random
 * @category Pick
 */
export function randomWeightedPick<T extends Weighted>(
  list: readonly T[],
  random: () => number = Math.random,
): T | undefined {
  if (list.length === 0) {
    return undefined;
  }

  const totalWeight = list.reduce((sum, item) => sum + (item.weight ?? 0), 0);
  const index = random() * totalWeight;

  let cumulativeWeight = 0;
  for (const item of list) {
    cumulativeWeight += item.weight ?? 0;
    if (index < cumulativeWeight) {
      return item;
    }
  }

  return undefined;
}
