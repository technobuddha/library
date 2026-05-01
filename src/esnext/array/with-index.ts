/**
 * Wraps an iterable, yielding each element paired with its zero-based index.
 * @typeParam T - The type of elements in the iterable.
 * @param iterator - The iterable to enumerate.
 * @returns A generator yielding `[item, index]` tuples for each element.
 * @example
 * ```typescript
 * for (const [item, index] of withIndex(['a', 'b', 'c'])) {
 *   console.log(index, item);
 * }
 * // 0 'a'
 * // 1 'b'
 * // 2 'c'
 * ```
 * @group Array
 * @category Iteration
 */
export function* withIndex<T>(iterator: Iterable<T>): Generator<[T, number]> {
  let index = 0;
  for (const item of iterator) {
    yield [item, index++];
  }
}
