

type Options = {
    /** Use the UTC timezone */
    UTC?: boolean;
}

/**
 * Determine if a date is at midnight
 * 
 * @param input A date
 * @param __namedParamaters see {@link Options}
 * @returns true, if the date is at midnight 
 */
export function isMidnight(input: Date, {UTC = false}: Options = {}): boolean {
    if(UTC)
        return input.getUTCHours() === 0 && input.getUTCMinutes() === 0 && input.getUTCSeconds() === 0 && input.getUTCMilliseconds() === 0;
    
    return input.getHours() === 0 && input.getMinutes() === 0 && input.getSeconds() === 0 && input.getMilliseconds() === 0;
}

export default isMidnight;


