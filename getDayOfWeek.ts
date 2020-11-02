import { DayOfWeek, day, daysPerWeek }  from './constants';
import modulo                           from './modulo';

type GetDayOfWeekOptions = {
    UTC?: boolean;
    startOfWeek?: DayOfWeek;
};

export function getDayOfWeek(input: Date, {UTC = false, startOfWeek = day.monday}: GetDayOfWeekOptions = {}): DayOfWeek {
    if(UTC)
        return modulo(input.getUTCDay() + daysPerWeek - startOfWeek, daysPerWeek) as DayOfWeek;
    else
        return modulo(input.getDay() + daysPerWeek - startOfWeek, daysPerWeek) + 1 as DayOfWeek;
}

export default getDayOfWeek;
