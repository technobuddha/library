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
  return Array.from(str, (char) => char.codePointAt(0)!);
}
