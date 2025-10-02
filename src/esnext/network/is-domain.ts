import { domain } from '../regexp/domain.ts';
import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';

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
 * @group Network
 * @category Type Checking
 */
export function isDomain(text: StringLike): boolean {
  return domain.test(toString(text));
}
