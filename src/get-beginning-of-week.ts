import { type DayOfWeek } from './constants.js';
import { day, daysPerWeek } from './constants.js';
import { modulo } from './modulo.js';

export type GetBeginningOfWeekOptions = {
  /** Use the utc timezone */
  utc?: boolean;
  /** Which day of the week is considered the beginning */
  firstDayOfWeek?: DayOfWeek;
};

/**
 * Determine the start of the week for a date
 *
 * @param input - The date
 * @param __namedParameters - see {@link GetBeginningOfWeekOptions}
 * @defaultValue utc false
 * @returns The date value for midnight on the first day of the specified week
 */
export function getBeginningOfWeek(
  input: Date,
  { utc = false, firstDayOfWeek = day.sunday }: GetBeginningOfWeekOptions = {},
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
