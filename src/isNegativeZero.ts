/**
 * Tests to see if the specified value is negative zero
 *
 * @param input The number to test
 * @returns true is the number is negative zero
 */
export function isNegativeZero(input: number): boolean {
    return input === 0 && (1 / input) < 0;
}

export default isNegativeZero;
