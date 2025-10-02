import { deconstructNumber } from '../construction/deconstruct-number.ts';
import { type NumberLike } from '../number/number-like.ts';
import { toNumber } from '../number/to-number.ts';
import { empty, space } from '../unicode/unicode.ts';

import { textualization, type TextualizationOptions } from './textualization.ts';

/**
 * Options for formatting ordinal numbers.
 * @group Number
 * @category Ordinal Numbers
 */
export type OrdinalOptions = {
  /**
   * Output format for the number representation.
   * @defaultValue 'alphabetic'
   */
  output?: 'suffix' | 'numeric' | 'alphabetic' | 'hybrid' | TextualizationOptions['output'];

  /**
   * Text to use for "and" in compound numbers (e.g., "one hundred and one").
   * @defaultValue (empty string)
   */
  and?: TextualizationOptions['and'];

  /**
   * Text to use for hyphens in compound numbers (e.g., "twenty-one").
   * @defaultValue ' ' (space)
   */
  hyphen?: TextualizationOptions['hyphen'];

  /**
   * Tolerance for floating-point comparison when converting decimals to fractions.
   * @defaultValue 0.01
   */
  tolerance?: TextualizationOptions['tolerance'];

  /**
   * Type of denominators to use when expressing fractions.
   * @defaultValue 'common'
   */
  denominators?: TextualizationOptions['denominators'];

  /**
   * Precision for decimal/fraction conversion.
   * @defaultValue 9
   */
  precision?: TextualizationOptions['precision'];

  /**
   * Whether to output ordinal numbers (e.g., "first", "second") instead of cardinal numbers.
   * @defaultValue false
   */
  ordinal?: TextualizationOptions['ordinal'];

  /**
   * Whether to shift the fractional part of the number.
   */
  shift?: TextualizationOptions['shift'];
};

/**
 * Convert a number into an ordinal number string (1st, 2nd, 3rd, etc).
 * @param input - The number to convert
 * @param options - see {@link OrdinalOptions}
 * @example
 * ```typescript
 * ordinal(1); // "first"
 * ordinal(2); // "second"
 * ordinal(3); // "third"
 * ordinal(21); // "twenty first"
 * ordinal(101, { and: ' and ' }); // "one hundred and first"
 * ordinal(2, { output: 'suffix' }); // "nd"
 * ```
 * @group Number
 * @category Ordinal Numbers
 */
export function ordinal(input: NumberLike, options: OrdinalOptions = {}): string {
  const num = toNumber(input);

  if (options.output === 'suffix') {
    if (Number.isNaN(num) || !Number.isFinite(num)) {
      return 'th';
    }

    const { whole } = deconstructNumber(num, Infinity);

    if (whole.value % 10 === 1 && whole.value % 100 !== 11) {
      return 'st';
    } else if (whole.value % 10 === 2 && whole.value % 100 !== 12) {
      return 'nd';
    } else if (whole.value % 10 === 3 && whole.value % 100 !== 13) {
      return 'rd';
    }

    return 'th';
  }

  const numberingOptions: TextualizationOptions = {
    output: {
      integer:
        ((
          options?.output === 'alphabetic' ||
          options?.output === 'numeric' ||
          options?.output === 'hybrid'
        ) ?
          options.output
        : options.output?.integer) ?? 'numeric',
      fraction:
        (options?.output === 'alphabetic' || options?.output === 'numeric' ? options.output
        : options?.output === 'hybrid' ? 'alphabetic'
        : options.output?.fraction) ?? 'numeric',
    },
    and: options?.and ?? empty,
    hyphen: options?.hyphen ?? space,
    tolerance: options?.tolerance ?? 0.01,
    denominators: options?.denominators ?? 'common',
    precision: options?.precision ?? 9,
    ordinal: options?.ordinal ?? true,
    shift: options?.shift ?? false,
  };

  return textualization(input, numberingOptions);
}
