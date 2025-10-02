import { type StringLike } from '../string/string-like.ts';

import { parseIPV6 } from './parse-ipv6.ts';

/**
 * Determines whether the given IPv6 address is a Teredo address (2001::/32).
 *
 * @param address - The IPv6 address to check.
 * @returns `true` if the address is a Teredo address, otherwise `false`.
 * @group Network
 * @category Type Checking
 */
export function isIPV6Teredo(address: StringLike): boolean {
  const groups = parseIPV6(address);
  if (groups) {
    return groups[0] === 0x2001 && groups[1] === 0x0000;
  }
  return false;
}
