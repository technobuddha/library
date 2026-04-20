/**
 * A function that compares two values of type `T` and returns a number indicating their relative order.
 *
 * Returns:
 * - a negative number if `a < b`
 * - zero if `a === b`
 * - a positive number if `a > b`
 *
 * @typeParam T - The type of values to compare.
 * @returns A negative number, zero, or a positive number.
 *
 * @example
 * ```typescript
 * const numberComparator: Comparator<number> = (a, b) => a - b;
 * numberComparator(1, 2); // -1
 * numberComparator(2, 2); // 0
 * numberComparator(3, 2); // 1
 * ```
 *
 * @group Comparison
 * @category Comparator
 */
export type Comparator<T> = (a: T, b: T) => number;
