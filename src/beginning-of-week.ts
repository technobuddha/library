import { type DayOfWeek } from './constants.ts';
import { day, daysPerWeek } from './constants.ts';
import { modulo } from './modulo.ts';

/**
 * Options for the {@link beginningOfWeek} function
 *
 * @group Time
 * @category Week
 */
export type BeginningOfWeekOptions = {
  /** Use the utc timezone */
  utc?: boolean;
  /** Which day of the week is considered the beginning */
  firstDayOfWeek?: DayOfWeek;
};

/**
 * Determine the start of the week for a date
 *
 * @param input - The date
 * @param options - see {@link BeginningOfWeekOptions}
 * @defaultValue utc false
 * @returns The date value for midnight on the first day of the specified week
 * @group Time
 * @category Week
 */
export function beginningOfWeek(
  input: Date,
  { utc = false, firstDayOfWeek = day.sunday }: BeginningOfWeekOptions = {},
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
