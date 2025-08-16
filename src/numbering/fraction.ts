import { empty, space } from '../constants.ts';

import { type Numbering, numbering } from './numbering.ts';

/**
 * Options for customizing the output and behavior of fraction number representations.
 *
 * @group Math
 * @category Numbers
 */
export type FractionOptions = {
  /**
   * Output format for the number representation.
   * @defaultValue 'alphabetic'
   */
  output?: 'numeric' | 'alphabetic' | 'hybrid' | Numbering['output'];

  /**
   * Text to use for "and" in compound numbers (e.g., "one hundred and one").
   * @defaultValue '' (empty string)
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
 * Converts a numeric input into a formatted fraction string, either in numeric or alphabetic form.
 *
 * The function finds the closest matching fraction from a predefined list and formats the output
 * based on the specified options. If the input is negative, the result is prefixed accordingly.
 * The output can be either a numeric representation (e.g., "1 1/2") or an alphabetic representation
 * (e.g., "one and one half").
 *
 * @param input - The number to convert to a fraction string.
 * @param options - An optional object specifying the output format.
 * @returns The formatted fraction string.
 *
 * @group Math
 * @category Numbers
 */
export function fraction(input: number, options: FractionOptions = {}): string {
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
    precision: options?.precision ?? 6,
    ordinal: options?.ordinal ?? false,
    shift: options?.shift ?? false,
  };

  return numbering(input, numberingOptions);
}
