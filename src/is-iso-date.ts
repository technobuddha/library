import { isoDate } from './regexp.ts';

/**
 * Determines whether a given string is a valid ISO date.
 *
 * @param text - The string to test for ISO date format.
 * @returns `true` if the string matches the ISO date format, otherwise `false`.
 *
 * @example
 * ```typescript
 * isISODate("2023-06-15"); // true
 * isISODate("15/06/2023"); // false
 * ```
 * @group RegExp
 * @category Validation
 */
export function isISODate(text: string): boolean {
  return isoDate.test(text);
}
