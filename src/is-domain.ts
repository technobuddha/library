import { domain } from './regexp.ts';

/**
 * Determines whether the given string is a valid domain name.
 *
 * @param text - The string to test as a domain name.
 * @returns `true` if the string is a valid domain name, otherwise `false`.
 *
 * @example
 * ```typescript
 * isDomain("example.com"); // true
 * isDomain("not a domain"); // false
 * ```
 * @group RegExp
 * @category Validation
 */
export function isDomain(text: string): boolean {
  return domain.test(text);
}
