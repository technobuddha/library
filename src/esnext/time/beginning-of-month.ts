import { type DateOptions } from './constants.ts';

/**
 * Determine the start of the month for a dateDetermine the start of the month for a date
 * @param input - The date
 * @param options - see {@link DateOptions}
 * @defaultValue utc false
 * @returns The date value for midnight on the first day of the specified month
 * @group Time
 * @category Month
 */
export function beginningOfMonth(input: Date, { utc = false }: DateOptions = {}): Date {
  if (utc) {
    return new Date(Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), 1));
  }

  return new Date(input.getFullYear(), input.getMonth(), 1);
}
