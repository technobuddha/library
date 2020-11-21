import getDaysInMonth from './getDaysInMonth';

type Options = {
    /** Use the UTC timezone */
    UTC?: boolean;
}

/**
 * Determine the last day of the month containing the input date
 * 
 * @param input The date
 * @param __namedParameters see {@link Options}
 * @default UTC false
 * @returns Midnight on the last day of the month corresponding to the input date
 */
export function getEndOfMonth(input: Date, {UTC = false}: Options = {}): Date {
    if(UTC)
        return new Date(Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), getDaysInMonth(input, {UTC})));

    return new Date(input.getFullYear(), input.getMonth(), getDaysInMonth(input, {UTC}));
}

export default getEndOfMonth;

