/**
 * Options for the {@link isLeapYear} function
 * @group Time
 * @category Year
 */
export type LeapYearOptions = {
  /** Use the utc timezone */
  utc?: boolean;
};

/**
 * Determine if a year is a leap year
 * @param input - A date, or a year number
 * @param options - see {@link LeapYearOptions}
 * @returns true, if the specified year is a leap year
 * @group Time
 * @category Year
 */
export function isLeapYear(input: Date | number, { utc = false }: LeapYearOptions = {}): boolean {
  const year =
    typeof input === 'number' ? input
    : utc ? input.getUTCFullYear()
    : input.getFullYear();
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
