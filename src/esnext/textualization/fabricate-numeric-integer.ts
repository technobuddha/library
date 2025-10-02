import { deconstructNumber } from '../construction/deconstruct-number.ts';
import { empty } from '../unicode/unicode.ts';

import { illion } from './illion.ts';
import { makeOrdinal } from './make-ordinal.ts';
import { type TextualizationOptions } from './textualization.ts';

/**
 * Converts a numeric integer into its formatted string representation with thousands separators.
 *
 * This function takes a numeric value and formats it with commas as thousands separators,
 * optionally converting it to ordinal form (e.g., "1st", "2nd", "3rd"). The output is always
 * in numeric format, not alphabetic (i.e., "1,234" not "one thousand two hundred thirty-four").
 *
 * The function handles:
 * - Thousands separators (commas) for readability
 * - Zero-padding for groups (e.g., "1,002" not "1,2")
 * - Ordinal suffixes when requested
 * - Very large numbers (up to JavaScript's number precision limits)
 * - Negative numbers (processes absolute value)
 * @param input - The numeric integer to be converted. Can be positive, negative, or zero.
 *   Negative values are processed as their absolute value without a sign prefix.
 * @param options - Configuration options for formatting:
 *   - `ordinal`: When `true`, appends ordinal suffix (st, nd, rd, th) to the last group
 *   - `precision`: Number of significant digits to maintain (1-9)
 *   - `shift`: Controls decimal handling (not typically used for integer formatting)
 * @returns The formatted string representation with thousands separators (e.g., "1,234,567").
 *   If `ordinal` is `true`, the last digits will have an ordinal suffix (e.g., "1,234th").
 * @example
 * ```typescript
 * // Basic formatting with thousands separators
 * fabricateNumericInteger(1234, \{ ordinal: false, precision: 9, shift: false \});
 * // "1,234"
 *
 * fabricateNumericInteger(1000000, \{ ordinal: false, precision: 9, shift: false \});
 * // "1,000,000"
 *
 * // With ordinal suffix
 * fabricateNumericInteger(21, \{ ordinal: true, precision: 9, shift: false \});
 * // "21st"
 *
 * fabricateNumericInteger(1234, \{ ordinal: true, precision: 9, shift: false \});
 * // "1,234th"
 *
 * // Zero padding maintained
 * fabricateNumericInteger(1002, \{ ordinal: false, precision: 9, shift: false \});
 * // "1,002"
 * ```
 * @internal
 */
export function fabricateNumericInteger(
  input: number,
  options: Pick<TextualizationOptions, 'ordinal' | 'precision' | 'shift'>,
): string {
  const { ordinal, precision, shift } = options;
  const words: string[] = [];

  let { mantissa, exponent } = deconstructNumber(input, precision);

  let first = true;
  while (exponent >= 0) {
    let quantity: number;

    ({ quantity, mantissa, exponent } = illion(mantissa, exponent, shift));

    if (first) {
      words.push(quantity.toString());
      first = false;
    } else {
      words.push(',', quantity.toString().padStart(3, '0'));
    }
  }

  if (ordinal && words.length > 0) {
    const last = words.length - 1;
    words[last] = makeOrdinal(words[last]);
  }

  return words.join(empty);
}
