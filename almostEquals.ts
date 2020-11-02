
type Options = {
    tolerance?: number,
};

/**
  * Tests whether the two values are equal to each other, within a certain
  * tolerance to adjust for floating point errors.
  * @param    a            A number.
  * @param    b            A number.
  * @param    tolerance    Optional tolerance range. Defaults to EPSILON. If specified, should be greater than 0.
  * @return   Whether {@code a} and {@code b} are nearly equal.
  */
export function almostEquals(a: number, b: number, {tolerance = 0}: Options = {}): boolean
{
    return Math.abs(a - b) <= (tolerance + Number.EPSILON);
}

export default almostEquals;
