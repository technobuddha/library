import { type StringLike } from '../string/string-like.ts';
import { empty } from '../unicode/unicode.ts';

import { createAlgorithm } from './algorithm.ts';
import { phonetic } from './phonetic.ts';

const VOWELS = ['A', 'E', 'I', 'O', 'U', 'Y'];

// prettier-ignore
const algorithm = createAlgorithm({
  keep: { alphabetic: true },
  priorRules: [
    { r: /S+$/vg,           s: empty },
    { r: /^KN/vg,           s: 'N' },
    { r: /^PH/vg,           s: 'F' },
    { r: /^WR/vg,           s: 'R' },
    { r: /^H/vg,            s: empty },
    { r: /^[EIOUY]/vg,      s: 'A' },
    { r: /^[KQ]/vg,         s: 'C' },
    { r: /^J/vg,            s: 'G' },
    { r: /^P/vg,            s: 'B' },
    { r: /^V/vg,            s: 'F' },
    { r: /^Z/vg,            s: 'S' },
  ],
  prepareRules: [
    { r: /([MN])[DG\s]+/vg, s: '$1'}
  ],
  firstLetter: 'separate',
  removeDuplicates: 'last',
  notFound: 'ignore',
  scan: [
    { m: 'B', o: '1' },
    { m: 'F', o: '1' },
    { m: 'P', o: '1' },
    { m: 'V', o: '1' },
    { m: 'C', o: '2' },
    { m: 'S', o: '2' },
    { m: 'K', o: '2' },
    { m: 'G', o: '2' },
    { m: 'J', o: '2' },
    { m: 'Q', o: '2' },
    { m: 'X', o: '2' },
    { m: 'Z', o: '2' },
    { m: 'D', ṅ: 'C', o: '3' },
    { m: 'D' },
    { m: 'T', ṅ: 'C', o: '3' },
    { m: 'T' },
    { m: 'L', n: VOWELS, o: '4' },
    { m: 'L', i: 'e', o: '4' },
    { m: 'L' },
    { m: 'MD', o: '5' },
    { m: 'MG', o: '5' },
    { m: 'M', o: '5' },
    { m: 'ND', o: '5' },
    { m: 'NG', o: '5' },
    { m: 'N', o: '5' },
    { m: 'R', n: VOWELS, o: '6' },
    { m: 'R', i: 'e', o: '6' },
    { m: 'R' },

  ],
  pad: '0',
  length: 4,
});

/**
 * Generate a phonetic code using the Phonex algorithm.
 *
 * The Phonex algorithm is a phonetic encoding system that converts words into
 * standardized codes representing their phonetic characteristics. It applies
 * a series of transformation rules to normalize similar-sounding letters and
 * letter combinations, making it useful for matching names and words that
 * may be spelled differently but sound similar.
 *
 * The algorithm processes text through multiple stages:
 * 1. Initial transformations to handle common letter patterns
 * 2. Vowel and consonant normalization
 * 3. Removal of silent letters and duplicates
 * 4. Padding to ensure consistent 4-character output
 *
 * @param text - The input string to encode phonetically
 * @returns A 4-character phonetic code consisting of a letter followed by digits.
 *   The first character is typically the first letter of the original word,
 *   followed by digits representing phonetic characteristics.
 *
 * @example
 * ```typescript
 * phonex('Smith'); // Returns 'S530'
 * phonex('Smyth'); // Returns 'S530' (same as Smith - phonetically similar)
 *
 * phonex('Johnson'); // Returns 'G525'
 * phonex('Jonsen'); // Returns 'G525' (similar phonetic pattern)
 *
 * phonex('Catherine'); // Returns 'C365'
 * phonex('Katherine'); // Returns 'C365' (K->C transformation)
 * ```
 *
 * @group Phonetic
 * @category Phonex
 */
export function phonex(text: StringLike): string {
  return phonetic(text, algorithm);
}
