/* eslint-disable unicorn/better-regex */
/* eslint-disable require-unicode-regexp */
/* eslint-disable no-control-regex */
import { build } from './build.ts';
import { collapse } from './collapse.ts';
import { splitChars } from './split-chars.ts';
import { zipperMerge } from './zipper-merge.ts';

/**
 * Constructs a new `RegExp` by interpolating template strings and provided regular expressions.
 *
 * This function allows you to compose regular expressions using template literals,
 * automatically merging flags and wrapping interpolated regex sources as non-capturing groups
 * when appropriate.
 *
 * @param template - The template string array containing the literal parts of the pattern.
 * @param args - The regular expressions to interpolate into the template.
 * @returns A new `RegExp` object with the combined pattern and merged flags.
 *
 * @group RegExp
 * @category Template
 */
export function re(template: TemplateStringsArray, ...args: RegExp[]): RegExp {
  const flags = new Set<string>(['u']);
  const reText = build(
    collapse(
      zipperMerge(
        Array.from(template),
        args.map((a) => {
          for (const flag of splitChars(a.flags)) {
            flags.add(flag);
          }
          let { source } = a;
          if (source.startsWith('^') && source.endsWith('$')) {
            source = source.slice(1, -1);
          }

          if (source.startsWith('[') && source.endsWith(']')) {
            return source;
          }

          if (source.startsWith('(?:') && source.endsWith(')')) {
            return source;
          }

          return `(?:${source})`;
        }),
      ).flat(),
    ),
  );

  return new RegExp(reText, build(flags.values()));
}

/**
 * Validate an IPv4 segment.
 * @internal
 */
const IPV4SEG = /(25[0-5]|(?:2[0-4]|1[0-9]|0?[0-9]|0{0,2})[0-9])/;

/**
 * validate an IPv4 address
 * @group RegExp
 * @category Validation
 */
export const ipV4 = re`^${IPV4SEG}\.${IPV4SEG}\.${IPV4SEG}\.${IPV4SEG}$`;

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
 * @category Validation
 */
export const ipV4Local = re`^(?:${NET10}|${NET172}|${NET192})[.]${IPV4SEG}[.]${IPV4SEG}$`;

//cspell:ignore ZONEPLUG, ZONEMINUS, ZONEPLUS, ZONEHOUR, ZONEMINUTE
/**
 * Validate a year component in a date string.
 * @internal
 */
const YEAR = /^\d{4}$/;

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
 * @category Validation
 */
export const isoDate = re`^${YEAR}-${MONTH}-${DAY}T${HOUR}:${MINUTE}(?::${SECOND}(?:[.]${FRACTION})?)?${TIMEZONE}$`;

/**
 * Validate a valid number
 * @group RegExp
 * @category Validation
 */
export const numeric = /^((?:NaN|[+-]?(?:(?:\d+|\d*[.]\d+)(?:[Ee][+-]?\d+)?|[+-]?Infinity)))$/;

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
 * @category Validation
 */
export const domain = re`^${HOST}+${TLD}$`;

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
 * @category Validation
 */
export const email = re`${EMAILADDRESS}@(?:\\[${ipV4}\\]|${domain})$`;
