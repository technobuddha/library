import { type DateOptions } from './constants.ts';

/**
 * Determine the start of the day for a date
 * @param input - The date
 * @param options - see {@link DateOptions}
 * @defaultValue utc false
 * @returns The date value for midnight on the specified day
 * @group Time
 * @category Day
 */
export function beginningOfDay(input: Date, { utc = false }: DateOptions = {}): Date {
  if (utc) {
    return new Date(Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), input.getUTCDate()));
  }

  return new Date(input.getFullYear(), input.getMonth(), input.getDate());
}
