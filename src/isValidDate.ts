import isNaN from 'lodash/isNaN';

/**
 * Determine if a date is valid
 *
 *
 * @param input The date to check
 * @returns true, if the date is valid
 */
export function isValidDate(input: Date): boolean {
    return !isNaN(input.valueOf());
}

export default isValidDate;
