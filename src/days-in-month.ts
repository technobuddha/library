import { month } from './constants.ts';
import { type DateOptions } from './date.ts';
import { isLeapYear } from './is-leap-year.ts';

/**
 * Determine the number of days in the month for a date
 * @param input - The date
 * @param options - see {@link DateOptions}
 * @defaultValue utc false
 * @returns The number of days in the specified month
 * @group Time
 * @category Month
 */
export function daysInMonth(input: Date, { utc = false }: DateOptions = {}): number {
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
