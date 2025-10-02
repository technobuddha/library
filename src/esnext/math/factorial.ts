import { type NumberLike } from '../number/number-like.ts';
import { toNumber } from '../number/to-number.ts';

/**
 * Computes the factorial of a non-negative integer.
 *
 * The factorial of a number n (denoted as n!) is the product of all positive integers less than or equal to n.
 * By definition, 0! = 1.
 *
 * @param num - The non-negative integer to compute the factorial for.
 * @returns The factorial of n.
 * @throws If n is negative or not an integer.
 * @example
 * ```typescript
 * factorial(0); // 1
 * factorial(1); // 1
 * factorial(5); // 120
 * factorial(10); // 3628800
 * ```
 * @group Math
 * @category Operations
 */
export function factorial(num: NumberLike): number {
  const n = toNumber(num);

  if (n < 0 || !Number.isInteger(n)) {
    throw new Error('Factorial is only defined for non-negative integers');
  }

  if (n === 0 || n === 1) {
    return 1;
  }

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
