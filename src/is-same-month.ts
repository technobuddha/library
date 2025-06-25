import { isSameYear } from './is-same-year.ts';

/**
 * @group Time
 * @category Month
 */
export type IsSameMonthOptions = {
  /** use the utc timezone */
  utc?: boolean;
};

/**
 * Determine if two dates occur in the same month
 *
 * @param input1 - The first date
 * @param input2 - The second date
 * @param __namedParameters - see {@link IsSameMonthOptions}
 * @defaultValue utc false
 * @returns true, if the two dates occur in the same month
 * @group Time
 * @category Month
 */
export function isSameMonth(
  input1: Date,
  input2: Date,
  { utc = false }: IsSameMonthOptions = {},
): boolean {
  if (utc) {
    return input1.getUTCMonth() === input2.getUTCMonth() && isSameYear(input1, input2, { utc });
  }

  return input1.getMonth() === input2.getMonth() && isSameYear(input1, input2, { utc });
}
