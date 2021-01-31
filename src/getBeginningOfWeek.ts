import type { DayOfWeek } from './constants';
import { daysPerWeek, day } from './constants';
import modulo   from './modulo';

type Options = {
    /** Use the UTC timezone */
    UTC?: boolean;
    /** Which day of the week is considered the beginning */
    firstDayOfWeek?: DayOfWeek;
};

/**
 * Determine the start of the week for a date
 *
 * @param input The date
 * @param __namedParameters see {@link Options}
 * @default UTC false
 * @default firstDayOfWeek Sunday
 * @returns The date value for midnight on the first day of the specified week
 */
export function getBeginningOfWeek(input: Date, { UTC = false, firstDayOfWeek = day.sunday }: Options = {}): Date {
    if(UTC)
        return new Date(Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), input.getUTCDate() - modulo(input.getUTCDay() + daysPerWeek - firstDayOfWeek, daysPerWeek)));

    return new Date(input.getFullYear(), input.getMonth(), input.getDate() - modulo(input.getDay() + daysPerWeek - firstDayOfWeek, daysPerWeek));
}

export default getBeginningOfWeek;
