import { type StringLike } from '../string/string-like.ts';

import { parseIPV4 } from './parse-ipv4.ts';

/**
 * Determines whether the given IPv4 address is a multicast address (224.0.0.0/4).
 *
 * @param address - The IPv4 address to check.
 * @returns `true` if the address is a multicast address, otherwise `false`.
 * @group Network
 * @category Type Checking
 */
export function isIPV4Multicast(address: StringLike): boolean {
  const octets = parseIPV4(address);
  if (octets) {
    return octets[0] >= 224 && octets[0] <= 239;
  }
  return false;
}
