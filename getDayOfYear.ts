import { ticksPerDay }      from './constants';
import floor                from './floor';
import getBeginningOfYear   from './getBeginningOfYear';

type Options = {
    UTC?: boolean;
}

export function getDayOfYear(input: Date, {UTC = false}: Options = {}): number {
    return floor((input.getTime() - getBeginningOfYear(input, {UTC}).getTime()) / ticksPerDay, {tolerance: 0.05}) + 1;
}

export default getDayOfYear;
