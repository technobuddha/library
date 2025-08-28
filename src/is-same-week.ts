import { beginningOfWeek } from './beginning-of-week.ts';
import { day, type DayOfWeek } from './constants.ts';

/**
 * Options for the {@link isSameWeek} function
 * @group Time
 * @category Week
 */
export type SameWeekOptions = {
  /** use the utc timezone */
  utc?: boolean;
  /** which day to use as the first day of the week */
  firstDayOfWeek?: DayOfWeek;
};

/**
 * Determine if two dates occur in the same week
 * @param input1 - The first date
 * @param input2 - The second date
 * @param options - see {@link SameWeekOptions}
 * @defaultValue utc false
 * @returns true, if the two dates occur in the same week
 * @group Time
 * @category Week
 */
export function isSameWeek(
  input1: Date,
  input2: Date,
  { utc = false, firstDayOfWeek = day.sunday }: SameWeekOptions = {},
): boolean {
  return (
    beginningOfWeek(input1, { utc, firstDayOfWeek }).getTime() ===
    beginningOfWeek(input2, { utc, firstDayOfWeek }).getTime()
  );
}
