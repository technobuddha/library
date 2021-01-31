import type { DayOfWeek } from './constants';
import { daysPerWeek, day } from './constants';
import modulo                          from './modulo';

type Options = {
    /** Use the UTC timezone */
    UTC?: boolean;
    /** The day that is considered the 'first' day of the week */
    firstDayOfWeek?: DayOfWeek;
};

/**
 * Determine the last day of the week containing a date
 *
 * @param input The date
 * @param __namedParameters see {@link Options}
 * @default UTC false
 * @default firstDayOfWeek Sunday
 * @returns Midnight of the last day of the week containing the input date
 */
export function getEndOfWeek(input: Date, { UTC = false, firstDayOfWeek = day.sunday }: Options = {}): Date {
    if(UTC)
        return new Date(Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), input.getUTCDate() + modulo(daysPerWeek - input.getUTCDay() + firstDayOfWeek - 1, daysPerWeek)));

    return new Date(input.getFullYear(), input.getMonth(), input.getDate() + modulo(daysPerWeek - input.getDay() + firstDayOfWeek - 1, daysPerWeek));
}

export default getEndOfWeek;
