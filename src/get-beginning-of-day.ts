/**
 * @group Time
 * @category Day
 */
export type GetBeginningOfDayOptions = {
  /** Use the UTC timezone */
  utc?: boolean;
};

/**
 * Determine the start of the day for a date
 *
 * @param input - The date
 * @param __namedParameters - see {@link GetBeginningOfDayOptions}
 * @defaultValue utc false
 * @returns The date value for midnight on the specified day
 * @group Time
 * @category Day
 */
export function getBeginningOfDay(
  input: Date,
  { utc = false }: GetBeginningOfDayOptions = {},
): Date {
  if (utc) {
    return new Date(Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), input.getUTCDate()));
  }

  return new Date(input.getFullYear(), input.getMonth(), input.getDate());
}
