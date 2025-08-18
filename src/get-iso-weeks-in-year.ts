import { isNumber } from 'lodash-es';

import { type DayOfWeek } from './constants.ts';
import { day, daysPerWeek, month } from './constants.ts';
import { modulo } from './modulo.ts';

/**
 * Options for the {@link getISOWeeksInYear} function
 * @group Time
 * @category Week
 */
export type ISOWeeksInYearOptions = {
  /** Use the utc timezone */
  utc?: boolean;
  /** Week 1 is defined as the week with the Gregorian year's first [weekOneIncludes] day in it */
  weekOneIncludes?: DayOfWeek;
};

/**
 * Determine the number of ISO weeks within a year
 *
 * @param input - A date within the year, or a year number
 * @param options - see {@link ISOWeeksInYearOptions}
 * @defaultValue weekOneIncludes Thursday
 * @returns The number of weeks in the year (52 or 53)
 * @group Time
 * @category Week
 */
export function getISOWeeksInYear(
  input: Date | number,
  { utc = false, weekOneIncludes = day.thursday }: ISOWeeksInYearOptions = {},
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
