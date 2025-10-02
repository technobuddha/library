import { type StringLike } from '../string/string-like.ts';

import { parseIPV6 } from './parse-ipv6.ts';

/**
 * Determines whether the given IPv6 address is a loopback address (::1).
 *
 * @param address - The IPv6 address to check.
 * @returns `true` if the address is a loopback address, otherwise `false`.
 * @group Network
 * @category Type Checking
 */
export function isIPV6Loopback(address: StringLike): boolean {
  const groups = parseIPV6(address);
  if (groups) {
    return groups.every((group, index) => (index === 7 ? group === 1 : group === 0));
  }
  return false;
}
