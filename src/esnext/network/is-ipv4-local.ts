import { type StringLike } from '../string/string-like.ts';

import { parseIPV4 } from './parse-ipv4.ts';

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
 * @group Network
 * @category Type Checking
 */
export function isIPV4Local(address: StringLike): boolean {
  const octets = parseIPV4(address);
  if (octets) {
    return (
      octets[0] === 10 ||
      (octets[0] === 192 && octets[1] === 168) ||
      (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31)
    );
  }
  return false;
}
