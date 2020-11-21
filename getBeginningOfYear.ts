import { month }                from './constants';

type Options = {
    /** Use the UTC timezone */
    UTC?: boolean;
};

/**
 * Determine the start of the year for a date
 * 
 * @param input The date
 * @param __namedParameters see {@link Options}
 * @default UTC false
 * @returns The date value for midnight on the first day of the specified year 
 */
export function getBeginningOfYear(input: Date, {UTC = false}: Options = {}): Date {
    if(UTC)
        return new Date(Date.UTC(input.getUTCFullYear(), month.january, 1));
    else
        return new Date(input.getFullYear(), month.january, 1);
}

export default getBeginningOfYear;
