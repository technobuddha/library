import isNaN    from 'lodash/isNaN';
import padStart from 'lodash/padStart';

/**
  * Add leading zeros to a number to ensure a string of a minimum length
  * @param input    The number to pad
  * @param length    The minimum length of the resulting string
  */
export function padNumber(input: number, length: number = 2): string
{
    if(isNaN(input) || input === Infinity || input === -Infinity)
        return padStart(input.toString(), length, ' ');
    else
        if(input < 0)
            return '-' + padStart(Math.abs(input).toString(), length - 1, '0');
        else
            return padStart(input.toString(), length, '0');
}

export default padNumber;