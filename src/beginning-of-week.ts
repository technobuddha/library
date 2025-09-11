import { type DateOptions, day, daysPerWeek } from './date.ts';
import { modulo } from './modulo.ts';

/**
 * Determine the start of the week for a date
 * @param input - The date
 * @param options - see {@link DateOptions}
 * @defaultValue utc false
 * @returns The date value for midnight on the first day of the specified week
 * @group Time
 * @category Week
 */
export function beginningOfWeek(
  input: Date,
  { utc = false, firstDayOfWeek = day.sunday }: DateOptions = {},
): Date {
  if (utc) {
    return new Date(
      Date.UTC(
        input.getUTCFullYear(),
        input.getUTCMonth(),
        input.getUTCDate() - modulo(input.getUTCDay() + daysPerWeek - firstDayOfWeek, daysPerWeek),
      ),
    );
  }

  return new Date(
    input.getFullYear(),
    input.getMonth(),
    input.getDate() - modulo(input.getDay() + daysPerWeek - firstDayOfWeek, daysPerWeek),
  );
}
