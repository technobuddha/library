import { type List } from '../array/list.ts';
import { toArray } from '../array/to-array.ts';

/**
 * Options for {@link lookAhead} operations.
 * @typeParam T - The type of the items in the sequence.
 * @group Iteration
 * @category Look-Ahead
 */
export type LookAheadOptions<T> =
  | {
      /** Specifies the last item in the sequence. */
      last: T;
    }
  | {
      /** Determines whether the look-ahead should wrap around to the beginning when reaching the end. */
      wrapAround: boolean;
    };

/**
 * Generates pairs of consecutive elements from the input array, with optional handling for the last
 * element.
 * @typeParam T - The type of elements in the input array.
 * @param list - The array to iterate over.
 * @param options - Optional configuration for handling the last element.
 * @returns A generator yielding a tuple containing each element, the next element in the sequence,
 * and the index of the element within the sequence.  Optionally, a tuple is generated for the last
 * element as specified by options.
 * @example
 * ```typescript
 * // Basic usage
 * const arr = [1, 2, 3];
 * for (const [current, next] of lookAhead(arr)) {
 *   console.log(current, next);
 * }
 * // [1, 2], [2, 3]
 *
 * // With wrapAround
 * for (const [current, next] of lookAhead(arr, { wrapAround: true })) {
 *   console.log(current, next);
 * }
 * // [1, 2], [2, 3], [3, 1]
 * ```
 *
 * With last
 * ```typescript
 * for (const [current, next] of lookAhead(arr, { last: 0 })) {
 *   console.log(current, next);
 * }
 * // [1, 2], [2, 3], [3, 0]
 * ```
 * @group Iteration
 * @category Look-Ahead
 */
export function* lookAhead<T>(
  list: T | List<T>,
  options?: LookAheadOptions<T>,
): Generator<[T, T, number]> {
  const array = toArray(list);

  if (array.length > 0) {
    for (let i = 0; i < array.length - 1; ++i) {
      yield [array[i], array[i + 1], i];
    }

    if (options) {
      if ('last' in options) {
        yield [array.at(-1)!, options.last, array.length - 1];
      } else if (options.wrapAround) {
        yield [array.at(-1)!, array.at(0)!, array.length - 1];
      }
    }
  }
}
