import { addTime } from './add-time.ts';
import { beginningOfMonth } from './beginning-of-month.ts';
import { type DateOptions, type DayOfWeek, daysPerWeek } from './date.ts';
import { daysInMonth } from './days-in-month.ts';
import { modulo } from './modulo.ts';

/**
 * Determine the date of an occurrence of a weekday within a month
 * @param input - A date within the month in question
 * @param dayOfWeek - The day of the week to find the occurrence
 * @param occurrence - The occurrence number, or 'last' to find the last occurrence
 * @param options - see {@link DateOptions}
 * @defaultValue utc false
 * @returns A date object corresponding to the occurrence requested, or null if no such date exists in the month
 * @group Time
 * @category Day
 */
export function occurrenceInMonth(
  input: Date,
  dayOfWeek: DayOfWeek,
  occurrence: number | 'last',
  { utc = false }: DateOptions = {},
): Date | null {
  let day = beginningOfMonth(input, { utc });
  const jump = modulo(dayOfWeek - (utc ? day.getUTCDay() : day.getDay()), daysPerWeek);
  if (occurrence === 'last') {
    return addTime(day, {
      days: jump + Math.floor((daysInMonth(input, { utc }) - jump - 1) / daysPerWeek) * daysPerWeek,
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
