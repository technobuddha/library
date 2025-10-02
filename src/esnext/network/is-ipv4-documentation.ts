import { type StringLike } from '../string/string-like.ts';

import { parseIPV4 } from './parse-ipv4.ts';

/**
 * Determines whether the given IPv4 address is a documentation address (RFC 5737).
 * Matches 192.0.2.0/24, 198.51.100.0/24, and 203.0.113.0/24.
 *
 * @param address - The IPv4 address to check.
 * @returns `true` if the address is a documentation address, otherwise `false`.
 * @group Network
 * @category Type Checking
 */
export function isIPV4Documentation(address: StringLike): boolean {
  const octets = parseIPV4(address);
  if (octets) {
    return (
      (octets[0] === 192 && octets[1] === 0 && octets[2] === 2) ||
      (octets[0] === 198 && octets[1] === 51 && octets[2] === 100) ||
      (octets[0] === 203 && octets[1] === 0 && octets[2] === 113)
    );
  }
  return false;
}
