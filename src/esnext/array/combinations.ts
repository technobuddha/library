import { create1dArray } from './create1d-array.ts';
import { type List } from './list.ts';
import { toArray } from './to-array.ts';

/**
 * Generates all possible combinations of a given array or iterable. A combination is a selection
 * of elements where order does not matter. For example, \{1, 2\} and \{2, 1\} are considered the
 * same combination.
 *
 * @typeParam T - The type of elements in the input array.
 *
 * @param data - The array or iterable whose combinations are to be generated.
 * @param size - The number of elements in each combination. If not specified, defaults to the
 * length of the array (generating a single combination containing all elements).
 * @returns A generator that yields each combination as an array of length `size`.
 *
 * @throws `TypeError` If `size` is greater than the length of the array.
 *
 * @example
 * Generate all 2-element combinations from an array:
 * ```ts
 * for(const combo of combinations([1, 2, 3], 2)) {
 *   console.log(combo);
 * }
 * // Output:
 * // [1, 2]
 * // [1, 3]
 * // [2, 3]
 * ```
 *
 * @example
 * Generate all 3-element combinations from a larger array:
 * ```ts
 * const result = Array.from(combinations([1, 2, 3, 4], 3));
 * console.log(result);
 * // [[1, 2, 3], [1, 2, 4], [1, 3, 4], [2, 3, 4]]
 * ```
 *
 * @example
 * Generate a single combination containing all elements (default behavior):
 * ```ts
 * const result = Array.from(combinations(['a', 'b', 'c']));
 * console.log(result);
 * // [['a', 'b', 'c']]
 * ```
 *
 * @group Array
 * @category Combinatorics
 */
export function* combinations<T>(data: T | List<T>, size?: number): Generator<T[]> {
  const array = toArray(data);
  const r = size ?? array.length;
  const n = array.length;

  if (r > n) {
    throw new TypeError('The size of the subsequences should not exceed the length of the array.');
  }

  if (r === n) {
    yield array;
    return;
  }

  const indices = create1dArray(n, (x) => x);
  yield array.slice(0, r);

  while (true) {
    if (indices[r - 1]++ < n - 1) {
      yield create1dArray(r, (x) => array[indices[x]]);
      continue;
    }

    let i = r - 2;
    while (i >= 0 && indices[i] >= n - (r - i)) {
      --i;
    }

    if (i < 0) {
      return;
    }

    indices[i]++;

    while (++i < r) {
      indices[i] = indices[i - 1] + 1;
    }

    yield create1dArray(r, (x) => array[indices[x]]);
  }
}
