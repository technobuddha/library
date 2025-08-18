import { ticksPerDay } from './constants.ts';
import { floor } from './floor.ts';
import { getBeginningOfYear } from './get-beginning-of-year.ts';

/**
 * Options for the {@link getDayOfYear} function
 *
 * @group Time
 * @category Year
 */
export type DayOfYearOptions = {
  utc?: boolean;
};

/**
 * Calculates the day of the year for a given date.
 *
 * @param input - The date for which to calculate the day of the year.
 * @param options - Optional settings.
 * @returns The day of the year as a number (1-based).
 * @group Time
 * @category Year
 */
export function getDayOfYear(input: Date, { utc = false }: DayOfYearOptions = {}): number {
  return (
    floor((input.getTime() - getBeginningOfYear(input, { utc }).getTime()) / ticksPerDay, {
      tolerance: 0.05,
    }) + 1
  );
}
