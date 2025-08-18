/**
 * Options for the {@link isMidnight} function
 *
 * @group Time
 * @category Day
 */
export type MidnightOptions = {
  /** Use the utc timezone */
  utc?: boolean;
};

/**
 * Determine if a date is at midnight
 *
 * @param input - A date
 * @param options - see {@link MidnightOptions}
 * @returns true, if the date is at midnight
 * @group Time
 * @category Day
 */
export function isMidnight(input: Date, { utc = false }: MidnightOptions = {}): boolean {
  if (utc) {
    return (
      input.getUTCHours() === 0 &&
      input.getUTCMinutes() === 0 &&
      input.getUTCSeconds() === 0 &&
      input.getUTCMilliseconds() === 0
    );
  }

  return (
    input.getHours() === 0 &&
    input.getMinutes() === 0 &&
    input.getSeconds() === 0 &&
    input.getMilliseconds() === 0
  );
}
