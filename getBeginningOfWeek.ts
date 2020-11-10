import { daysPerWeek } from './constants';
import defaults        from './_defaults';
import modulo          from './modulo';

type Options = {
    UTC?: boolean;
    firstDayOfWeek?: number;
}

export function getBeginningOfWeek(input: Date, {UTC = false, firstDayOfWeek = defaults.firstDayOfWeek}: Options = {}): Date {
    if(UTC)
        return new Date(Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), input.getUTCDate() - modulo(input.getUTCDay() - firstDayOfWeek, daysPerWeek)));
    return new Date(input.getFullYear(), input.getMonth(), input.getDate() - modulo(input.getDay() - firstDayOfWeek, daysPerWeek));
}

export default getBeginningOfWeek;
