/**
 * @group Time
 * @category Alteration
 */
export type TimeIncrement = {
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
};

/**
 * Add units of time to a Date
 *
 * @remarks Negative values will subtract from the starting date
 *
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
