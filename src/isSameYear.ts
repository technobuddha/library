type Options = {
    /** use the UTC timezone */
    UTC?: boolean;
}

/**
 * Determine if two dates occur in the same year
 * 
 * @param input1 The first date
 * @param input2 The second date
 * @param __namedParameters see {@link Options}
 * @default UTC false
 * @returns true, if the two dates occur in the same year
 */
export function isSameYear(input1: Date, input2: Date, {UTC = false}: Options = {}): boolean {
    if(UTC)
        return input1.getUTCFullYear() === input2.getUTCFullYear();
        
    return input1.getFullYear() === input2.getFullYear();
}

export default isSameYear;