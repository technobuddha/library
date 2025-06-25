import { month } from './constants.ts';
import { isLeapYear } from './is-leap-year.ts';

/**
 * @group Time
 * @category Month
 */
export type GetDaysInMonthOptions = {
  /** Use the utc timezone */
  utc?: boolean;
};

/**
 * Determine the number of days in the month for a date
 *
 * @param input - The date
 * @param __namedParameters - see {@link GetDaysInMonthOptions}
 * @defaultValue utc false
 * @returns The number of days in the specified month
 * @group Time
 * @category Month
 */
export function getDaysInMonth(input: Date, { utc = false }: GetDaysInMonthOptions = {}): number {
  switch (utc ? input.getUTCMonth() : input.getMonth()) {
    case month.april:
    case month.june:
    case month.september:
    case month.november: {
      return 30;
    }
    case month.february: {
      return isLeapYear(input) ? 29 : 28;
    }
    default: {
      return 31;
    }
  }
}
