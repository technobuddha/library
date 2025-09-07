import { type DateOptions, month } from './date.ts';

/**
 * Determine the start of the year for a date
 * @param input - The date
 * @param options - see {@link DateOptions}
 * @defaultValue utc false
 * @returns The date value for midnight on the first day of the specified year
 * @group Time
 * @category Year
 */
export function beginningOfYear(input: Date, { utc = false }: DateOptions = {}): Date {
  if (utc) {
    return new Date(Date.UTC(input.getUTCFullYear(), month.january, 1));
  }
  return new Date(input.getFullYear(), month.january, 1);
}
