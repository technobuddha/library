import { type StringLike } from '../string/string-like.ts';

import { parseIPV4 } from './parse-ipv4.ts';

/**
 * Determines whether the given IPv4 address is a broadcast address (255.255.255.255).
 *
 * @param address - The IPv4 address to check.
 * @returns `true` if the address is a broadcast address, otherwise `false`.
 * @group Network
 * @category Type Checking
 */
export function isIPV4Broadcast(address: StringLike): boolean {
  const octets = parseIPV4(address);
  if (octets) {
    return octets[0] === 255 && octets[1] === 255 && octets[2] === 255 && octets[3] === 255;
  }
  return false;
}
