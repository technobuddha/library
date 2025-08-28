import { type Numbering, numbering } from './numbering/numbering.ts';
import { empty, space } from './unicode.ts';

/**
 * Configuration options for cardinal number conversion.
 * @group Math
 * @category Numbers
 */
export type CardinalOptions = {
  /**
   * Output format for the number representation.
   * @defaultValue 'alphabetic'
   */
  output?: 'numeric' | 'alphabetic' | 'hybrid' | Numbering['output'];

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

  /**
   * Whether to shift the fractional part of the number.
   */
  shift?: Numbering['shift'];
};

/**
 * Convert a number into text (the cardinal number)
 * @remarks There is no limit to the numbers that can be expressed, however Javascript/Typescript can only represent numbers
 * up to uncentillions (1e308).
 * @param input - The number
 * @param options - see {@link CardinalOptions}
 * @returns The number spelled out
 * @example
 * ```typescript
 * cardinal(123); // "one hundred twenty three"
 * cardinal(123, { hyphen: '-' }); // "one hundred twenty-three"
 * cardinal(42.5, { output: 'alphabetic' }); // "forty two and one half"
 * cardinal(101, { and: ' and ' }); // "one hundred and one"
 * cardinal(3.14159, { precision: 2 }); // "three and fourteen hundredths"
 * ```
 * @group Math
 * @category Numbers
 */
export function cardinal(input: number, options: CardinalOptions = {}): string {
  const numberingOptions: Numbering = {
    output: {
      integer:
        ((
          options?.output === 'alphabetic' ||
          options?.output === 'numeric' ||
          options?.output === 'hybrid'
        ) ?
          options.output
        : options.output?.integer) ?? 'alphabetic',
      fraction:
        (options?.output === 'alphabetic' || options?.output === 'numeric' ? options.output
        : options?.output === 'hybrid' ? 'alphabetic'
        : options.output?.fraction) ?? 'alphabetic',
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
