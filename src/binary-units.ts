import { type MetricUnitsOptions as MetricUnitOptions } from './metric-units.ts';
import { metricUnits } from './metric-units.ts';

/**
 * Options for the {@link binaryUnits} function
 *
 * @group String
 * @category Units
 */
export type BinaryUnitsOptions = Omit<MetricUnitOptions, 'macro' | 'micro' | 'unit'>;

/**
 * Abbreviate a binary number by adding a suffix for metric units (i.e. 1024 =\> 1K)
 * @param input - The number to abbreviate
 * @param options - see {@link BinaryUnitsOptions}
 * @group String
 * @category Units
 */
export function binaryUnits(
  input: number,
  { format, pad, precision = 2 }: BinaryUnitsOptions = {},
): string {
  return `${metricUnits(input, {
    format,
    pad,
    macro: ['Ki', 'Mi', 'Gi', 'Ti', 'Pi', 'Ei', 'Zi', 'Yi'],
    micro: [],
    unit: 1024,
    precision,
  })}B`;
}
