import { ticksPerDay }      from './constants';
import getBeginningOfYear   from './getBeginningOfYear';

type Options = {
    UTC?: boolean;
}

export function getDayOfYear(input: Date, {UTC = false}: Options = {}): number {
    return Math.floor((input.getTime() - getBeginningOfYear(input, {UTC}).getTime()) / ticksPerDay) + 1;
}

export default getDayOfYear;
