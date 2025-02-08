import { daysInMonth } from './days-in-month.ts';

/**
 * Options for the {@link endOfMonth} function
 *
 * @group Time
 * @category Month
 */
export type EndOfMonthOptions = {
  /** Use the utc timezone */
  utc?: boolean;
};

/**
 * Determine the last day of the month containing the input date
 *
 * @param input - The date
 * @param options - see {@link EndOfMonthOptions}
 * @defaultValue utc false
 * @returns Midnight on the last day of the month corresponding to the input date
 * @group Time
 * @category Month
 */
export function endOfMonth(input: Date, { utc = false }: EndOfMonthOptions = {}): Date {
  if (utc) {
    return new Date(
      Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), daysInMonth(input, { utc })),
    );
  }

  return new Date(input.getFullYear(), input.getMonth(), daysInMonth(input, { utc }));
}
