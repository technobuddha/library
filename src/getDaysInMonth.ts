import { month }    from './constants';
import isLeapYear   from './isLeapYear';

type Options = {
    /** Use the UTC timezone */
    UTC?: boolean;
}

/**
 * Determine the number of days in the month for a date
 * 
 * @param input The date
 * @param __namedParameters see {@link Options}
 * @default UTC false
 * @returns The number of days in the specified month
 */
export function getDaysInMonth(input: Date, {UTC = false}: Options = {}): number {
    switch(UTC ? input.getUTCMonth() : input.getMonth()) {
        case month.april:
        case month.june:
        case month.september:
        case month.november:
            return 30;
        case month.february:
            return isLeapYear(input) ? 29 : 28;
        default:
            return 31;
    }
}

export default getDaysInMonth;

        