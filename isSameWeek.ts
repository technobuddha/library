import defaults           from './_defaults';
import { DayOfWeek }      from './constants';
import getBeginningOfWeek from './getBeginningOfWeek';

type Options = {
    UTC?: boolean;
    firstDayOfWeek?: DayOfWeek
} 

export function isSameWeek(input1: Date, input2: Date, {UTC = false, firstDayOfWeek = defaults.firstDayOfWeek}: Options = {}): boolean {
    return getBeginningOfWeek(input1, {UTC, firstDayOfWeek }).getTime() === getBeginningOfWeek(input2, {UTC, firstDayOfWeek }).getTime();
}

export default isSameWeek;
