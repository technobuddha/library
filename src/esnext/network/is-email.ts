import { email } from '../regexp/email.ts';
import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';

/**
 * Determines whether the given string is a valid email address.
 *
 * @param address - The string to test for email format.
 * @returns `true` if the string is a valid email address, otherwise `false`.
 *
 * @example
 * ```typescript
 * isEmail("user@example.com"); // true
 * isEmail("invalid-email"); // false
 * ```
 * @group Network
 * @category Type Checking
 */
export function isEmail(address: StringLike): boolean {
  const text = toString(address);
  const match = email.exec(text);
  if (match) {
    return !(
      (match.groups?.local?.length ?? 999) > 64 ||
      (match.groups?.domain?.length ?? 999) > 255 ||
      text.length > 320
    );
  }

  return false;
}
