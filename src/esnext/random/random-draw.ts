import { type RandomProperties } from './random.ts';
import { randomInteger } from './random-integer.ts';

/**
 * Draw a random item from a list.  Returning both the item and the list without the drawn item.
 * @param list - Array of items to pick from
 * @param random - Random number generator
 * @returns Randomly selected item & the list without the drawn item
 * @example
 * ```typescript
 * const items = ['a', 'b', 'c'];
 * randomDraw(items, () => 0.5); // deterministic for example
 * // { draw: 'b', list: ['a', 'c'] }
 * ```
 * @group Random
 * @category Draw
 */
export function randomDraw<T = unknown>(
  list: readonly T[],
  { random = Math.random }: RandomProperties = {},
):
  | {
      /** The item that was randomly drawn from the list */
      draw: T;
      /** The list with the drawn item removed */
      list: T[];
    }
  | undefined {
  if (list.length === 0) {
    return undefined;
  }

  const index = randomInteger(0, list.length - 1, { random });
  return {
    draw: list[index],
    list: list.toSpliced(index, 1), // Remove the drawn item from the list
  };
}
