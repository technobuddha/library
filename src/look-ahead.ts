/**
 * Options for look-ahead operations.
 *
 * @typeParam T - The type of the items in the sequence.
 */
export type LookAheadOptions<T> =
  | {
      /** specifies the last item in the sequence.  */
      last: T;
    }
  | {
      /**determines whether the look-ahead should wrap around to the beginning when reaching the end. */
      wrapAround: boolean;
    };

/**
 * Generates pairs of consecutive elements from the input array, with optional handling for the last element.
 *
 * @typeParam T - The type of elements in the input array.
 * @param array - The array to iterate over.
 * @param options - Optional configuration for handling the last element.
 * @returns A generator yielding tuples of consecutive elements, and optionally a tuple for the last element as specified by options.
 *
 * @example
 * ```typescript
 * // Basic usage
 * const arr = [1, 2, 3];
 * for (const [current, next] of lookAhead(arr)) {
 *   console.log(current, next);
 * }
 * // Output: [1, 2], [2, 3]
 *
 * // With wrapAround
 * for (const [current, next] of lookAhead(arr, { wrapAround: true })) {
 *   console.log(current, next);
 * }
 * // Output: [1, 2], [2, 3], [3, 1]
 *
 * // With last
 * for (const [current, next] of lookAhead(arr, { last: 0 })) {
 *   console.log(current, next);
 * }
 * // Output: [1, 2], [2, 3], [3, 0]
 * ```
 */
export function* lookAhead<T>(array: T[], options?: LookAheadOptions<T>): Generator<[T, T]> {
  if (array.length > 0) {
    for (let i = 0; i < array.length - 1; ++i) {
      yield array.slice(i, i + 2) as [T, T];
    }

    if (options) {
      if ('last' in options) {
        yield [array.at(-1)!, options.last];
      } else if (options.wrapAround) {
        yield [array.at(-1)!, array.at(0)!];
      }
    }
  }
}
