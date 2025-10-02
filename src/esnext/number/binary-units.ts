import { metricUnits, type MetricUnitsOptions as MetricUnitOptions } from './metric-units.ts';
import { type NumberLike } from './number-like.ts';
import { toNumber } from './to-number.ts';

/**
 * Options for the {@link binaryUnits} function
 * @group Number
 * @category Formatting
 */
export type BinaryUnitsOptions = Omit<MetricUnitOptions, 'macro' | 'micro' | 'unit'>;

/**
 * Abbreviate a binary number by adding a suffix for metric units (i.e. 1024 =\> 1KiB)
 * @param input - The number to abbreviate
 * @param options - see {@link BinaryUnitsOptions}
 * @example
 * ```typescript
 * binaryUnits(1024); // '1KiB'
 * binaryUnits(1048576); // '1MiB'
 * binaryUnits(1536); // '1.5KiB'
 * binaryUnits(500); // '500B'
 * binaryUnits(0); // '0B'
 * ```
 * @group Number
 * @category Formatting
 */
export function binaryUnits(
  input: NumberLike,
  { format, pad, precision = 2 }: BinaryUnitsOptions = {},
): string {
  const value = toNumber(input);

  return `${metricUnits(value, {
    format,
    pad,
    macro: ['Ki', 'Mi', 'Gi', 'Ti', 'Pi', 'Ei', 'Zi', 'Yi', 'Ri', 'Qi'],
    micro: [],
    unit: 1024,
    precision,
  })}B`;
}
