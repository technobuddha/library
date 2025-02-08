export type GetBeginningOfMonthOptions = {
  /** Use the utc timezone */
  utc?: boolean;
};

/**
 * Determine the start of the month for a dateDetermine the start of the month for a date
 *
 * @param input - The date
 * @param __namedParamaters - see {@link GetBeginningOfMonthOptions}
 * @defaultValue utc false
 * @returns The date value for midnight on the first day of the specified month
 */
export function getBeginningOfMonth(
  input: Date,
  { utc = false }: GetBeginningOfMonthOptions = {},
): Date {
  if (utc) {
    return new Date(Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), 1));
  }

  return new Date(input.getFullYear(), input.getMonth(), 1);
}
