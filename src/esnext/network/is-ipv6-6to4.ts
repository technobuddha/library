import { type StringLike } from '../string/string-like.ts';

import { parseIPV6 } from './parse-ipv6.ts';

/**
 * Determines whether the given IPv6 address is a 6to4 address (2002::/16).
 *
 * @param address - The IPv6 address to check.
 * @returns `true` if the address is a 6to4 address, otherwise `false`.
 * @group Network
 * @category Type Checking
 */
export function isIPV66to4(address: StringLike): boolean {
  const groups = parseIPV6(address);
  if (groups) {
    return groups[0] === 0x2002;
  }
  return false;
}
