import { type DateOptions } from './date.ts';
import { daysInMonth } from './days-in-month.ts';

/**
 * Determine the last day of the month containing the input date
 * @param input - The date
 * @param options - see {@link DateOptions}
 * @defaultValue utc false
 * @returns Midnight on the last day of the month corresponding to the input date
 * @group Time
 * @category Month
 */
export function endOfMonth(input: Date, { utc = false }: DateOptions = {}): Date {
  if (utc) {
    return new Date(
      Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), daysInMonth(input, { utc })),
    );
  }

  return new Date(input.getFullYear(), input.getMonth(), daysInMonth(input, { utc }));
}
