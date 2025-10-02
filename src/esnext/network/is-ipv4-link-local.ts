import { type StringLike } from '../string/string-like.ts';

import { parseIPV4 } from './parse-ipv4.ts';

/**
 * Determines whether the given IPv4 address is a link-local address (169.254.0.0/16).
 *
 * @param address - The IPv4 address to check.
 * @returns `true` if the address is a link-local address, otherwise `false`.
 * @group Network
 * @category Type Checking
 */
export function isIPV4LinkLocal(address: StringLike): boolean {
  const octets = parseIPV4(address);
  if (octets) {
    return octets[0] === 169 && octets[1] === 254;
  }
  return false;
}
