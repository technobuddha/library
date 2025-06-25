import { type DayOfWeek } from './constants.ts';
import { day, daysPerWeek } from './constants.ts';
import { modulo } from './modulo.ts';

/**
 * @group Time
 * @category Week
 */
export type GetEndOfWeekOptions = {
  /** Use the utc timezone */
  utc?: boolean;
  /** The day that is considered the 'first' day of the week */
  firstDayOfWeek?: DayOfWeek;
};

/**
 * Determine the last day of the week containing a date
 *
 * @param input - The date
 * @param __namedParameters - see {@link GetEndOfWeekOptions}
 * @defaultValue utc false
 * @returns Midnight of the last day of the week containing the input date
 * @group Time
 * @category Week
 */
export function getEndOfWeek(
  input: Date,
  { utc = false, firstDayOfWeek = day.sunday }: GetEndOfWeekOptions = {},
): Date {
  if (utc) {
    return new Date(
      Date.UTC(
        input.getUTCFullYear(),
        input.getUTCMonth(),
        input.getUTCDate() +
          modulo(daysPerWeek - input.getUTCDay() + firstDayOfWeek - 1, daysPerWeek),
      ),
    );
  }

  return new Date(
    input.getFullYear(),
    input.getMonth(),
    input.getDate() + modulo(daysPerWeek - input.getDay() + firstDayOfWeek - 1, daysPerWeek),
  );
}
