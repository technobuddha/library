import defaults                        		from './_defaults';
import { DayOfWeek, ticksPerWeek, month }   from './constants';
import getBeginningOfDay            		from './getBeginningOfDay';
import getBeginningOfWeek            		from './getBeginningOfWeek';
import getWeeksInYear                		from './getWeeksInYear';

type Options = {
    UTC?: boolean;
    weekOneIncludes?: DayOfWeek,
    firstDayOfWeek?: DayOfWeek
};

/**
 * 
 * @param input
 * @param weekOneIncludes    Week 01 is defined as the week with the Gregorian year's first [weekOneDay] in it (default Thursday)
 * @param firstDayOfWeek    The first day of the week (default Monday)
 */
export function getWeekOfYear(input: Date, {UTC = false, weekOneIncludes = defaults.weekOneIncludes, firstDayOfWeek  = defaults.firstDayOfWeek}: Options = {}): { year: number, week: number } {
    const bod	= getBeginningOfDay(input, {UTC});
	let week1   = UTC
					? getBeginningOfWeek(new Date(Date.UTC(bod.getUTCFullYear(), month.january, weekOneIncludes)), {UTC, firstDayOfWeek})
					: getBeginningOfWeek(new Date(bod.getFullYear(), month.january, weekOneIncludes), {UTC, firstDayOfWeek});
    let week    = 1 + Math.floor((bod.getTime() - week1.getTime()) / ticksPerWeek);
    let year    = UTC ? bod.getUTCFullYear() : input.getFullYear();

    if(week < 1) {
        year -= 1;
        week += getWeeksInYear(year, {UTC, weekOneIncludes });
    }

    return { year, week };
}

export default getWeekOfYear;
