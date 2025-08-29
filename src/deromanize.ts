import { lookAhead } from './look-ahead.ts';
import { type Glyph, glyphValues } from './roman-numeral.ts';
import { splitChars } from './split-chars.ts';

/**
 * Parse a roman numeral string into its integer value.
 * @param val - The roman numeral string to parse
 * @returns Parsed roman number
 * @group Math
 * @category Roman Numerals
 */
export function deromanize(val: string): number {
  const values = splitChars(val).map((g) => glyphValues[g as Glyph]);
  if (values.some((g) => g === undefined)) {
    return Number.NaN;
  }

  for (const [thisGlyph, nextGlyph, i] of lookAhead(values)) {
    if (thisGlyph < nextGlyph) {
      values[i] *= -1;
    }
  }

  return values.reduce((total, n) => total + n);
}
