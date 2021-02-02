import type { DayOfWeek } from './constants';
import { daysPerWeek }    from './constants';
import getBeginningOfMonth           from './getBeginningOfMonth';
import getDaysInMonth                from './getDaysInMonth';
import addTime                       from './addTime';
import modulo                        from './modulo';

type Options = {
    /** Use the UTC timezone */
    UTC?: boolean;
};

/**
 * Determine the date of an occurrence of a weekday within a month
 *
 * @param input A date within the month in question
 * @param dayOfWeek The day of the week to find the occurrence
 * @param occurrence The occurrence number, or 'last' to find the last occurrence
 * @param __namedParameters see {@link Options}
 * @defaultValue UTC false
 * @returns A date object corresponding to the occurrence requested, or null if no such date exists in the month
 */
export function getOccurrenceInMonth(input: Date, dayOfWeek: DayOfWeek, occurrence: number | 'last', { UTC = false }: Options = {}): Date | null {
    let   day  = getBeginningOfMonth(input, { UTC });
    const jump = modulo(dayOfWeek - (UTC ? day.getUTCDay() : day.getDay()), daysPerWeek);
    if(occurrence === 'last')
        return addTime(day, { days: jump + Math.floor((getDaysInMonth(input, { UTC }) - jump - 1) / daysPerWeek) * daysPerWeek });
    else if(occurrence < 1 || occurrence > 5)
        return null;

    day = addTime(day, { days: jump + daysPerWeek * (occurrence - 1) });
    return (UTC ? day.getUTCMonth() === input.getUTCMonth() : day.getMonth() === input.getMonth()) ? day : null;
}

export default getOccurrenceInMonth;
