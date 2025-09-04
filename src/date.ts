import { type DayOfWeek } from './constants.ts';

/**
 * Options for date functions
 * @group Time
 * @category Date
 */
export type DateOptions = {
  /** Use the UTC timezone */
  utc?: boolean;
  /** Which day of the week is considered the beginning */
  firstDayOfWeek?: DayOfWeek;
};
