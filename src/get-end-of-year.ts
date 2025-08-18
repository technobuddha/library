import { month } from './constants.ts';

/**
 * Options for the {@link getEndOfYear} function
 * @group Time
 * @category Year
 */
export type EndOfYearOptions = {
  /** Use the utc timezone */
  utc?: boolean;
};

/**
 * Determine the last day of the year containing a date
 *
 * @param input - The date
 * @param options - see {@link EndOfYearOptions}
 * @defaultValue utc false
 * @returns Midnight of the last day of the year containing the input date
 * @group Time
 * @category Year
 */
export function getEndOfYear(input: Date, { utc = false }: EndOfYearOptions = {}): Date {
  if (utc) {
    return new Date(Date.UTC(input.getUTCFullYear(), month.december, 31));
  }
  return new Date(input.getFullYear(), month.december, 31);
}
