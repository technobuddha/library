import { month } from './constants.ts';

/**
 * Options for the {@link beginningOfYear} function
 *
 * @group Time
 * @category Year
 */
export type BeginningOfYearOptions = {
  /** Use the utc timezone */
  utc?: boolean;
};

/**
 * Determine the start of the year for a date
 *
 * @param input - The date
 * @param options - see {@link BeginningOfYearOptions}
 * @defaultValue utc false
 * @returns The date value for midnight on the first day of the specified year
 * @group Time
 * @category Year
 */
export function beginningOfYear(input: Date, { utc = false }: BeginningOfYearOptions = {}): Date {
  if (utc) {
    return new Date(Date.UTC(input.getUTCFullYear(), month.january, 1));
  }
  return new Date(input.getFullYear(), month.january, 1);
}
