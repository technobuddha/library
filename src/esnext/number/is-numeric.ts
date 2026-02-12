import { isString } from '../string/is-string.ts';
import { isWhitespace } from '../unicode/is-whitespace.ts';

import { isNumber } from './is-number.ts';

/**
 * Test an object to see if it a number, or a string which can be converted into a number
 * @param input - the object to test
 * @returns true, if the object is a number, or can be converted to a number
 * @group Number
 * @category Type Checking
 */
export function isNumeric(input: unknown): boolean {
  return (
    (isNumber(input) && !Number.isNaN(input)) ||
    (isString(input) &&
      input.length > 0 &&
      !isWhitespace(input) &&
      !Number.isNaN(Number.parseFloat(input)))
  );
}
