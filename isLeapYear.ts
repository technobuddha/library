import isNumber    from 'lodash/isNumber';

type Options = {
    /** Use the UTC timezone */
    UTC?: boolean;
}

/**
 * Determine if a year is a leap year
 * 
 * @param input A date, or a year number
 * @param __namedParameters see {@link Options} 
 * @returns true, if the specified year is a leap year
 */
export function isLeapYear(input: Date | number, {UTC = false}: Options = {}): boolean {
    const year = isNumber(input) ? input : UTC ? input.getUTCFullYear() : input.getFullYear();
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

export default isLeapYear;
