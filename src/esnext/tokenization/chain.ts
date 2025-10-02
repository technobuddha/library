/**
 * Chains multiple iterables together into a single iterable.
 *
 * @param iterables - The iterables to chain together.
 * @returns An iterable that yields items from each input iterable in sequence.
 *
 * @example
 * ```ts
 * const a = [1, 2];
 * const b = [3, 4];
 * const c = [5, 6];
 *
 * for (const num of chain(a, b, c)) {
 *   console.log(num); // Logs 1, 2, 3, 4, 5, 6
 * }
 * ```
 *
 * @group Iteration
 * @category Chaining
 */
export function* chain<T>(...iterables: Iterable<T>[]): Iterable<T> {
  for (const iterable of iterables) {
    yield* iterable;
  }
}
