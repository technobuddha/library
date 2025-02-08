import { getDaysInMonth } from './get-days-in-month.js';

export type GetEndOfMonthOptions = {
  /** Use the utc timezone */
  utc?: boolean;
};

/**
 * Determine the last day of the month containing the input date
 *
 * @param input - The date
 * @param __namedParameters - see {@link GetEndOfMonthOptions}
 * @defaultValue utc false
 * @returns Midnight on the last day of the month corresponding to the input date
 */
export function getEndOfMonth(input: Date, { utc = false }: GetEndOfMonthOptions = {}): Date {
  if (utc) {
    return new Date(
      Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), getDaysInMonth(input, { utc })),
    );
  }

  return new Date(input.getFullYear(), input.getMonth(), getDaysInMonth(input, { utc }));
}
