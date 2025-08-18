import { type DayOfWeek } from './constants.ts';
import { day, month, ticksPerWeek } from './constants.ts';
import { floor } from './floor.ts';
import { getBeginningOfWeek } from './get-beginning-of-week.ts';
import { getISOWeeksInYear } from './get-iso-weeks-in-year.ts';

/**
 * Options for the {@link getISOWeekOfYear} function
 * @group Time
 * @category Week
 */
export type ISOWeekOfYearOptions = {
  /** Use the utc timezone */
  utc?: boolean;
  /** Week 1 is defined as the week with the Gregorian year's first [weekOneIncludes] day in it */
  weekOneIncludes?: DayOfWeek;
  /** The first day of the week */
  firstDayOfWeek?: DayOfWeek;
};

/**
 * Determine the ISO week number for a given date
 *
 * @param input - The date
 * @param options - see {@link ISOWeekOfYearOptions}
 * @defaultValue weekOneIncludes Thursday
 * @defaultValue firstDayOfWeek Monday
 * @returns the week number (1-53)
 * @group Time
 * @category Week
 */
export function getISOWeekOfYear(
  input: Date,
  {
    utc = false,
    weekOneIncludes = day.thursday,
    firstDayOfWeek = day.monday,
  }: ISOWeekOfYearOptions = {},
): { year: number; week: number } {
  const bow = getBeginningOfWeek(input, { utc, firstDayOfWeek });

  const week1 =
    utc ?
      getBeginningOfWeek(new Date(Date.UTC(bow.getUTCFullYear(), month.january, weekOneIncludes)), {
        utc,
        firstDayOfWeek,
      })
    : getBeginningOfWeek(new Date(bow.getFullYear(), month.january, weekOneIncludes), {
        utc,
        firstDayOfWeek,
      });

  let week = 1 + floor((bow.getTime() - week1.getTime()) / ticksPerWeek, { tolerance: 0.05 });
  let year = utc ? bow.getUTCFullYear() : bow.getFullYear();
  const weeks = getISOWeeksInYear(year, { utc, weekOneIncludes });

  if (week > weeks) {
    year += 1;
    week = 1;
  }

  return { year, week };
}
