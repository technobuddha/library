import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';

/**
 * Determines whether the given domain is a temporary (disposable) email domain.
 *
 * @param value - The domain to check.
 * @returns `true` if the domain is a temporary email domain, otherwise `false`.
 *
 * @example
 * ```typescript
 * isTemporaryDomain("10minutemail.com"); // true
 * isTemporaryDomain("mailinator.com"); // true
 * isTemporaryDomain("mydomain.com"); // false
 * ```
 * @group Network
 * @category Type Checking
 */
export function isTemporaryDomain(value: StringLike): boolean {
  const temporaryDomains = [
    '10minutemail.com',
    'mailinator.com',
    'guerrillamail.com',
    'temp-mail.org',
    'throwawaymail.com',
    'fakeinbox.com',
    'yopmail.com',
  ];

  return temporaryDomains.includes(toString(value).toLowerCase());
}
