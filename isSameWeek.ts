import { day, DayOfWeek } from './constants';
import getBeginningOfWeek from './getBeginningOfWeek';

type Options = {
    /** use the UTC timezone */
    UTC?: boolean;
    /** which day to use as the first day of the week */
    firstDayOfWeek?: DayOfWeek
} 

/**
 * Determine if two dates occur in the same week
 * 
 * @param input1 The first date
 * @param input2 The second date
 * @param __namedParameters see {@link Options}
 * @default UTC false
 * @default firstDayOfWeek Sunday
 * @returns true, if the two dates occur in the same week
 */
export function isSameWeek(input1: Date, input2: Date, {UTC = false, firstDayOfWeek = day.sunday}: Options = {}): boolean {
    return getBeginningOfWeek(input1, {UTC, firstDayOfWeek }).getTime() === getBeginningOfWeek(input2, {UTC, firstDayOfWeek }).getTime();
}

export default isSameWeek;
