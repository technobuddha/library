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
