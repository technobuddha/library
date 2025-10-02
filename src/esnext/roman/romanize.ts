import { splitChars } from '../tokenization/split-chars.ts';
import { empty } from '../unicode/unicode.ts';

import { valueGlyphs } from './roman-numeral.ts';

/**
 * Options for converting numbers to Roman numerals.
 * @group Number
 * @category Roman Numerals
 */
export type RomanizeOptions = {
  /** Specifies the output format for the Roman numeral. */
  format?: 'standard' | 'apostrophus' | 'vinculum';
};
/**
 * Convert a number into a roman numeral string
 * @param input - The number to turn into a roman numeral
 * @param options - see {@link RomanizeOptions}
 * @returns Converted roman numeral
 * @example
 * ```typescript
 * toRoman(1); // "I"
 * toRoman(4); // "IV"
 * toRoman(9); // "IX"
 * toRoman(2024); // "MMXXIV"
 * toRoman(49, { format: 'apostrophus' }); // "IL"
 * ```
 * @group Number
 * @category Roman Numerals
 */
export function romanize(input: number, { format = 'standard' }: RomanizeOptions = {}): string {
  const vg = valueGlyphs[format];

  if (input < 1 || input > vg.limit || !Number.isInteger(input)) {
    throw new RangeError(`Input must be an integer between 1 and ${vg.limit}`);
  }

  const digits = splitChars(input.toString());
  let roman = empty;
  for (let i = 0; i < vg.glyphs.length && digits.length > 0; ++i) {
    roman = vg.glyphs[i][Number.parseInt(digits.pop()!)] + roman;
  }
  // return lastGlyph.repeat(Number.parseInt(build(digits))) + roman;
  return roman;
}
