/**
 * Calculates the sum of an array of numbers.
 *
 * @param numbers - An array of numbers to sum.
 * @returns The total sum of all numbers in the array.
 *
 * @group Math
 * @category Statistics
 */
export function sum(numbers: number[]): number {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}
