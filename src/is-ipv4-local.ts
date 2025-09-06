import { ipV4Local } from './regexp.ts';

/**
 * Determines whether the given IPv4 address is a local (private) address.
 *
 * @param address - The IPv4 address to check.
 * @returns `true` if the address is a local IPv4 address, otherwise `false`.
 *
 * @example
 * ```typescript
 * isIPV4Local('192.168.1.1'); // true
 * isIPV4Local('8.8.8.8');     // false
 * ```
 * @group RegExp
 * @category Validation
 */
export function isIPV4Local(address: string): boolean {
  return ipV4Local.test(address);
}
