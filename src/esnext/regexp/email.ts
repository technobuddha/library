/* eslint-disable no-control-regex */

import { domain } from './domain.ts';
import { ipV4 } from './ipv4.ts';
import { re } from './re.ts';

/**
 * Matches valid characters for the local part (username) of an email address.
 *
 * Includes Unicode letters and numbers, plus special characters allowed by RFC 5321:
 * `! # % ' = _ ~ - $ * + / ? ^ & \{ | \}` and backtick.
 *
 * @internal
 */
// eslint-disable-next-line no-useless-escape
const EMAIL_GLYPH = /[\p{L}\p{N}!#%'=_`~\-\$\*\+\/\?\^\&\{\|\}]/iv;

/**
 * Matches a standard (unquoted) local part of an email address.
 *
 * Allows sequences of valid glyphs separated by dots, but not starting or ending with a dot.
 *
 * @internal
 */
const EMAIL_USER = re`${EMAIL_GLYPH}+(?:\.${EMAIL_GLYPH}+)*`;

/**
 * Matches characters allowed within a quoted string in the local part of an email address.
 *
 * Includes ASCII printable characters and most control characters, per RFC 5321.
 * Excludes backslash, quote, CR, and LF (which must be escaped).
 *
 * @internal
 */
const EMAIL_QUOTE = /[\u0001-\u0008\u000b\u000c\u000e-\u001f\u0021\u0023-\u005b\u005d-\u007f]/v;

/**
 * Matches escaped characters within a quoted string.
 *
 * A backslash followed by any ASCII character except line feed (LF) and carriage return (CR).
 * Used for escaping special characters in quoted local parts per RFC 5321.
 *
 * @internal
 */
const EMAIL_ESCAPE = /\\[\u0001-\u0009\u000b\u000c\u000e-\u007f]/v;

/**
 * Matches a quoted local part of an email address (enclosed in double quotes).
 *
 * Allows most ASCII characters within quotes, with backslash escaping for special characters.
 *
 * @internal
 */
const EMAIL_QUOTED = re`"(?:${EMAIL_QUOTE}|${EMAIL_ESCAPE})+"`;

/**
 * Matches the local part (username) of an email address.
 *
 * Supports both standard unquoted format and quoted format per RFC 5321.
 *
 * @internal
 */
const EMAIL_ADDRESS = re`${EMAIL_USER}|${EMAIL_QUOTED}`;

/**
 * Regular expression for validating email addresses.
 *
 * This pattern validates email addresses according to RFC 5321 specifications, supporting:
 * - Standard local parts (usernames) with Unicode letters, numbers, and special characters
 * - Quoted local parts for special cases requiring additional characters
 * - Domain names (via the {@link domain} pattern)
 * - IPv4 address literals in square brackets (e.g., `user@[192.168.1.1]`)
 *
 * The pattern uses named capture groups:
 * - `local`: The username/local part before the `@` symbol
 * - `domain`: The domain name or IP address after the `@` symbol
 *
 * **Note:** This pattern does not yet support Internationalized Email Addresses (EAI/RFC 6531).
 *
 * @example
 * Valid email addresses:
 * ```ts
 * email.test('user@example.com');                // true
 * email.test('user.name@example.co.uk');         // true
 * email.test('user+tag@example.com');            // true
 * email.test('first.last@sub.example.org');      // true
 * email.test('admin@[192.168.1.1]');             // true (IPv4 literal)
 * email.test('user_name@example.com');           // true
 * email.test('"special.chars"@example.com');     // true (quoted local)
 * ```
 *
 * @example
 * Invalid email addresses:
 * ```ts
 * email.test('invalid@domain');                  // false (invalid TLD)
 * email.test('not-an-email');                    // false (missing @)
 * email.test('@example.com');                    // false (missing local part)
 * email.test('user@');                           // false (missing domain)
 * email.test('user..name@example.com');          // false (consecutive dots)
 * email.test('.user@example.com');               // false (starts with dot)
 * email.test('user.@example.com');               // false (ends with dot)
 * ```
 *
 * @example
 * Extracting email components:
 * ```ts
 * const match = 'user@example.com'.match(email);
 * console.log(match?.groups?.local);             // 'user'
 * console.log(match?.groups?.domain);            // 'example.com'
 * ```
 *
 * @group RegExp
 * @category Constants
 */
// TODO [>2.1]: Support Internationalized Email Addresses (EAI)
// https://datatracker.ietf.org/doc/html/rfc5892#section-0110
export const email = re`^(?<local>${EMAIL_ADDRESS})@(?<domain>\[${ipV4}\]|${domain})$`;
