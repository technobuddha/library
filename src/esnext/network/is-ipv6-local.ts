import { type StringLike } from '../string/string-like.ts';

import { parseIPV6 } from './parse-ipv6.ts';

/**
 * Determines whether the given IPv6 address is a local (private) address.
 * Matches unique local addresses (fc00::/7), link-local addresses (fe80::/10), and loopback (::1).
 *
 * @param address - The IPv6 address to check.
 * @returns `true` if the address is a local IPv6 address, otherwise `false`.
 *
 * @example
 * ```typescript
 * isIPV6Local('fc00::1'); // true (unique local)
 * isIPV6Local('fd12:3456:789a::1'); // true (unique local)
 * isIPV6Local('fe80::1'); // true (link-local)
 * isIPV6Local('::1'); // true (loopback)
 * isIPV6Local('2001:db8::1'); // false (global)
 * isIPV6Local('2606:2800:220:1:248:1893:25c8:1946'); // false (global)
 * ```
 * @group Network
 * @category Type Checking
 */
export function isIPV6Local(address: StringLike): boolean {
  const groups = parseIPV6(address);
  if (groups) {
    // Unique local addresses (fc00::/7)
    if ((groups[0] & 0xfe00) === 0xfc00) {
      return true;
    }
    // Link-local addresses (fe80::/10)
    if ((groups[0] & 0xffc0) === 0xfe80) {
      return true;
    }
    // Loopback address (::1)
    if (
      groups[0] === 0 &&
      groups[1] === 0 &&
      groups[2] === 0 &&
      groups[3] === 0 &&
      groups[4] === 0 &&
      groups[5] === 0 &&
      groups[6] === 0 &&
      groups[7] === 1
    ) {
      return true;
    }
  }
  return false;
}
