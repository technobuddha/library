/**
 * Determines whether two values are the same value, following the
 * [SameValueZero](https://tc39.es/ecma262/#sec-samevaluezero) algorithm as defined in ECMAScript.
 *
 * This function is similar to `Object.is`, treating `NaN` as equal to itself.
 * @param x - The first value to compare.
 * @param y - The second value to compare.
 * @returns `true` if the values are the same according to the SameValueZero algorithm, otherwise `false`.
 * @group Object
 * @category Comparison
 */
export function sameValueZero(x: unknown, y: unknown): boolean {
  // eslint-disable-next-line no-self-compare
  return x === y ? true : x !== x && y !== y;
}
