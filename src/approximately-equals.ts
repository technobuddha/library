/**
 * Options for the {@link approximatelyEquals} function
 * @group Math
 * @category Comparison
 */
export type ApproximatelyEqualsOptions = {
  /** Tolerance range. If specified, should be greater than 0. */
  tolerance?: number;
};

/**
 * Tests whether the two values are equal to each other, within a certain
 * tolerance, taking into account floating point errors (numbers within EPSILON).
 * @param a - First number to compare.
 * @param b - Second number to compare.
 * @param options - see {@link ApproximatelyEqualsOptions}
 * @defaultValue tolerance 0
 * @returns true if *a* and *b* are nearly equal.
 * @group Math
 * @category Comparison
 * @example
 * ```typescript
 * approximatelyEquals(0.1 + 0.2, 0.3); // true (floating point rounding)
 * approximatelyEquals(100, 100.0000001); // true
 * approximatelyEquals(100, 100.1); // false
 * approximatelyEquals(5, 7, { tolerance: 2 }); // true
 * approximatelyEquals(5, 8, { tolerance: 2 }); // false
 * ```
 */
export function approximatelyEquals(
  a: number,
  b: number,
  { tolerance = 0 }: ApproximatelyEqualsOptions = {},
): boolean {
  return Math.abs(a - b) <= tolerance + Number.EPSILON;
}
