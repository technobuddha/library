import { type NumberLike } from '../number/number-like.ts';
import { toNumber } from '../number/to-number.ts';

import { type RandomProperties } from './random.ts';
import { randomDraw } from './random-draw.ts';

/**
 * Deal multiple random items from a list, returning both the dealt items and the remaining list.
 *
 * Repeatedly draws random items from the list until the requested count is reached or the list is exhausted.
 * Returns `undefined` if no items could be dealt (empty list or count is 0).
 * @param list - Array of items to deal from
 * @param count - Number of items to deal
 * @param random - Random number generator function (defaults to Math.random)
 * @returns Object containing the dealt items array and remaining list, or `undefined` if no items were dealt
 * @example
 * ```typescript
 * const deck = ['A', 'B', 'C', 'D', 'E'];
 * randomDeal(deck, 3, () => 0.5); // deterministic for example
 * // { draw: ['C', 'C', 'B'], list: ['A', 'E'] }
 *
 * randomDeal([], 5); // undefined (empty list)
 * randomDeal(deck, 0); // undefined (count is 0)
 * randomDeal(deck, 10); // deals all 5 items (less than requested count)
 * ```
 * @group Random
 * @category Draw
 */
export function randomSample<T = unknown>(
  list: readonly T[],
  count: NumberLike,
  { random = Math.random }: RandomProperties = {},
): {
  /** The items that were randomly drawn from the list */
  draw: T[];
  /** The list with the drawn item removed */
  list: T[];
} {
  const deal: T[] = [];
  let deck = [...list];
  const len = toNumber(count);

  while (deal.length < len && deck.length > 0) {
    const { draw, list } = randomDraw(deck, { random })!;
    deal.push(draw);
    deck = list;
  }

  return { draw: deal, list: deck };
}
