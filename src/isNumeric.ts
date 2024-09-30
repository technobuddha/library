import { isNumber } from 'lodash-es';
import { isNaN } from 'lodash-es';
import { isString } from 'lodash-es';
import { toNumber } from 'lodash-es';
import isWhitespace from './isWhitespace';

/**
 * Test an object to see if it a number, or a string which can be converted into a number
 *
 * @param input the object to test
 * @returns true, if the object is a number, or can be converted to a number
 */
export function isNumeric(input: unknown): input is number | string {
  return (
    (isNumber(input) && !isNaN(input)) ||
    (isString(input) && input.length > 0 && !isWhitespace(input) && !isNaN(toNumber(input)))
  );
}

export default isNumeric;
