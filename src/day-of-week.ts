import { type DayOfWeek } from './constants.ts';
import { day, daysPerWeek } from './constants.ts';
import { type DateOptions } from './date.ts';
import { modulo } from './modulo.ts';

/**
 * Determine the day of the week for a specific date
 * @param input - The date
 * @param options - see {@link DateOptions}
 * @defaultValue utc false
 * @returns The date value for midnight on the first day of the specified year
 * @group Time
 * @category Week
 */
export function dayOfWeek(
  input: Date,
  { utc = false, firstDayOfWeek = day.sunday }: DateOptions = {},
): DayOfWeek {
  if (utc) {
    return modulo(input.getUTCDay() + daysPerWeek - firstDayOfWeek, daysPerWeek) as DayOfWeek;
  }

  return modulo(input.getDay() + daysPerWeek - firstDayOfWeek, daysPerWeek) as DayOfWeek;
}
