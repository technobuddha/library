import { re } from './re.ts';

/**
 * Validate an IPv4 segment.
 * @internal
 */
const IPV4_SEG = /(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])/v;

/**
 * validate an IPv4 address
 * @example
 * ```typescript
 * ipV4.test('192.168.1.1'); // true
 * ipV4.test('255.255.255.255'); // true
 * ipV4.test('256.0.0.1'); // false
 * ipV4.test('abc.def.ghi.jkl'); // false
 * ```
 * @group RegExp
 * @category Constants
 */
export const ipV4 = re`^${IPV4_SEG}\.${IPV4_SEG}\.${IPV4_SEG}\.${IPV4_SEG}$`;
