import { addTime } from './add-time.js';
import { type DayOfWeek } from './constants.js';
import { daysPerWeek } from './constants.js';
import { getBeginningOfMonth } from './get-beginning-of-month.js';
import { getDaysInMonth } from './get-days-in-month.js';
import { modulo } from './modulo.js';

export type GetOccurrenceInMonthOptions = {
  /** Use the utc timezone */
  utc?: boolean;
};

/**
 * Determine the date of an occurrence of a weekday within a month
 *
 * @param input - A date within the month in question
 * @param dayOfWeek - The day of the week to find the occurrence
 * @param occurrence - The occurrence number, or 'last' to find the last occurrence
 * @param __namedParameters - see {@link GetOccurrenceInMonthOptions}
 * @defaultValue utc false
 * @returns A date object corresponding to the occurrence requested, or null if no such date exists in the month
 */
export function getOccurrenceInMonth(
  input: Date,
  dayOfWeek: DayOfWeek,
  occurrence: number | 'last',
  { utc = false }: GetOccurrenceInMonthOptions = {},
): Date | null {
  let day = getBeginningOfMonth(input, { utc });
  const jump = modulo(dayOfWeek - (utc ? day.getUTCDay() : day.getDay()), daysPerWeek);
  if (occurrence === 'last') {
    return addTime(day, {
      days:
        jump + Math.floor((getDaysInMonth(input, { utc }) - jump - 1) / daysPerWeek) * daysPerWeek,
    });
  } else if (occurrence < 1 || occurrence > 5) {
    return null;
  }

  day = addTime(day, { days: jump + daysPerWeek * (occurrence - 1) });
  return (
      utc ? day.getUTCMonth() === input.getUTCMonth() : day.getMonth() === input.getMonth()
    ) ?
      day
    : null;
}
