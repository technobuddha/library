import { type DateOptions } from './constants.ts';

/**
 * Determine the end of the day for a date
 * @param input - The date
 * @param options - see {@link DateOptions}
 * @defaultValue utc false
 * @returns The date value for the last millisecond of the specified day
 * @group Time
 * @category Day
 */
export function endOfDay(input: Date, { utc = false }: DateOptions = {}): Date {
  if (utc) {
    return new Date(
      Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), input.getUTCDate(), 23, 59, 59, 999),
    );
  }

  return new Date(input.getFullYear(), input.getMonth(), input.getDate(), 23, 59, 59, 999);
}
