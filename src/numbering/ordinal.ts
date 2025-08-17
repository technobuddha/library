import { empty, space } from '../constants.ts';
import { deconstructNumber } from '../deconstruct-number.ts';

import { type Numbering, numbering } from './numbering.ts';

/**
 * Options for formatting ordinal numbers.
 *
 * @group Math
 * @category Numbers
 */
export type OrdinalOptions = {
  /**
   * Output format for the number representation.
   * @defaultValue 'alphabetic'
   */
  output?: 'suffix' | 'numeric' | 'alphabetic' | 'hybrid' | Numbering['output'];

  /**
   * Text to use for "and" in compound numbers (e.g., "one hundred and one").
   * @defaultValue (empty string)
   */
  and?: Numbering['and'];

  /**
   * Text to use for hyphens in compound numbers (e.g., "twenty-one").
   * @defaultValue ' ' (space)
   */
  hyphen?: Numbering['hyphen'];

  /**
   * Tolerance for floating-point comparison when converting decimals to fractions.
   * @defaultValue 0.01
   */
  tolerance?: Numbering['tolerance'];

  /**
   * Type of denominators to use when expressing fractions.
   * @defaultValue 'common'
   */
  denominators?: Numbering['denominators'];

  /**
   * Precision for decimal/fraction conversion.
   * @defaultValue 9
   */
  precision?: Numbering['precision'];

  /**
   * Whether to output ordinal numbers (e.g., "first", "second") instead of cardinal numbers.
   * @defaultValue false
   */
  ordinal?: Numbering['ordinal'];

  // TODO [2025-08-15]: desc
  shift?: Numbering['shift'];
};

/**
 * Convert a number into an ordinal number string (1st, 2nd, 3rd, etc).
 * @param input - The number to convert
 *
 * @group Math
 * @category Numbers
 */
export function ordinal(input: number, options: OrdinalOptions = {}): string {
  if (options.output === 'suffix') {
    if (Number.isNaN(input) || !Number.isFinite(input)) {
      return 'th';
    }

    const { whole } = deconstructNumber(input, Infinity);

    if (whole.value % 10 === 1 && whole.value % 100 !== 11) {
      return 'st';
    } else if (whole.value % 10 === 2 && whole.value % 100 !== 12) {
      return 'nd';
    } else if (whole.value % 10 === 3 && whole.value % 100 !== 13) {
      return 'rd';
    }

    return 'th';
  }

  const numberingOptions: Numbering = {
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

  return numbering(input, numberingOptions);
}
