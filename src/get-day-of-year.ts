import { ticksPerDay } from './constants.ts';
import { floor } from './floor.ts';
import { getBeginningOfYear } from './get-beginning-of-year.ts';

/**
 * @group Time
 * @category Year
 */
export type GetDayOfYearOptions = {
  utc?: boolean;
};

/**
 * @group Time
 * @category Year
 */
export function getDayOfYear(input: Date, { utc = false }: GetDayOfYearOptions = {}): number {
  return (
    floor((input.getTime() - getBeginningOfYear(input, { utc }).getTime()) / ticksPerDay, {
      tolerance: 0.05,
    }) + 1
  );
}
