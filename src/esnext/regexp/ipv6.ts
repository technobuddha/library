import { ipV4 } from './ipv4.ts';
import { re } from './re.ts';

/**
 * Validate an IPv6 hexadecimal segment (1-4 hex digits).
 * @internal
 */
const IPV6_SEG = /[0-9a-fA-F]{1,4}/v;

/**
 * Validate a full IPv6 address with 8 segments.
 * @internal
 */
const IPV6_FULL = re`^(?:${IPV6_SEG}:){7}${IPV6_SEG}$`;

/**
 * Validate IPv6 addresses with :: compression (omitting consecutive zeros).
 * Handles various positions of :: including start, middle, and end.
 * @internal
 */
const IPV6_COMPRESSED = re`^(?:(?:${IPV6_SEG}:){0,6}${IPV6_SEG})?::(?:(?:${IPV6_SEG}:){0,6}${IPV6_SEG})?$`;

/**
 * Validate IPv6 addresses with embedded IPv4 addresses (e.g., ::ffff:192.168.1.1).
 * @internal
 */
const IPV6_IPV4_MAPPED = re`^(?:(?:${IPV6_SEG}:){6}|::(?:${IPV6_SEG}:){5}|(?:${IPV6_SEG})?::(?:${IPV6_SEG}:){4}|(?:(?:${IPV6_SEG}:){0,1}${IPV6_SEG})?::(?:${IPV6_SEG}:){3}|(?:(?:${IPV6_SEG}:){0,2}${IPV6_SEG})?::(?:${IPV6_SEG}:){2}|(?:(?:${IPV6_SEG}:){0,3}${IPV6_SEG})?::${IPV6_SEG}:|(?:(?:${IPV6_SEG}:){0,4}${IPV6_SEG})?::)${ipV4}$`;

/**
 * Regular expression for validating IPv6 addresses.
 * Supports standard notation, compressed notation (::), and IPv4-mapped IPv6 addresses.
 * @example
 * ```typescript
 * ipV6.test('2001:0db8:85a3:0000:0000:8a2e:0370:7334'); // true
 * ipV6.test('2001:db8:85a3::8a2e:370:7334'); // true (compressed)
 * ipV6.test('::1'); // true (loopback)
 * ipV6.test('::ffff:192.168.1.1'); // true (IPv4-mapped)
 * ipV6.test('invalid'); // false
 * ```
 * @group RegExp
 * @category Constants
 */
export const ipV6 = re`^(?:${IPV6_FULL}|${IPV6_COMPRESSED}|${IPV6_IPV4_MAPPED})$`;
