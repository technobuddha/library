import type { DayOfWeek } from './constants';
import { daysPerWeek, month, day }    from './constants';
import { isNumber } from 'lodash';
import modulo       from './modulo';

type GetWeeksInYearOptions = {
    /** Use the UTC timezone */
    UTC?: boolean;
    /** Week 1 is defined as the week with the Gregorian year's first [weekOneInclues] day in it */
    weekOneIncludes?: DayOfWeek;
};

/**
 * Determine the number of ISO weeks within a year
 *
 * @param input A date within the year, or a year number
 * @param __namedParameters see {@link Options}
 * @default weekOneIncludes Thursday
 * @return The number of weeks in the year (52 or 53)
 */
export function getISOWeeksInYear(input: Date | number, { UTC = false, weekOneIncludes = day.thursday }: GetWeeksInYearOptions = {}): number {
    const year   = isNumber(input) ? input : UTC ? input.getUTCFullYear() : input.getFullYear();
    const dow0   = UTC ? new Date(Date.UTC(year, month.january,   1)).getUTCDay() : new Date(year, month.january,   1).getDay();
    const dow1   = UTC ? new Date(Date.UTC(year, month.december, 31)).getUTCDay() : new Date(year, month.december, 31).getDay();
    const target = modulo(weekOneIncludes, daysPerWeek);

    return (dow0 === target || dow1 === target) ? 53 : 52;
}

export default getISOWeeksInYear;
