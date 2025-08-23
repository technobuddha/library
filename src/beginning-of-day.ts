/**
 * Options for {@link beginningOfDay}
 *
 * @group Time
 * @category Day
 */
export type BeginningOfDayOptions = {
  /** Use the UTC timezone */
  utc?: boolean;
};

/**
 * Determine the start of the day for a date
 *
 * @param input - The date
 * @param options - see {@link BeginningOfDayOptions}
 * @defaultValue utc false
 * @returns The date value for midnight on the specified day
 * @group Time
 * @category Day
 */
export function beginningOfDay(input: Date, { utc = false }: BeginningOfDayOptions = {}): Date {
  if (utc) {
    return new Date(Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), input.getUTCDate()));
  }

  return new Date(input.getFullYear(), input.getMonth(), input.getDate());
}
