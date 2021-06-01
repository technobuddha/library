import type { DayOfWeek } from './constants';
import { ticksPerWeek, month, day } from './constants';
import floor              from './floor';
import getBeginningOfWeek from './getBeginningOfWeek';
import getISOWeeksInYear  from './getISOWeeksInYear';

type Options = {
    /** Use the UTC timezone */
    UTC?: boolean;
    /** Week 1 is definied as the week with the Gregoriain year's first [weekOneInclues] day in it */
    weekOneIncludes?: DayOfWeek;
    /** The first day of the week */
    firstDayOfWeek?: DayOfWeek;
};

/**
 * Determine the ISO week number for a given date
 *
 * @param input The date
 * @param __namedParameteres see {@link Options}
 * @default weekOneIncludes Thursday
 * @default firstDayOfWeek Monday
 * @returns the week number (1-53)
 */
export function getISOWeekOfYear(input: Date, { UTC = false, weekOneIncludes = day.thursday, firstDayOfWeek  = day.monday }: Options = {}): { year: number; week: number } {
    const bow = getBeginningOfWeek(input, { UTC, firstDayOfWeek });

    const week1 = UTC
        ? getBeginningOfWeek(new Date(Date.UTC(bow.getUTCFullYear(), month.january, weekOneIncludes)), { UTC, firstDayOfWeek })
        : getBeginningOfWeek(new Date(bow.getFullYear(), month.january, weekOneIncludes), { UTC, firstDayOfWeek });

    let   week    = 1 + floor((bow.getTime() - week1.getTime()) / ticksPerWeek, { tolerance: 0.05 });
    let   year    = UTC ? bow.getUTCFullYear() : bow.getFullYear();
    const weeks   = getISOWeeksInYear(year, { UTC, weekOneIncludes });

    if(week > weeks) {
        year += 1;
        week  = 1;
    }

    return { year, week };
}

export default getISOWeekOfYear;
