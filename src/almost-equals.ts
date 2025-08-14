/**
 * Options for the {@link almostEquals} function
 *
 * @group Math
 * @category Comparison
 */
export type AlmostEqualsOptions = {
  /** Tolerance range. If specified, should be greater than 0. **/
  tolerance?: number;
};

/**
 * Tests whether the two values are equal to each other, within a certain
 * tolerance, taking into account floating point errors (numbers within EPSILON).
 *
 * @param a - First number to compare.
 * @param b - Second number to compare.
 * @param __namedParameters - see {@link AlmostEqualsOptions}
 * @defaultValue tolerance 0
 * @returns true if *a* and *b* are nearly equal.
 * @group Math
 * @category Comparison
 */
export function almostEquals(
  a: number,
  b: number,
  { tolerance = 0 }: AlmostEqualsOptions = {},
): boolean {
  return Math.abs(a - b) <= tolerance + Number.EPSILON;
}
