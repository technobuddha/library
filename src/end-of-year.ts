import { month } from './date.ts';
import { type DateOptions } from './date.ts';

/**
 * Determine the last day of the year containing a date
 * @param input - The date
 * @param options - see {@link DateOptions}
 * @defaultValue utc false
 * @returns Midnight of the last day of the year containing the input date
 * @group Time
 * @category Year
 */
export function endOfYear(input: Date, { utc = false }: DateOptions = {}): Date {
  if (utc) {
    return new Date(Date.UTC(input.getUTCFullYear(), month.december, 31));
  }
  return new Date(input.getFullYear(), month.december, 31);
}
