import { isNumber } from 'lodash-es';

export type IsLeapYearOptions = {
  /** Use the utc timezone */
  utc?: boolean;
};

/**
 * Determine if a year is a leap year
 *
 * @param input - A date, or a year number
 * @param __namedParameters - see {@link IsLeapYearOptions}
 * @returns true, if the specified year is a leap year
 */
export function isLeapYear(input: Date | number, { utc = false }: IsLeapYearOptions = {}): boolean {
  const year =
    isNumber(input) ? input
    : utc ? input.getUTCFullYear()
    : input.getFullYear();
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
