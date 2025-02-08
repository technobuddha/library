import { isNumber } from 'lodash-es';

import { type DayOfWeek } from './constants.js';
import { day, daysPerWeek, month } from './constants.js';
import { modulo } from './modulo.js';

export type GetISOWeeksInYearOptions = {
  /** Use the utc timezone */
  utc?: boolean;
  /** Week 1 is defined as the week with the Gregorian year's first [weekOneInclues] day in it */
  weekOneIncludes?: DayOfWeek;
};

/**
 * Determine the number of ISO weeks within a year
 *
 * @param input - A date within the year, or a year number
 * @param __namedParameters - see {@link GetISOWeeksInYearOptions}
 * @defaultValue weekOneIncludes Thursday
 * @returns The number of weeks in the year (52 or 53)
 */
export function getISOWeeksInYear(
  input: Date | number,
  { utc = false, weekOneIncludes = day.thursday }: GetISOWeeksInYearOptions = {},
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
