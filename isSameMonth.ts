import isSameYear   from './isSameYear';

type Options = {
    /** use the UTC timezone */
    UTC?: boolean;
}

/**
 * Determine if two dates occur in the same month
 * 
 * @param input1 The first date
 * @param input2 The second date
 * @param __namedParameters see {@link Options}
 * @default UTC false
 * @returns true, if the two dates occur in the same month
 */
export function isSameMonth(input1: Date, input2: Date, {UTC = false}: Options = {}): boolean {
    if(UTC)
        return input1.getUTCMonth() === input2.getUTCMonth() && isSameYear(input1, input2, {UTC});

    return input1.getMonth() === input2.getMonth() && isSameYear(input1, input2, {UTC});
}

export default isSameMonth;
