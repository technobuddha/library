import { month } from './constants.js';

export type GetEndOfYearOptions = {
  /** Use the utc timezone */

  utc?: boolean;
};

/**
 * Determine the last day of the year containing a date
 *
 * @param input - The date
 * @param __namedParameters - see {@link GetEndOfYearOptions}
 * @defaultValue utc false
 * @returns Midnight of the last day of the year containing the input date
 */
export function getEndOfYear(input: Date, { utc = false }: GetEndOfYearOptions = {}): Date {
  if (utc) {
    return new Date(Date.UTC(input.getUTCFullYear(), month.december, 31));
  }
  return new Date(input.getFullYear(), month.december, 31);
}
