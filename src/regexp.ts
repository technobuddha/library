/* eslint-disable unicorn/better-regex */
/* eslint-disable require-unicode-regexp */
/* eslint-disable no-control-regex */

import { re } from './re.ts';

/**
 * Validate an IPv4 segment.
 * @internal
 */
const IPV4SEG = /(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])/;

/**
 * validate an IPv4 address
 * @group RegExp
 * @category Constants
 * @example
 * ```typescript
 * ipV4.test('192.168.1.1'); // true
 * ipV4.test('255.255.255.255'); // true
 * ipV4.test('256.0.0.1'); // false
 * ipV4.test('abc.def.ghi.jkl'); // false
 * ```
 */
export const ipV4 = re`^${IPV4SEG}\\.${IPV4SEG}\\.${IPV4SEG}\\.${IPV4SEG}$`;

/**
 * Validate a private network 10.x.x.x address.
 * @internal
 */
const NET10 = re`^0?10[.]${IPV4SEG}`;

/**
 * Validate a private network 172.16.x.x - 172.31.x.x address.
 * @internal
 */
const NET172 = /^172[.]0?(?:1[6-9]|2[0-9]|3[0-1])/;

/**
 * Validate a private network 192.168.x.x address.
 * @internal
 */
const NET192 = /^192[.]168$/;

/**
 * determine if Ipv4 address is local
 * @group RegExp
 * @category Constants
 * @example
 * ```typescript
 * ipV4Local.test('192.168.1.1'); // true
 * ipV4Local.test('10.0.0.1'); // true
 * ipV4Local.test('172.16.0.1'); // true
 * ipV4Local.test('8.8.8.8'); // false
 * ipV4Local.test('256.0.0.1'); // false
 * ```
 */
export const ipV4Local = re`^(?:${NET10}|${NET172}|${NET192})[.]${IPV4SEG}[.]${IPV4SEG}$`;

//cspell:ignore ZONEPLUG, ZONEMINUS, ZONEPLUS, ZONEHOUR, ZONEMINUTE
/**
 * Validate a year component in a date string.
 * @internal
 */
const YEAR = /^[0-9]{4}$/;

/**
 * Validate a month component in a date string.
 * @internal
 */
const MONTH = /^(?:0[1-9]|1[0-2])$/;

/**
 * Validate a day component in a date string.
 * @internal
 */
const DAY = /^(?:3[0-1]|[1-2][0-9]|0[1-9])$/;

/**
 * Validate an hour component in a time string.
 * @internal
 */
const HOUR = /^(?:2[0-3]|[0-1][0-9])$/;

/**
 * Validate a minute component in a time string.
 * @internal
 */
const MINUTE = /^[0-5][0-9]$/;

/**
 * Validate a second component in a time string.
 * @internal
 */
const SECOND = MINUTE;

/**
 * Validate a fractional second component in a time string.
 * @internal
 */
const FRACTION = /^[0-9]+$/;

/**
 * Validate a positive timezone offset hour.
 * @internal
 */
const ZONEPLUS = /^[+](?:1[0-4]|0[0-9])$/;

/**
 * Validate a negative timezone offset hour.
 * @internal
 */
const ZONEMINUS = /^[-](?:1[0-2]|0[0-9])$/;

/**
 * Validate a timezone offset hour.
 * @internal
 */
const ZONEHOUR = re`^${ZONEPLUS}|${ZONEMINUS}$`;

/**
 * Validate a timezone offset minute.
 * @internal
 */
const ZONEMINUTE = /^[0-5][0-9]$/;

/**
 * Validate a timezone offset minute.
 * @internal
 */
const TIMEZONE = re`^(?:(?:${ZONEHOUR}(?::${ZONEMINUTE})?)|Z)$`;

/**
 * Validate a ISO formatted date
 * @group RegExp
 * @category Constants
 * @example
 * ```typescript
 * isoDate.test('2023-08-29T12:34:56Z'); // true
 * isoDate.test('2023-08-29T12:34:56.789+02:00'); // true
 * isoDate.test('2023-08-29T12:34'); // true
 * isoDate.test('2023-08-29'); // false
 * isoDate.test('not-a-date'); // false
 * ```
 */
export const isoDate = re`^${YEAR}-${MONTH}-${DAY}T${HOUR}:${MINUTE}(?::${SECOND}(?:[.]${FRACTION})?)?${TIMEZONE}$`;

/**
 * Validate a valid number
 * @group RegExp
 * @category Constants
 * @example
 * ```typescript
 * numeric.test('123'); // true
 * numeric.test('-123.45'); // true
 * numeric.test('1.23e4'); // true
 * numeric.test('Infinity'); // true
 * numeric.test('NaN'); // true
 * numeric.test('abc'); // false
 * numeric.test(''); // false
 * ```
 */
export const numeric = /^((?:NaN|[+-]?(?:(?:\d+|\d*[.]\d+)(?:[Ee][+-]?\d+)?|[+-]?Infinity)))$/;
// TODO [>2.1]: enhance numeric regex to support hexadecimal and binary literals
// TODO [>2.1]: Add isNumeric function, but with a different name

/**
 * Regular expression to match a valid hostname label ending with a dot.
 * @internal
 */
const HOST = /^(?!-)[a-zA-Z0-9-]{1,63}(?<!-)[.]$/;

/**
 * Regular expression to match a valid top-level domain (TLD).
 * @internal
 */
const TLD = /^[a-z]{2,}$/;

/**
 * Regular expression for matching a domain name composed of a host and a top-level domain (TLD).
 * @group RegExp
 * @category Constants
 * @example
 * ```typescript
 * domain.test('example.com'); // true
 * domain.test('sub.example.co'); // true
 * domain.test('invalid_domain'); // false
 * ```
 */
export const domain = re`^${HOST}+${TLD}$`;
// TODO [>2.1]: enable punycode support

// cspell:ignore EMAILGLYPH, EMAILQUOTE, EMAILESCAPE, EMAILADDRESS
/**
 * Regular expression matching a single valid character for the local part of an email address.
 * @internal
 */
const EMAILGLYPH = /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]/;

/**
 * Characters allowed within a quoted string in the local part of an email address.
 * @internal
 */
const EMAILQUOTE = /[\u0001-\u0008\u000b\u000c\u000e-\u001f\u0021\u0023-\u005b\u005d-\u007f]/;

/**
 * Matches a backslash followed by any ASCII character except line feed and carriage return.
 * @internal
 */
const EMAILESCAPE = /\\[\u0001-\u0009\u000b\u000c\u000e-\u007f]/;

/**
 * Validate the local part of an email address.
 * @internal
 */
const EMAILADDRESS = re`(?:${EMAILGLYPH}+(?:[.]${EMAILGLYPH}+)*|"(?:${EMAILQUOTE}|${EMAILESCAPE})*")`;
/**
 * validate an valid email address
 * @group RegExp
 * @category Constants
 * @example
 * ```typescript
 * email.test('user@example.com'); // true
 * email.test('user@sub.example.co'); // true
 * email.test('invalid@domain'); // false
 * email.test('not-an-email'); // false
 * ```
 */
export const email = re`${EMAILADDRESS}@(?:\\[${ipV4}\\]|${domain})$`;

/**
 * Regular expression that matches any whitespace character, including standard spaces,
 * non-breaking spaces (`\u00A0`), and zero-width no-break spaces (`\uFEFF`).
 * Useful for trimming or identifying whitespace-equivalent characters in strings.
 * @group RegExp
 * @category Constants
 */
export const trimEquivalent = /[\s\uFEFF\u00A0]/u;
