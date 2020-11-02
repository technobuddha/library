import { DayOfWeek, daysPerWeek }   from './constants';
import getBeginningOfMonth          from './getBeginningOfMonth';
import getDaysInMonth               from './getDaysInMonth';
import addTime                      from './addTime';
import modulo                       from './modulo';

type Options = {
    UTC?: boolean;
}

export function getLastOccuranceInMonth(input: Date, dayOfWeek: DayOfWeek, {UTC = false}: Options = {}): Date {
    let day     = getBeginningOfMonth(input, {UTC});
    let jump    = modulo(dayOfWeek - (UTC ? day.getUTCDay() : day.getDay()), daysPerWeek);

    return addTime(day, { days: jump + Math.floor((getDaysInMonth(input, {UTC}) - jump - 1) / daysPerWeek) * daysPerWeek });
}

export default getLastOccuranceInMonth;
