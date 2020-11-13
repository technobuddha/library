
export type Options = {
    /** Tolerance range. If specified, should be greater than 0. **/
    tolerance?: number,
};

/**
 * Tests whether the two values are equal to each other, within a certain
 * tolerance, taking into account floating point errors (numbers within EPSILON).
 * 
 * @param a First number to compare.
 * @param b Second number to compare.
 * @param __namedParameters see {@link Options}
 * @defaultValue tolerance 0
 * @return true if _a_ and *b* are nearly equal.
 */
export function almostEquals(a: number, b: number, {tolerance = 0}: Options = {}): boolean
{
    return Math.abs(a - b) <= (tolerance + Number.EPSILON);
}

export default almostEquals;
