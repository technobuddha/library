import { ticksPerDay } from './constants.js';
import floor from './floor.js';
import getBeginningOfYear from './get-beginning-of-year.js';

type Options = {
  UTC?: boolean;
};

export function getDayOfYear(input: Date, { UTC = false }: Options = {}): number {
  return (
    floor((input.getTime() - getBeginningOfYear(input, { UTC }).getTime()) / ticksPerDay, {
      tolerance: 0.05,
    }) + 1
  );
}

export default getDayOfYear;
