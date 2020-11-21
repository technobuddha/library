import { month } from './constants';

type Options = {
    /** Use the UTC timezone */
    
    UTC?: boolean;
}


/**
 * Determine the last day of the year containing a date
 * 
 * @param input The date
 * @param __namedParameters see {@link Options}
 * @default UTC false
 * @returns Midnight of the last day of the year containing the input date
 */
export function getEndOfYear(input: Date, {UTC = false}: Options = {}): Date {
    if(UTC)
        return new Date(Date.UTC(input.getUTCFullYear(), month.december, 31));
    else
        return new Date(input.getFullYear(), month.december, 31);
}

export default getEndOfYear;
