import { create1dArray } from './create1d-array.ts';
import { type List } from './list.ts';
import { toArray } from './to-array.ts';

/**
 * Generates all possible permutations of a given array.
 *
 * @typeParam T - The type of elements in the input array.
 * @param list - The array whose permutations are to be generated.
 * @param length - The length of each permutation. Defaults to the length of the array.
 * @returns An iterable that yields each permutation as an array of length `r`.
 *
 * @throws TypeError\} If `r` is greater than the length of the array.
 *
 * @example
 * ```ts
 * for(const perm of permutations([1, 2, 3], 2)) {
 *   console.log(perm);
 * }
 * // Output:
 * // [1, 2]
 * // [1, 3]
 * // [2, 1]
 * // [2, 3]
 * // [3, 1]
 * // [3, 2]
 * ```
 * @group Array
 * @category Combinatorics
 */
export function* permutations<T>(list: T | List<T>, length?: number): Generator<T[]> {
  const array = toArray(list);
  const len = length ?? array.length;
  const n = array.length;

  if (len > n) {
    throw new TypeError('The size of the subsequences should not exceed the length of the array.');
  }

  const indices = create1dArray(n, (x) => x);
  const cycles = create1dArray(len, (x) => n - x);

  yield create1dArray(len, (x) => array[indices[x]]);

  for (let i = len - 1; i >= 0; --i) {
    cycles[i]--;

    if (cycles[i] === 0) {
      const tmp = indices[i];
      for (let j = i; j < n - 1; j++) {
        indices[j] = indices[j + 1];
      }
      indices[n - 1] = tmp;

      cycles[i] = n - i;
      continue;
    }

    const j = cycles[i];
    const tmp = indices[i];

    indices[i] = indices[n - j];
    indices[n - j] = tmp;

    i = len;
    yield create1dArray(len, (x) => array[indices[x]]);
  }
}
