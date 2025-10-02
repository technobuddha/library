import { modulo } from '../math/modulo.ts';
import { isNumber } from '../number/is-number.ts';

import { type DateOptions, day, daysPerWeek, month } from './constants.ts';

/**
 * Determine the number of ISO weeks within a year
 * @param input - A date within the year, or a year number
 * @param options - see {@link DateOptions}
 * @defaultValue weekOneIncludes Thursday
 * @returns The number of weeks in the year (52 or 53)
 * @group Time
 * @category Week
 */
export function isoWeeksInYear(
  input: Date | number,
  { utc = false, weekOneIncludes = day.thursday }: DateOptions = {},
): number {
  const year =
    isNumber(input) ? input
    : utc ? input.getUTCFullYear()
    : input.getFullYear();
  const dow0 =
    utc ?
      new Date(Date.UTC(year, month.january, 1)).getUTCDay()
    : new Date(year, month.january, 1).getDay();
  const dow1 =
    utc ?
      new Date(Date.UTC(year, month.december, 31)).getUTCDay()
    : new Date(year, month.december, 31).getDay();
  const target = modulo(weekOneIncludes, daysPerWeek);

  return dow0 === target || dow1 === target ? 53 : 52;
}
