import { combinations } from './combinations.ts';
import { type List } from './list.ts';
import { toArray } from './to-array.ts';

/**
 * Generates the power set of a given array.
 * @param list - The input array to generate the power set from.
 * @returns An iterable that yields all subsets of the input array.
 *
 * @example
 * ```ts
 * const items = ['a', 'b', 'c'];
 * for (const subset of powerSet(items)) {
 *   console.log(subset); // Logs [], ['a'], ['b'], ['c'], ['a', 'b'], ['a', 'c'], ['b', 'c'], ['a', 'b', 'c']
 * }
 * ```
 *
 * @group Array
 * @category Combinatorics
 */
export function* powerSet<T>(list: List<T>): Iterable<T[]> {
  const array = toArray(list);
  const n = array.length;

  yield [];

  for (let i = 1; i <= n; ++i) {
    yield* combinations(array, i);
  }
}
