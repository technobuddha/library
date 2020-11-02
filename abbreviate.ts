import { empty }                from './constants';
import { formatNumber }         from './formatNumber';
import isNil                    from 'lodash/isNil';
import round                    from 'lodash/round';

type Options = {
    customFormat?: string,
    macro?: ArrayLike<string>,
    micro?: ArrayLike<string>,
    unit?: number,
    precision?: number
}

/**
  * Abbreviate a number by adding a suffix for metric units (i.e. 1000 => 1K, .0001 = 1m)
  * @param    input    The number to abbreviate
  * @param    options
  * {
  *     format: format specification to pass to {.format},
  *     macro:  Array of suffixes to use for large values (default: ['K', 'M', 'B', 'T', 'P', 'E', 'Z', 'Y'])
  *     micro:  Array of suffixed to use for small values (default: ['m', 'µ', 'n', 'p', 'f', 'a', 'z', 'y'])
  *     unit:   Multiplier for each level of suffixes (default: 1000)
  * }
  */
export function abbreviate(
    input: number,
    {   
        customFormat,
        macro = ['K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
        micro = ['m', 'µ', 'n', 'p', 'f', 'a', 'z', 'y'],
        unit = 1000,
        precision = 2,
    }:  Options = {}
):  string
{
    let number  = Math.abs(input);
    let suffix  = empty;
    let index   = 0;

    if(number < 1) {
        while((number - Number.EPSILON) <= 1 / unit && index < micro.length) {
            suffix = micro[index++];
            number = number * unit;
        }
    } else {
        while((number + Number.EPSILON) >= unit && index < macro.length) {
            suffix = macro[index++];
            number = number / unit;
        }
    }

    return (isNil(customFormat) ? round(number, precision).toString() : formatNumber(round(number, precision), customFormat)) + suffix;
}

export default abbreviate;
