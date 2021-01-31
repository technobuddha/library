import isDate       from 'lodash/isDate';
import { empty }    from './constants';
import padNumber    from './padNumber';

export type Options = {
    /** Display 'GMT' in time zones */
    GMT?: boolean;
    /** Display 'Z' for the GMT time zone */
    Z?: boolean;
};

/**
 * Determine the correct timezone string for a specified date using a local timezone, or an offset in minutes
 *
 * @remarks the GMT flag overrides the Z flag if both are set
 * @param input The date, or a timezone offset in minutes
 * @param __namedParameters see {@link Options}
 * @default GMT false
 * @default Z true
 * @returns the timezone offset formatted like '±hh:mm' the string is prefixed by 'GMT' if the option is set.  If the Z option is set 'Z' is returned for the
 * GMT+00:00 timezone
 */
export function getTimezone(input: Date | number, { GMT = false, Z = true }: Options = {}): string {
    const offset = isDate(input) ? input.getTimezoneOffset() : input;

    if(offset === 0)
        return GMT ? 'GMT' : Z ? 'Z' : '+00:00';

    const n = Math.abs(offset) / 60;
    const h = Math.floor(n);
    const m = (n - h) * 60;
    return `${(GMT ? 'GMT' : empty) + (offset > 0 ? '-' : '+') + padNumber(h, 2)}:${padNumber(m, 2)}`;
}

export default getTimezone;
