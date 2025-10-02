import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';

/**
 * Determines whether the given domain is a reserved domain.
 *
 * Reserved domains include:
 * - `example.com`, `example.net`, `example.org`
 * - `localhost`
 * - `test`, `invalid`, `local`
 *
 * @param value - The domain to check.
 * @returns `true` if the domain is reserved, otherwise `false`.
 *
 * @example
 * ```typescript
 * isReservedDomain("example.com"); // true
 * isReservedDomain("localhost"); // true
 * isReservedDomain("mydomain.com"); // false
 * ```
 * @group Network
 * @category Type Checking
 */
export function isReservedDomain(value: StringLike): boolean {
  const reservedDomains = [
    'example.com',
    'example.net',
    'example.org',
    'localhost',
    'test',
    'invalid',
    'local',
  ];

  return reservedDomains.includes(toString(value).toLowerCase());
}
