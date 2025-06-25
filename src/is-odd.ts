import { isInteger } from 'lodash-es';

import { isMultipleOf } from './is-multiple-of.ts';

/**
 * Tests to see if the specified value is an odd integer
 *
 * @param input - The number to test
 * @returns true if the number is an odd integer
 * @group Math
 * @category Parity
 */
export function isOdd(input: number): boolean {
  return isInteger(input) && !isMultipleOf(input, 2);
}
