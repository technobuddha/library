import { type StringLike } from '../string/string-like.ts';

import { parseIPV4 } from './parse-ipv4.ts';

/**
 * Determines whether the given IPv4 address is a loopback address (127.0.0.0/8).
 *
 * @param address - The IPv4 address to check.
 * @returns `true` if the address is a loopback address, otherwise `false`.
 * @group Network
 * @category Type Checking
 */
export function isIPV4Loopback(address: StringLike): boolean {
  const octets = parseIPV4(address);
  if (octets) {
    return octets[0] === 127;
  }
  return false;
}
