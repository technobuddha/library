import { DayOfWeek, daysPerWeek }    from './constants';
import getBeginningOfMonth           from './getBeginningOfMonth';
import getDaysInMonth                from './getDaysInMonth';
import addTime                       from './addTime';
import modulo                        from './modulo';

type Options = {
    UTC?: boolean;
}

export function getOccuranceInMonth(input: Date, dayOfWeek: DayOfWeek, occurance: number | 'last', {UTC = false}: Options = {}): Date | null {
    let   day  = getBeginningOfMonth(input, {UTC});
    const jump = modulo(dayOfWeek - (UTC? day.getUTCDay() : day.getDay()), daysPerWeek);
    if(occurance === 'last') {
        return addTime(day, { days: jump + Math.floor((getDaysInMonth(input, {UTC}) - jump - 1) / daysPerWeek) * daysPerWeek });    
    } else if(occurance < 1 || occurance > 5)
        return null;
    else {
        day = addTime(day, { days: jump + daysPerWeek * (occurance - 1) });
        return (UTC ? day.getUTCMonth() === input.getUTCMonth() : day.getMonth() === input.getMonth()) ? day : null;
    }
 }

export default getOccuranceInMonth;
