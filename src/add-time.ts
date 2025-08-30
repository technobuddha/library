/**
 * Represents amount of time to use for {@link addTime}
 * @group Time
 * @category Alteration
 */
export type TimeIncrement = {
  /** Number of years to increment. */
  years?: number;
  /** Number of months to increment. */
  months?: number;
  /** Number of days to increment. */
  days?: number;
  /** Number of hours to increment. */
  hours?: number;
  /** Number of minutes to increment. */
  minutes?: number;
  /** Number of seconds to increment. */
  seconds?: number;
  /** Number of milliseconds to increment. */
  milliseconds?: number;
};

/**
 * Add units of time to a Date
 * @remarks Negative values will subtract from the starting date
 * @param input - Starting date
 * @param increment - Amount of time to increment
 * @returns Adjusted date.
 * @group Time
 * @category Alteration
 */
export function addTime(
  input: Date,
  {
    years = 0,
    months = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0,
  }: TimeIncrement = {},
): Date {
  return new Date(
    input.getFullYear() + years,
    input.getMonth() + months,
    input.getDate() + days,
    input.getHours() + hours,
    input.getMinutes() + minutes,
    input.getSeconds() + seconds,
    input.getMilliseconds() + milliseconds,
  );
}
