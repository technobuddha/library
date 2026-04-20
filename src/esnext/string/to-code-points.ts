/**
 * Converts a string to an array of Unicode code points.
 * @param str - The string to convert.
 * @returns An array of Unicode code points for each character in the string.
 * @example
 * ```typescript
 * toCodePoints('A😀'); // [65, 128512]
 * ```
 * @group String
 * @category Transform
 */
export function toCodePoints(str: string): number[] {
  const codePoints: number[] = [];
  for (const char of str) {
    codePoints.push(char.codePointAt(0)!);
  }
  return codePoints;
}
