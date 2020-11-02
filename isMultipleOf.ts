import isNumber    from 'lodash/isNumber';

/**
  * Tests to see if the specified value is an multiple of {@code multipler}
  * @param    input        The number to test
  * @param multiplier    The multipler
  */
export function isMultipleOf(input: number, multiplier: number): boolean {
    return isNumber(input) && ((input % multiplier) === 0 || (input === 0 && multiplier === 0));
}

export default isMultipleOf;
