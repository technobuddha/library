import { beginningOfYear } from './beginning-of-year.ts';
import { ticksPerDay } from './constants.ts';
import { floor } from './floor.ts';

/**
 * Options for the {@link dayOfYear} function
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
export function dayOfYear(input: Date, { utc = false }: DayOfYearOptions = {}): number {
  return (
    floor((input.getTime() - beginningOfYear(input, { utc }).getTime()) / ticksPerDay, {
      tolerance: 0.05,
    }) + 1
  );
}
