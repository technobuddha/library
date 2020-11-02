import isNumber    from 'lodash/isNumber';

type Options = {
    UTC?: boolean;
}

export function isLeapYear(input: Date | number, {UTC = false}: Options = {}): boolean {
    const year = isNumber(input) ? input : UTC ? input.getUTCFullYear() : input.getFullYear();
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

export default isLeapYear;
