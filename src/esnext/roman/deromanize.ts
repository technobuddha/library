import { lookAhead } from '../iteration/look-ahead.ts';
import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';
import { splitChars } from '../tokenization/split-chars.ts';

import { glyphValues, type RomanGlyph } from './roman-numeral.ts';

/**
 * Parse a roman numeral string into its integer value.
 * @param val - The roman numeral string to parse
 * @returns Parsed roman number
 * @group Number
 * @category Roman Numerals
 */
export function deromanize(val: StringLike): number {
  const values = splitChars(toString(val)).map((g) => glyphValues[g as RomanGlyph]);
  if (values.some((g) => g === undefined)) {
    return NaN;
  }

  for (const [thisGlyph, nextGlyph, i] of lookAhead(values)) {
    if (thisGlyph < nextGlyph) {
      values[i] *= -1;
    }
  }

  return values.reduce((total, n) => total + n);
}
