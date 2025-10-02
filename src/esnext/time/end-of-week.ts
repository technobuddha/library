import { modulo } from '../math/modulo.ts';

import { type DateOptions, day, daysPerWeek } from './constants.ts';

/**
 * Determine the last day of the week containing a date
 * @param input - The date
 * @param options - see {@link DateOptions}
 * @defaultValue utc false
 * @returns Midnight of the last day of the week containing the input date
 * @group Time
 * @category Week
 */
export function endOfWeek(
  input: Date,
  { utc = false, firstDayOfWeek = day.sunday }: DateOptions = {},
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
