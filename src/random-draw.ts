/**
 * Draw a random item from a list.  Returning both the item and the list without the drawn item.
 * @param list - Array of items to pick from
 * @param random - Random number generator
 * @defaultValue random  Math.random
 * @returns Randomly selected item & the list without the drawn item
 * @group Random
 * @category Pick
 */
export function randomDraw<T = unknown>(
  list: readonly T[],
  random: () => number = Math.random,
): { draw: T; list: T[] } | undefined {
  if (list.length === 0) {
    return undefined;
  }

  const index = Math.floor(random() * list.length);
  return {
    draw: list[index],
    list: list.toSpliced(index, 1), // Remove the drawn item from the list
  };
}
