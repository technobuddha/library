type Options = {
    /** Use the UTC timezone */
    UTC?: boolean;
}

/**
 * Determine the start of the day for a date
 * 
 * @param input The date
 * @param __namedParameters see {@link Options}
 * @default UTC false
 * @returns The date value for midnight on the specified day
 */
export function getBeginningOfDay(input: Date, {UTC = false}: Options = {}): Date {
    if(UTC)
        return new Date(Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), input.getUTCDate()));

    return new Date(input.getFullYear(), input.getMonth(), input.getDate());
}

export default getBeginningOfDay;
