import isNaN    from 'lodash/isNaN';

/**
 * Add leading zeros to a number to ensure a string of a minimum length
 * 
 * @param input The number to pad
 * @param length The minimum length of the resulting string
 * @returns number as a string with leading zeros as needed
 */
export function padNumber(input: number, length = 2): string
{
    if(isNaN(input) || input === Infinity || input === -Infinity)
        return input.toString().padStart(length, ' ');
    else
        if(input < 0)
            return '-' + Math.abs(input).toString().padStart(length - 1, '0');
        else
            return input.toString().padStart(length, '0');
}

export default padNumber;