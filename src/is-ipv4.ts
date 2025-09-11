import { ipV4 } from './regexp.ts';

/**
 * Determines whether the given string is a valid IPv4 address.
 *
 * @param text - The string to test for IPv4 format.
 * @returns `true` if the string is a valid IPv4 address, otherwise `false`.
 *
 * @example
 * ```typescript
 * isIpV4('192.168.1.1'); // true
 * isIpV4('256.256.256.256'); // false
 * isIpV4('example.com'); // false
 * ```
 * @group RegExp
 * @category Validation
 */
export function isIPV4(text: string): boolean {
  return ipV4.test(text);
}
