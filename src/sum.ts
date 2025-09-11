/**
 * Calculates the sum of an array of numbers.
 * @param numbers - An array of numbers to sum.
 * @returns The total sum of all numbers in the array.
 * @example
 * ```typescript
 * sum([1, 2, 3, 4]); // 10
 * sum([-1, 1, -1, 1]); // 0
 * sum([]); // 0
 * sum([2.5, 3.5]); // 6
 * ```
 * @group Math
 * @category Statistics
 */
export function sum(numbers: number[]): number {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}
