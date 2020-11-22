type Options = {
    /** Use the UTC timezone */
    UTC?: boolean;
}

/**
 * Determine the start of the month for a dateDetermine the start of the month for a date
 * 
 * @param input The date
 * @param __namedParamaters see {@link Options}
 * @default UTC false
 * @returns The date value for midnight on the first day of the specified month  
 */
export function getBeginningOfMonth(input: Date, {UTC = false}: Options = {}): Date {
    if(UTC)
        return new Date(Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), 1));

    return new Date(input.getFullYear(), input.getMonth(), 1);
}

export default getBeginningOfMonth;
