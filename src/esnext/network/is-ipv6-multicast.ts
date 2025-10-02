import { type StringLike } from '../string/string-like.ts';

import { parseIPV6 } from './parse-ipv6.ts';

/**
 * Determines whether the given IPv6 address is a multicast address (ff00::/8).
 *
 * @param address - The IPv6 address to check.
 * @returns `true` if the address is a multicast address, otherwise `false`.
 * @group Network
 * @category Type Checking
 */
export function isIPV6Multicast(address: StringLike): boolean {
  const groups = parseIPV6(address);
  if (groups) {
    return (groups[0] & 0xff00) === 0xff00;
  }
  return false;
}
