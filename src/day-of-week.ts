import { type DayOfWeek } from './constants.ts';
import { day, daysPerWeek } from './constants.ts';
import { modulo } from './modulo.ts';

/**
 * Options for the {@link dayOfWeek} function
 * @group Time
 * @category Week
 */
export type DayOfWeekOptions = {
  /** Use the utc timezone */
  utc?: boolean;
  /** Which day of the week is considered the beginning */
  startOfWeek?: DayOfWeek;
};

/**
 * Determine the day of the week for a specific date
 * @param input - The date
 * @param options - see {@link DayOfWeekOptions}
 * @defaultValue utc false
 * @returns The date value for midnight on the first day of the specified year
 * @group Time
 * @category Week
 */
export function dayOfWeek(
  input: Date,
  { utc = false, startOfWeek = day.sunday }: DayOfWeekOptions = {},
): DayOfWeek {
  if (utc) {
    return modulo(input.getUTCDay() + daysPerWeek - startOfWeek, daysPerWeek) as DayOfWeek;
  }

  return modulo(input.getDay() + daysPerWeek - startOfWeek, daysPerWeek) as DayOfWeek;
}
