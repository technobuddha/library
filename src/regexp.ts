/* eslint-disable unicorn/better-regex */
/* eslint-disable require-unicode-regexp */
/* eslint-disable no-control-regex */
import compact      from 'lodash/compact';
import zip          from 'lodash/zip';
import splitChars   from './splitChars';
import build        from './build';

export function re(template: TemplateStringsArray, ...args: RegExp[]): RegExp {
    const flags     = new Set<string>([ 'u' ]);
    const reText    = build(
        compact(
            zip(
                template,
                args.map(a => {
                    for(const flag of splitChars(a.flags))  flags.add(flag);
                    let source = a.source;
                    if(source.startsWith('^') && source.endsWith('$'))
                        source = source.slice(1, -1);

                    if(source.startsWith('[') && source.endsWith(']'))
                        return source;

                    if(source.startsWith('(?:') && source.endsWith(')'))
                        return source;

                    return `(?:${source})`;
                })
            )
            .flat()
        )
    );

    return new RegExp(reText, build(flags.values()));
}

const IPV4SEG = /(25[0-5]|(?:2[0-4]|1[0-9]|0?[0-9]|0{0,2})[0-9])/;
/** validate an IPv4 address */
export const ipV4           = re`^${IPV4SEG}\.${IPV4SEG}\.${IPV4SEG}\.${IPV4SEG}$`;

const NET10  = re`^0?10[.]${IPV4SEG}`;
const NET172 = /^172[.]0?(?:1[6-9]|2[0-9]|3[0-1])/;
const NET192 = /^192[.]168$/;
/** determine if Ipv4 address is local */
export const ipV4Local      = re`^(?:${NET10}|${NET172}|${NET192})[.]${IPV4SEG}[.]${IPV4SEG}$`;

/** validate a ISO formatted date */
const YEAR          = /^\d{4}$/;
const MONTH         = /^(?:0[1-9]|1[0-2])$/;
const DAY           = /^(?:3[0-1]|[1-2][0-9]|0[1-9])$/;
const HOUR          = /^(?:2[0-3]|[0-1][0-9])$/;
const MINUTE        = /^[0-5][0-9]$/;
const SECOND        = MINUTE;
const FRACTION      = /^[0-9]+$/;
const ZONEPLUS      = /^[+](?:1[0-4]|0[0-9])$/;
const ZONEMINUS     = /^[-](?:1[0-2]|0[0-9])$/;
const ZONEHOUR      = re`^${ZONEPLUS}|${ZONEMINUS}$`;
const ZONEMINUTE    = /^[0-5][0-9]$/;
const TIMEZONE      = re`^(?:(?:${ZONEHOUR}(?::${ZONEMINUTE})?)|Z)$`;
export const isoDate        = re`^${YEAR}-${MONTH}-${DAY}T${HOUR}:${MINUTE}(?::${SECOND}(?:[.]${FRACTION})?)?${TIMEZONE}$`;

/** validate a valid number */
export const numeric        = /^((?:NaN|[+-]?(?:(?:\d+|\d*[.]\d+)(?:[Ee][+-]?\d+)?|[+-]?Infinity)))$/;

const HOST = /^(?!-)[a-zA-Z0-9-]{1,63}(?<!-)[.]$/;
const TLD  = /^[a-z]{2,}$/;
export const domain         = re`^${HOST}+${TLD}$`;

/** validate an valid email address */
const EMAILGLYPH    = /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]/;
const EMAILQUOTE    = /[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]/;
const EMAILESCAPE   = /\\[\x01-\x09\x0b\x0c\x0e-\x7f]/;
const EMAILADDRESS  = re`(?:${EMAILGLYPH}+(?:[.]${EMAILGLYPH}+)*|"(?:${EMAILQUOTE}|${EMAILESCAPE})*")`;
export const email  = re`${EMAILADDRESS}@(?:\\[${ipV4}\\]|${domain})$`;

export default { domain, email, isoDate, numeric, ipV4, ipV4Local };
