import { type MetricUnitsOptions as MetricUnitOptions } from './metric-units.ts';
import { metricUnits } from './metric-units.ts';

/**
 * Options for the {@link binaryUnits} function
 * @group Math
 * @category Verbalization
 */
export type BinaryUnitsOptions = Omit<MetricUnitOptions, 'macro' | 'micro' | 'unit'>;

/**
 * Abbreviate a binary number by adding a suffix for metric units (i.e. 1024 =\> 1KiB)
 * @param input - The number to abbreviate
 * @param options - see {@link BinaryUnitsOptions}
 * @group Math
 * @category Verbalization
 * @example
 * ```typescript
 * binaryUnits(1024); // '1KiB'
 * binaryUnits(1048576); // '1MiB'
 * binaryUnits(1536); // '1.5KiB'
 * binaryUnits(500); // '500B'
 * binaryUnits(0); // '0B'
 * ```
 */
export function binaryUnits(
  input: number,
  { format, pad, precision = 2 }: BinaryUnitsOptions = {},
): string {
  return `${metricUnits(input, {
    format,
    pad,
    macro: ['Ki', 'Mi', 'Gi', 'Ti', 'Pi', 'Ei', 'Zi', 'Yi', 'Ri', 'Qi'],
    micro: [],
    unit: 1024,
    precision,
  })}B`;
}
