import { day, type DayOfWeek } from './constants.js';
import { getBeginningOfWeek } from './get-beginning-of-week.js';

/**
 * @group Time
 * @category Week
 */
export type IsSameWeekOptions = {
  /** use the utc timezone */
  utc?: boolean;
  /** which day to use as the first day of the week */
  firstDayOfWeek?: DayOfWeek;
};

/**
 * Determine if two dates occur in the same week
 *
 * @param input1 - The first date
 * @param input2 - The second date
 * @param __namedParameters - see {@link IsSameWeekOptions}
 * @defaultValue utc false
 * @returns true, if the two dates occur in the same week
 * @group Time
 * @category Week
 */
export function isSameWeek(
  input1: Date,
  input2: Date,
  { utc = false, firstDayOfWeek = day.sunday }: IsSameWeekOptions = {},
): boolean {
  return (
    getBeginningOfWeek(input1, { utc, firstDayOfWeek }).getTime() ===
    getBeginningOfWeek(input2, { utc, firstDayOfWeek }).getTime()
  );
}
