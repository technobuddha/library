import { ticksPerDay } from './constants.js';
import { floor } from './floor.js';
import { getBeginningOfYear } from './get-beginning-of-year.js';

export type GetDayOfYearOptions = {
  utc?: boolean;
};

export function getDayOfYear(input: Date, { utc = false }: GetDayOfYearOptions = {}): number {
  return (
    floor((input.getTime() - getBeginningOfYear(input, { utc }).getTime()) / ticksPerDay, {
      tolerance: 0.05,
    }) + 1
  );
}
