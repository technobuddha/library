import { isNumber }                         from 'lodash';
import defaults                             from './_defaults';
import { DayOfWeek, daysPerWeek, month }    from './constants';
import modulo                               from './modulo';

type GetWeeksInYearOptions = {
    UTC?: boolean;
    weekOneIncludes?: DayOfWeek
}

export function getWeeksInYear(input: Date | number, {UTC = false, weekOneIncludes = defaults.weekOneIncludes}: GetWeeksInYearOptions = {}): number {
    let year    = isNumber(input) ? input : UTC ? input.getUTCFullYear() : input.getFullYear();
    let dow0    = UTC ? new Date(Date.UTC(year, month.january,   1)).getUTCDay() : new Date(year, month.january,   1).getDay();
    let dow1    = UTC ? new Date(Date.UTC(year, month.december, 31)).getUTCDay() : new Date(year, month.december, 31).getDay();
    let target    = modulo(weekOneIncludes, daysPerWeek);

    return (dow0 === target || dow1 === target) ? 53 : 52;
}

export default getWeeksInYear;
