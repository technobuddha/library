import { formatNumber } from './format-number.ts';
import { round } from './round.ts';
import { empty } from './unicode.ts';

/*
 quetta Q   1000000000000000000000000000000
 ronna  R   1000000000000000000000000000
 yotta  Y   1000000000000000000000000
 zetta  Z   1000000000000000000000
 exa    E   1000000000000000000
 peta   P   1000000000000000
 tera   T   1000000000000
 giga   G   1000000000
 meta   M   1000000
 kilo   k   1000
 hecto  h   100
 deca   da  10
 ----   --  ------------------------------
 deci   d   0.1
 centi  c   0.01
 milli  m   0.001
 micro  µ   0.000001
 nano   n   0.000000001
 pico   p   0.000000000001
 femto  f   0.000000000000001
 atto   a   0.000000000000000001
 zepto  z   0.000000000000000000001
 yocto  y   0.000000000000000000000001
 ronto  r   0.000000000000000000000000001
 quecto q   0.000000000000000000000000000001
*/

/*
 kilo   K   1000            kibi  Ki  1024
 mega   M   1000^2          mebi  Mi  1024^2
 giga   G   1000^3          gibi  Gi  1024^3
 tera   T   1000^4          tebi  Ti  1024^4
 peta   P   1000^5          pebi  Pi  1024^5
 exa    E   1000^6          exbi  Ei  1024^6
 zetta  Z   1000^7          zebi  Zi  1024^7
 yotta  Y   1000^8          yobi  Yi  1024^8
 ronna  R   1000^9          robi  Ri  1024^9
 quetta Q   1000&^10        qeubi Qi  1025^9
*/

/**
 * Options for the {@link metricUnits} function
 *w
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
 * @param input - The number to abbreviate
 * @param options - {@link MetricUnitsOptions}
 * @group String
 * @category Units
 */
export function metricUnits(
  input: number,
  {
    format,
    pad,
    macro = ['K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y', 'R', 'Q'],
    micro = ['m', 'µ', 'n', 'p', 'f', 'a', 'z', 'y', 'r'],
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
    (format == null ?
      round(number, { precision }).toString()
    : formatNumber(round(number, { precision }), format)
    ).padStart(pad ?? 0) + suffix
  );
}
