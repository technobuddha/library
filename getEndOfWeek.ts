import defaults                     from './_defaults';
import { daysPerWeek, DayOfWeek }   from './constants';
import modulo                       from './modulo';

type Options = {
    UTC?: boolean;
    firstDayOfWeek?: DayOfWeek;
}

export function getEndOfWeek(input: Date, {UTC = false, firstDayOfWeek = defaults.firstDayOfWeek}: Options = {}): Date {
    if(UTC)
        return new Date(Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), input.getUTCDate() + modulo(daysPerWeek - input.getUTCDay() + firstDayOfWeek - 1, daysPerWeek)));
    else
        return new Date(input.getFullYear(), input.getMonth(), input.getDate() + modulo(daysPerWeek - input.getDay() + firstDayOfWeek - 1, daysPerWeek));
}

export default getEndOfWeek;
