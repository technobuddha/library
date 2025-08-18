import { isDate } from 'lodash-es';

import { empty } from './constants.ts';
import { padNumber } from './pad-number.ts';

/**
 * Options for the {@link getTimezone} function
 *
 * @group Time
 * @category Time Zone
 */
export type TimezoneOptions = {
  /** Display 'gmt' in time zones */
  gmt?: boolean;
  /** Display 'z' for the gmt time zone */
  z?: boolean;
};

/**
 * Determine the correct timezone string for a specified date using a local timezone, or an offset in minutes
 *
 * @remarks the gmt flag overrides the z flag if both are set
 * @param input - The date, or a timezone offset in minutes
 * @param options - see {@link TimezoneOptions}
 * @defaultValue gmt false
 * @defaultValue z true
 * @returns the timezone offset formatted like '±hh:mm' the string is prefixed by 'gmt' if the option is set.  If the z option is set 'z' is returned for the
 * gmt+00:00 timezone
 * @group Time
 * @category Time Zone
 */
export function getTimezone(
  input: Date | number,
  { gmt = false, z = true }: TimezoneOptions = {},
): string {
  const offset = isDate(input) ? input.getTimezoneOffset() : input;

  if (offset === 0) {
    return (
      gmt ? 'GMT'
      : z ? 'Z'
      : '+00:00'
    );
  }

  const n = Math.abs(offset) / 60;
  const h = Math.floor(n);
  const m = (n - h) * 60;
  return `${(gmt ? 'GMT' : empty) + (offset > 0 ? '-' : '+') + padNumber(h, 2)}:${padNumber(m, 2)}`;
}
