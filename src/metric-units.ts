import { isNil, round } from 'lodash-es';

import { empty } from './constants.js';
import { formatNumber } from './format-number.js';

/**
 * @group String
 * @category Units
 */
export type MetricUnitsOptions = {
  /**
   * format specification to pass to {@link formatNumber}
   */
  format?: string;
  /**
   * left padding to apply to numeric value
   */
  pad?: number;
  /**
   * Array of suffixes to use for large values (default: ['K', 'M', 'B', 'T', 'P', 'E', 'Z', 'Y'])
   */
  macro?: ArrayLike<string>;
  /**
   * Array of suffixed to use for small values (default: ['m', 'µ', 'n', 'p', 'f', 'a', 'z', 'y'])
   */
  micro?: ArrayLike<string>;
  /**
   * Multiplier for each level of suffixes (default: 1000)
   */
  unit?: number;
  /**
   * Number of digits after the decimal point to display
   */
  precision?: number;
};

/**
 * Abbreviate a number by adding a suffix for metric units (i.e. 1000 =\> 1K, .0001 = 1m)
 *
 * @param input - The number to abbreviate
 * @param __namedParameters - {@link MetricUnitsOptions}
 * @group String
 * @category Units
 */
export function metricUnits(
  input: number,
  {
    format,
    pad,
    macro = ['K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
    micro = ['m', 'µ', 'n', 'p', 'f', 'a', 'z', 'y'],
    unit = 1000,
    precision = 2,
  }: MetricUnitsOptions = {},
): string {
  let number = Math.abs(input);
  let suffix = empty;
  let index = 0;

  if (number < 1) {
    while (number + Number.EPSILON < 1 && index < micro.length) {
      suffix = micro[index++];
      number *= unit;
    }
  } else {
    while (number + Number.EPSILON >= unit && index < macro.length) {
      suffix = macro[index++];
      number /= unit;
    }
  }

  return (
    (isNil(format) ?
      round(number, precision).toString()
    : formatNumber(round(number, precision), format)
    ).padStart(pad ?? 0) + suffix
  );
}
