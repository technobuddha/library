import { DayOfWeek, day, daysPerWeek }  from './constants';
import modulo                           from './modulo';

type GetDayOfWeekOptions = {
    /** Use the UTC timezone */
    UTC?: boolean;
    /** Which day of the week is considered the beginning */
    startOfWeek?: DayOfWeek;
};

/**
 * Determine the day of the week for a specific date
 * 
 * @param input The date
 * @param __namedParameters see {@link Options}
 * @default UTC false
 * @default startOfWeek Monday
 * @returns The date value for midnight on the first day of the specified year 
 */
export function getDayOfWeek(input: Date, {UTC = false, startOfWeek = day.sunday}: GetDayOfWeekOptions = {}): DayOfWeek {
    if(UTC)
        return modulo(input.getUTCDay() + daysPerWeek - startOfWeek, daysPerWeek) as DayOfWeek;

    return modulo(input.getDay() + daysPerWeek - startOfWeek, daysPerWeek) as DayOfWeek;
}

export default getDayOfWeek;
