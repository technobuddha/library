/* eslint-disable unicorn/better-regex */
/* eslint-disable require-unicode-regexp */
/* eslint-disable no-control-regex */
import { compact, zip } from 'lodash-es';

import { build } from './build.js';
import { splitChars } from './split-chars.js';

/**
 * @group Template
 * @category RegExp
 */
export function re(template: TemplateStringsArray, ...args: RegExp[]): RegExp {
  const flags = new Set<string>(['u']);
  const reText = build(
    compact(
      zip(
        template,
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

const IPV4SEG = /(25[0-5]|(?:2[0-4]|1[0-9]|0?[0-9]|0{0,2})[0-9])/;
/**
 * validate an IPv4 address
 * @group RegExp
 * @category Internet Protocol
 */
export const ipV4 = re`^${IPV4SEG}\.${IPV4SEG}\.${IPV4SEG}\.${IPV4SEG}$`;

const NET10 = re`^0?10[.]${IPV4SEG}`;
const NET172 = /^172[.]0?(?:1[6-9]|2[0-9]|3[0-1])/;
const NET192 = /^192[.]168$/;
/**
 * determine if Ipv4 address is local
 * @group RegExp
 * @category Internet Protocol
 */
export const ipV4Local = re`^(?:${NET10}|${NET172}|${NET192})[.]${IPV4SEG}[.]${IPV4SEG}$`;

const YEAR = /^\d{4}$/;
const MONTH = /^(?:0[1-9]|1[0-2])$/;
const DAY = /^(?:3[0-1]|[1-2][0-9]|0[1-9])$/;
const HOUR = /^(?:2[0-3]|[0-1][0-9])$/;
const MINUTE = /^[0-5][0-9]$/;
const SECOND = MINUTE;
const FRACTION = /^[0-9]+$/;
const ZONEPLUS = /^[+](?:1[0-4]|0[0-9])$/;
const ZONEMINUS = /^[-](?:1[0-2]|0[0-9])$/;
const ZONEHOUR = re`^${ZONEPLUS}|${ZONEMINUS}$`;
const ZONEMINUTE = /^[0-5][0-9]$/;
const TIMEZONE = re`^(?:(?:${ZONEHOUR}(?::${ZONEMINUTE})?)|Z)$`;

/**
 * Validate a ISO formatted date
 * @group RegExp
 * @category Date
 */
export const isoDate = re`^${YEAR}-${MONTH}-${DAY}T${HOUR}:${MINUTE}(?::${SECOND}(?:[.]${FRACTION})?)?${TIMEZONE}$`;

/**
 * Validate a valid number
 * @group RegExp
 * @category Number
 */
export const numeric = /^((?:NaN|[+-]?(?:(?:\d+|\d*[.]\d+)(?:[Ee][+-]?\d+)?|[+-]?Infinity)))$/;

const HOST = /^(?!-)[a-zA-Z0-9-]{1,63}(?<!-)[.]$/;
const TLD = /^[a-z]{2,}$/;
/**
 * @group RegExp
 * @category Internet Protocol
 */
export const domain = re`^${HOST}+${TLD}$`;

const EMAILGLYPH = /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]/;
const EMAILQUOTE = /[\u0001-\u0008\u000b\u000c\u000e-\u001f\u0021\u0023-\u005b\u005d-\u007f]/;
const EMAILESCAPE = /\\[\u0001-\u0009\u000b\u000c\u000e-\u007f]/;
const EMAILADDRESS = re`(?:${EMAILGLYPH}+(?:[.]${EMAILGLYPH}+)*|"(?:${EMAILQUOTE}|${EMAILESCAPE})*")`;
/**
 * validate an valid email address
 * @group RegExp
 * @category Email
 */
export const email = re`${EMAILADDRESS}@(?:\\[${ipV4}\\]|${domain})$`;
