import { isNumber } from './is-number.ts';
import { isString } from './is-string.ts';
import { isWhitespace } from './is-whitespace.ts';
import { toNumber } from './to-number.ts';

/**
 * Test an object to see if it a number, or a string which can be converted into a number
 * @param input - the object to test
 * @returns true, if the object is a number, or can be converted to a number
 * @group String
 * @category Categorization
 */
export function isNumeric(input: unknown): input is number | string {
  return (
    (isNumber(input) && !Number.isNaN(input)) ||
    (isString(input) && input.length > 0 && !isWhitespace(input) && !Number.isNaN(toNumber(input)))
  );
}
