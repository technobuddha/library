import { isSameMonth } from './is-same-month.js';

/**
 * @group Time
 * @category Day
 */
export type IsSameDayOptions = {
  /** use the utc timezone */
  utc?: boolean;
};

/**
 * Determine if two dates occur on the same day
 *
 * @param input1 - The first date
 * @param input2 - The second date
 * @param __namedParameters - see {@link IsSameDayOptions}
 * @defaultValue utc false
 * @returns true, if the two dates fall on the same day
 * @group Time
 * @category Day
 */
export function isSameDay(
  input1: Date,
  input2: Date,
  { utc = false }: IsSameDayOptions = {},
): boolean {
  if (utc) {
    return input1.getUTCDate() === input2.getUTCDate() && isSameMonth(input1, input2, { utc });
  }

  return input1.getDate() === input2.getDate() && isSameMonth(input1, input2, { utc });
}
