import { month } from './constants.js';

/**
 * @group Time
 * @category Year
 */
export type GetBeginningOfYearOptions = {
  /** Use the utc timezone */
  utc?: boolean;
};

/**
 * Determine the start of the year for a date
 *
 * @param input - The date
 * @param __namedParameters - see {@link GetBeginningOfYearOptions}
 * @defaultValue utc false
 * @returns The date value for midnight on the first day of the specified year
 * @group Time
 * @category Year
 */
export function getBeginningOfYear(
  input: Date,
  { utc = false }: GetBeginningOfYearOptions = {},
): Date {
  if (utc) {
    return new Date(Date.UTC(input.getUTCFullYear(), month.january, 1));
  }
  return new Date(input.getFullYear(), month.january, 1);
}
