import abbreviate from './abbreviate';

type Options = {
    customFormat?: string
    precision?: number
};

/**
  * Abbreviate a binary number by adding a suffix for metric units (i.e. 1024 => 1K)
  * @param    input    The number to abbreviate
  * @param    format:    format specification to pass to {@code _.format},
  * }
  */
export function binary(input: number, {customFormat, precision = 2}: Options = {}): string {
    return abbreviate(
        input,
        {
            customFormat,
            macro: ['Ki', 'Mi', 'Gi', 'Ti', 'Pi', 'Ei', 'Zi', 'Yi'],
            micro: [],
            unit: 1024,
            precision
        }
    ) + 'B';
}

export default binary;
