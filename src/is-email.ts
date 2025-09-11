import { email } from './regexp.ts';

/**
 * Determines whether a given string is a valid email address.
 *
 * @param value - The string to test for email format.
 * @returns `true` if the string is a valid email address, otherwise `false`.
 *
 * @example
 * ```typescript
 * isEmail("user@example.com"); // true
 * isEmail("invalid-email"); // false
 * ```
 * @group RegExp
 * @category Validation
 */
export function isEmail(value: string): boolean {
  return email.test(value);
}
