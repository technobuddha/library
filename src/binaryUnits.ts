import metricUnits, { Options as MetricUnitOptions } from './metricUnits';

export type Options = Omit<MetricUnitOptions, 'macro' | 'micro' | 'unit'>;

/**
 * Abbreviate a binary number by adding a suffix for metric units (i.e. 1024 => 1K)
 * @param input The number to abbreviate
 * @param __namedParameters see {@link BinaryUnitsOptions}
 * }
 */
export function binaryUnits(input: number, {format, pad, precision = 2}: Options = {}): string {
    return metricUnits(
        input,
        {
            format,
            pad,
            macro: ['Ki', 'Mi', 'Gi', 'Ti', 'Pi', 'Ei', 'Zi', 'Yi'],
            micro: [],
            unit: 1024,
            precision
        }
    ) + 'B';
}

export default binaryUnits;
