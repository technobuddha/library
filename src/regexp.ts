/* eslint-disable unicorn/better-regex */
/* eslint-disable require-unicode-regexp */
/* eslint-disable no-control-regex */
import { re } from './re.ts';

//#region ipV4
/**
 * Validate an IPv4 segment.
 * @internal
 */
const IPV4_SEG = /(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])/;

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
export const ipV4 = re`^${IPV4_SEG}\.${IPV4_SEG}\.${IPV4_SEG}\.${IPV4_SEG}$`;
//#endregion
//#region ipV4Local
/**
 * Validate a private network 10.x.x.x address.
 * @internal
 */
const IPV4_NET10 = re`^0?10[.]${IPV4_SEG}`;

/**
 * Validate a private network 172.16.x.x - 172.31.x.x address.
 * @internal
 */
const IPV4_NET172 = /^172[.]0?(?:1[6-9]|2[0-9]|3[0-1])/;

/**
 * Validate a private network 192.168.x.x address.
 * @internal
 */
const IPV4_NET192 = /^192[.]168$/;

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
export const ipV4Local = re`^(?:${IPV4_NET10}|${IPV4_NET172}|${IPV4_NET192})[.]${IPV4_SEG}[.]${IPV4_SEG}$`;
//#endregion
//#region isoDate
//cspell:ignore ZONEPLUG, ZONEMINUS, ZONEPLUS, ZONEHOUR, ZONEMINUTE
/**
 * Validate a year component in a date string.
 * @internal
 */
const ISO_YEAR = /^[0-9]{4}$/;

/**
 * Validate a month component in a date string.
 * @internal
 */
const ISO_MONTH = /^(?:0[1-9]|1[0-2])$/;

/**
 * Validate a day component in a date string.
 * @internal
 */
const ISO_DAY = /^(?:3[0-1]|[1-2][0-9]|0[1-9])$/;

/**
 * Validate an hour component in a time string.
 * @internal
 */
const ISO_HOUR = /^(?:2[0-3]|[0-1][0-9])$/;

/**
 * Validate a minute component in a time string.
 * @internal
 */
const ISO_MINUTE = /^[0-5][0-9]$/;

/**
 * Validate a second component in a time string.
 * @internal
 */
const ISO_SECOND = ISO_MINUTE;

/**
 * Validate a fractional second component in a time string.
 * @internal
 */
const ISO_FRACTION = /^[0-9]+$/;

/**
 * Validate a positive timezone offset hour.
 * @internal
 */
const ISO_ZONEPLUS = /^[+](?:1[0-4]|0[0-9])$/;

/**
 * Validate a negative timezone offset hour.
 * @internal
 */
const ISO_ZONEMINUS = /^[-](?:1[0-2]|0[0-9])$/;

/**
 * Validate a timezone offset hour.
 * @internal
 */
const ISO_ZONEHOUR = re`^${ISO_ZONEPLUS}|${ISO_ZONEMINUS}$`;

/**
 * Validate a timezone offset minute.
 * @internal
 */
const ISO_ZONEMINUTE = /^[0-5][0-9]$/;

/**
 * Validate a timezone offset minute.
 * @internal
 */
const ISO_TIMEZONE = re`^(?:(?:${ISO_ZONEHOUR}(?::${ISO_ZONEMINUTE})?)|Z)$`;

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
export const isoDate = re`^${ISO_YEAR}-${ISO_MONTH}-${ISO_DAY}T${ISO_HOUR}:${ISO_MINUTE}(?::${ISO_SECOND}(?:[.]${ISO_FRACTION})?)?${ISO_TIMEZONE}$`;
//#endregion
//#region numeric
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
//#endregion numeric
//#region domain
/**
 * Regular expression to match a valid hostname label ending with a dot.
 * @internal
 */
const DOMAIN_HOST = /^(?!-)[a-zA-Z0-9-]{1,63}(?<!-)[.]$/;

/**
 * Regular expression to match a valid top-level domain (TLD).
 * @internal
 */
const DOMAIN_TLD = /^[a-z]{2,}$/;

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
export const domain = re`^${DOMAIN_HOST}+${DOMAIN_TLD}$`;
// TODO [>2.1]: enable punycode support
//#endregion
//#region email
// cspell:ignore EMAILGLYPH, EMAILQUOTE, EMAILESCAPE, EMAILADDRESS
/**
 * Regular expression matching a single valid character for the local part of an email address.
 * @internal
 */
const EMAIL_GLYPH = /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]/;

/**
 * Characters allowed within a quoted string in the local part of an email address.
 * @internal
 */
const EMAIL_QUOTE = /[\u0001-\u0008\u000b\u000c\u000e-\u001f\u0021\u0023-\u005b\u005d-\u007f]/;

/**
 * Matches a backslash followed by any ASCII character except line feed and carriage return.
 * @internal
 */
const EMAIL_ESCAPE = /\\[\u0001-\u0009\u000b\u000c\u000e-\u007f]/;

/**
 * Validate the local part of an email address.
 * @internal
 */
const EMAIL_ADDRESS = re`(?:${EMAIL_GLYPH}+(?:[.]${EMAIL_GLYPH}+)*|"(?:${EMAIL_QUOTE}|${EMAIL_ESCAPE})*")`;
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
export const email = re`${EMAIL_ADDRESS}@(?:\[${ipV4}\]|${domain})$`;
//#endregion
//#region trimEquivalent
/**
 * Regular expression that matches any whitespace character, including standard spaces,
 * non-breaking spaces (`\u00A0`), and zero-width no-break spaces (`\uFEFF`).
 * Useful for trimming or identifying whitespace-equivalent characters in strings.
 * @group RegExp
 * @category Constants
 */
export const trimEquivalent = /[\s\uFEFF\u00A0]/u;
//#endregion
//#region ANSI Escape Sequences
// Valid string terminator sequences are BEL, ESC\, and 0x9c (String Terminator))

/**
 * Matches ANSI terminator: Bell (BEL), String Terminator (ST), ESC\\
 * @internal
 */
const ANSI_ST = re`\u0007|\u001b\u005c|\u009c`;

/**
 * OSC sequences only: ESC ] ... ST (non-greedy until the first ST)
 * @internal
 */
const ANSI_OSC = re`\u001B\][\s\S]*?${ANSI_ST}`;

/**
 * CSI and related: ESC/C1, optional intermediates, optional params (supports ; and :) then final byte
 * @internal
 */
const ANSI_CSI = re`[\u001B\u009B][\[\]()#;?]*(?:\d{1,4}(?:[;:]\d{0,4})*)?[\dA-PR-TZcf-nq-uy=><~]`;

/**
 * Regular expression that matches ANSI escape sequences, including OSC (Operating System Command)
 * and CSI (Control Sequence Introducer) patterns. Useful for stripping or identifying ANSI codes
 * in strings, such as those used for terminal text formatting.
 *
 * @see https://en.wikipedia.org/wiki/ANSI_escape_code
 * @group RegExp
 * @category Constants
 */
export const ansiEscapes = re('g')`${ANSI_OSC}|${ANSI_CSI}`;
//#endregion
