import { beginningOfWeek } from './beginning-of-week.ts';
import { day } from './date.ts';
import { type DateOptions } from './date.ts';

/**
 * Determine if two dates occur in the same week
 * @param input1 - The first date
 * @param input2 - The second date
 * @param options - see {@link DateOptions}
 * @defaultValue utc false
 * @returns true, if the two dates occur in the same week
 * @group Time
 * @category Week
 */
export function isSameWeek(
  input1: Date,
  input2: Date,
  { utc = false, firstDayOfWeek = day.sunday }: DateOptions = {},
): boolean {
  return (
    beginningOfWeek(input1, { utc, firstDayOfWeek }).getTime() ===
    beginningOfWeek(input2, { utc, firstDayOfWeek }).getTime()
  );
}
