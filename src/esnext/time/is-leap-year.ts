import { type DateOptions } from './constants.ts';

/**
 * Determine if a year is a leap year
 * @param input - A date, or a year number
 * @param options - see {@link DateOptions}
 * @returns true, if the specified year is a leap year
 * @group Time
 * @category Year
 */
export function isLeapYear(input: Date | number, { utc = false }: DateOptions = {}): boolean {
  const year =
    typeof input === 'number' ? input
    : utc ? input.getUTCFullYear()
    : input.getFullYear();
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
