import { ipV6 } from '../regexp/ipv6.ts';
import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';

/**
 * Determines whether the given string is a valid IPv6 address.
 *
 * @param text - The string to test for IPv6 format.
 * @returns `true` if the string is a valid IPv6 address, otherwise `false`.
 *
 * @example
 * ```typescript
 * isIPV6('2001:0db8:85a3:0000:0000:8a2e:0370:7334'); // true
 * isIPV6('2001:db8:85a3::8a2e:370:7334'); // true
 * isIPV6('::1'); // true
 * isIPV6('::ffff:192.168.1.1'); // true
 * isIPV6('invalid'); // false
 * isIPV6('192.168.1.1'); // false
 * ```
 * @group Network
 * @category Type Checking
 */
export function isIPV6(text: StringLike): boolean {
  return ipV6.test(toString(text));
}
