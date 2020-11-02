import { DayOfWeek, daysPerWeek }    from './constants';
import getBeginningOfMonth           from './getBeginningOfMonth';
import addTime                       from './addTime';
import modulo                        from './modulo';

type Options = {
    UTC?: boolean;
}

export function getOccuranceInMonth(input: Date, dayOfWeek: DayOfWeek, occurance: number, {UTC = false}: Options = {}): Date | null {
    if(occurance < 1 || occurance > 5)
        return null;
    else {
        let day     = getBeginningOfMonth(input, {UTC});
        let jump    = modulo(dayOfWeek - (UTC? day.getUTCDay() : day.getDay()), daysPerWeek);

        day         = addTime(day, { days: jump + daysPerWeek * (occurance - 1) });

        if(UTC)
            return day.getUTCMonth() === input.getUTCMonth() ? day : null;
        else
            return day.getMonth() === input.getMonth() ? day : null;
    }
 }

export default getOccuranceInMonth;
