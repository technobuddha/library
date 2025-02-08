/**
 * Options for the {@link approximatelyEquals} function
 *
 * @group Math
 * @category Comparison
 */
export type ApproximatelyEqualsOptions = {
  /** Tolerance range. If specified, should be greater than 0. **/
  tolerance?: number;
};

/**
 * Tests whether the two values are equal to each other, within a certain
 * tolerance, taking into account floating point errors (numbers within EPSILON).
 *
 * @param a - First number to compare.
 * @param b - Second number to compare.
 * @param __namedParameters - see {@link ApproximatelyEqualsOptions}
 * @defaultValue tolerance 0
 * @returns true if *a* and *b* are nearly equal.
 * @group Math
 * @category Comparison
 */
export function approximatelyEquals(
  a: number,
  b: number,
  { tolerance = 0 }: ApproximatelyEqualsOptions = {},
): boolean {
  return Math.abs(a - b) <= tolerance + Number.EPSILON;
}
