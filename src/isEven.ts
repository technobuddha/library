import isInteger    from 'lodash/isInteger';
import isMultipleOf from './isMultipleOf';

/**
 * Tests to see if the specified value is an even integer
 *
 * @param input The number to test
 * @returns true if the number is an even integer
 */
export function isEven(input: number): boolean {
    return isInteger(input) && isMultipleOf(input, 2);
}

export default isEven;
