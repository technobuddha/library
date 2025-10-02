import { floor } from '../math/floor.ts';

import { beginningOfWeek } from './beginning-of-week.ts';
import { type DateOptions, day, month, ticksPerWeek } from './constants.ts';
import { isoWeeksInYear } from './iso-weeks-in-year.ts';

/**
 * Determine the ISO week number for a given date
 * @param input - The date
 * @param options - see {@link DateOptions}
 * @defaultValue weekOneIncludes Thursday
 * @defaultValue firstDayOfWeek Monday
 * @returns the week number (1-53)
 * @group Time
 * @category Week
 */
export function isoWeekOfYear(
  input: Date,
  { utc = false, weekOneIncludes = day.thursday, firstDayOfWeek = day.monday }: DateOptions = {},
): {
  /** The year */
  year: number;
  /** The ISO week number */
  week: number;
} {
  const bow = beginningOfWeek(input, { utc, firstDayOfWeek });

  const week1 =
    utc ?
      beginningOfWeek(new Date(Date.UTC(bow.getUTCFullYear(), month.january, weekOneIncludes)), {
        utc,
        firstDayOfWeek,
      })
    : beginningOfWeek(new Date(bow.getFullYear(), month.january, weekOneIncludes), {
        utc,
        firstDayOfWeek,
      });

  let week = 1 + floor((bow.getTime() - week1.getTime()) / ticksPerWeek, { tolerance: 0.05 });
  let year = utc ? bow.getUTCFullYear() : bow.getFullYear();
  const weeks = isoWeeksInYear(year, { utc, weekOneIncludes });

  if (week > weeks) {
    year += 1;
    week = 1;
  }

  return { year, week };
}
