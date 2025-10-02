import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';

/**
 * Parses an IPv6 address into an array of 8 groups of 16-bit integers.
 *
 * Supports standard IPv6 notation, compressed notation with `::`, and IPv4-mapped
 * IPv6 addresses (e.g., `::ffff:192.0.2.128`). For IPv4-mapped addresses, the
 * IPv4 portion is converted into the last two 16-bit groups.
 *
 * @param address - The IPv6 address to parse. Can include embedded IPv4 addresses.
 * @returns An array of 8 numbers representing the 16-bit groups of the address,
 * or `undefined` if the address is not valid.
 *
 * @example
 * Standard IPv6 address:
 * ```ts
 * parseIPV6('2001:db8::8a2e:370:7334');
 * // [0x2001, 0x0db8, 0x0000, 0x0000, 0x0000, 0x8a2e, 0x0370, 0x7334]
 * ```
 *
 * @example
 * IPv4-mapped IPv6 address:
 * ```ts
 * parseIPV6('::ffff:192.0.2.128');
 * // [0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0xffff, 0xc000, 0x0280]
 * // The last two groups (0xc000, 0x0280) represent 192.0.2.128
 * ```
 *
 * @example
 * IPv6 with embedded IPv4:
 * ```ts
 * parseIPV6('64:ff9b::192.0.2.33');
 * // [0x0064, 0xff9b, 0x0000, 0x0000, 0x0000, 0x0000, 0xc000, 0x0221]
 * ```
 *
 * @example
 * Invalid addresses return undefined:
 * ```ts
 * parseIPV6('invalid');           // undefined
 * parseIPV6('::ffff:256.0.0.1');  // undefined
 * parseIPV6('2001::db8::1');      // undefined
 * ```
 *
 * @group Network
 * @category Parsing
 */
export function parseIPV6(
  address: StringLike,
): [number, number, number, number, number, number, number, number] | undefined {
  const text = toString(address);
  // Check if address contains dots (potential IPv4 portion)
  if (text.includes('.')) {
    // Find the last colon to identify where IPv6 ends and IPv4 begins
    const lastColonIndex = text.lastIndexOf(':');
    if (lastColonIndex === -1) {
      return undefined;
    }

    // Extract potential IPv4 portion (everything after the last colon)
    const ipv4Part = text.slice(lastColonIndex + 1);
    const ipv6Part = text.slice(0, lastColonIndex);

    // Validate it matches the full IPv4 pattern
    const ipv4Regex = /^((?:\d{1,3}\.){3}\d{1,3})$/v;
    const ipv4Match = ipv4Regex.exec(ipv4Part);

    if (!ipv4Match) {
      // Contains dots but doesn't match valid IPv4 pattern
      return undefined;
    }

    // Extract and validate IPv4 portion
    const [, ipv4Str] = ipv4Match;
    const ipv4Octets = ipv4Str.split('.').map((octet) => Number.parseInt(octet));

    // Validate IPv4 octets
    if (ipv4Octets.length !== 4 || ipv4Octets.some((octet) => octet < 0 || octet > 255)) {
      return undefined;
    }

    // Convert IPv4 to two 16-bit groups
    // e.g., 192.0.2.128 -> 0xc000 (192*256 + 0) and 0x0280 (2*256 + 128)
    const ipv4Groups: [number, number] = [
      (ipv4Octets[0] << 8) | ipv4Octets[1],
      (ipv4Octets[2] << 8) | ipv4Octets[3],
    ];

    // Parse the IPv6 portion
    return parseIPV6Part(ipv6Part, ipv4Groups);
  }

  // No IPv4 portion, parse as pure IPv6
  return parseIPV6Part(text, null);
}

/**
 * Internal helper to parse the IPv6 portion.
 * @internal
 */
function parseIPV6Part(
  address: string,
  ipv4Groups: [number, number] | null,
): [number, number, number, number, number, number, number, number] | undefined {
  // Expand shorthand notation (::) and split into groups
  const parts = address.split('::');
  if (parts.length > 2) {
    return undefined;
  }

  const head = parts[0] ? parts[0].split(':').filter((g) => g !== '') : [];
  const tail = parts[1] ? parts[1].split(':').filter((g) => g !== '') : [];

  // Calculate the number of groups we need
  const expectedGroups = ipv4Groups ? 6 : 8;
  const providedGroups = head.length + tail.length;
  const missingGroups = expectedGroups - providedGroups;

  if (missingGroups < 0) {
    return undefined;
  }

  // Build the full address
  const ipv6Groups = [...head, ...Array.from({ length: missingGroups }, () => '0'), ...tail];

  // Convert each group to a 16-bit integer
  const result: number[] = [];
  for (const group of ipv6Groups) {
    const value = Number.parseInt(group, 16);
    if (Number.isNaN(value) || value < 0 || value > 0xffff) {
      return undefined;
    }
    result.push(value);
  }

  // Append IPv4-derived groups if present
  if (ipv4Groups) {
    result.push(...ipv4Groups);
  }

  return result as [number, number, number, number, number, number, number, number];
}
