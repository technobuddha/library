/**
 * Options for the {@link beginningOfMonth} function
 *
 * @group Time
 * @category Month
 */
export type BeginningOfMonthOptions = {
  /** Use the utc timezone */
  utc?: boolean;
};

/**
 * Determine the start of the month for a dateDetermine the start of the month for a date
 *
 * @param input - The date
 * @param options - see {@link BeginningOfMonthOptions}
 * @defaultValue utc false
 * @returns The date value for midnight on the first day of the specified month
 * @group Time
 * @category Month
 */
export function beginningOfMonth(input: Date, { utc = false }: BeginningOfMonthOptions = {}): Date {
  if (utc) {
    return new Date(Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), 1));
  }

  return new Date(input.getFullYear(), input.getMonth(), 1);
}
