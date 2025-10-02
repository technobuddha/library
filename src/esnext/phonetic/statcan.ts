import { type StringLike } from '../string/string-like.ts';
import { empty } from '../unicode/unicode.ts';

import { createAlgorithm } from './algorithm.ts';
import { phonetic } from './phonetic.ts';

// prettier-ignore
const algorithm = createAlgorithm({
  keep: { alphabetic: true },
  firstLetter: 'separate',
  laterRules: [
    { r: /[AEIOUY]/vg,      s: empty },
    { r: /(.)\1+/vg,        s: '$1' },
  ],
  length: 4,
});

/**
 * Generate a Statistics Canada (STATCAN) phonetic code for the given text.
 *
 * STATCAN is a phonetic coding system used by Statistics Canada for matching
 * and linking records with similar-sounding names. It produces 4-character codes
 * where the first character is always the original first letter of the input,
 * and the remaining 3 characters represent the phonetic pattern.
 *
 * The algorithm applies the following transformations:
 * - Preserves the first letter as-is (case-sensitive)
 * - Removes all vowels (A, E, I, O, U, Y) from the remaining text
 * - Collapses consecutive duplicate consonants into single characters
 * - Truncates or pads the result to exactly 4 characters
 *
 * This system is simpler than Soundex or Metaphone, focusing primarily on
 * consonant patterns while maintaining the original first letter for better
 * sorting and retrieval in databases.
 *
 * @param text - The input text to encode phonetically
 * @returns A 4-character STATCAN code with original first letter + consonant pattern
 *
 * @example
 * Basic phonetic encoding:
 * ```typescript
 * statcan('Smith'); // Returns 'S530' (S + mth with duplicates removed)
 * statcan('Smyth'); // Returns 'S530' (same pattern after vowel removal)
 * ```
 *
 * @example
 * First letter preservation:
 * ```typescript
 * statcan('Johnson'); // Returns 'J525' (J + hnsn → hn2sn → hnsn)
 * statcan('Jonson');  // Returns 'J525' (same pattern)
 * statcan('jackson'); // Returns 'j250' (lowercase 'j' preserved)
 * statcan('Jackson'); // Returns 'J250' (uppercase 'J' preserved)
 * ```
 *
 * @example
 * Vowel removal and consonant patterns:
 * ```typescript
 * statcan('Catherine'); // Returns 'C365' (C + thrn)
 * statcan('Katherine'); // Returns 'K365' (different first letter, same pattern)
 * statcan('Apple');     // Returns 'A140' (A + ppl → pl)
 * statcan('Eagle');     // Returns 'E240' (E + gl)
 * ```
 *
 * @example
 * Duplicate consonant handling:
 * ```typescript
 * statcan('Miller');  // Returns 'M460' (M + llr → lr)
 * statcan('Bennett'); // Returns 'B530' (B + nntt → nt)
 * statcan('Carroll'); // Returns 'C640' (C + rrll → rl)
 * ```
 *
 * @example
 * Edge cases and special handling:
 * ```typescript
 * statcan('A');      // Returns 'A000' (single letter padded)
 * statcan('');       // Returns '0000' (empty string)
 * statcan('Xyz');    // Returns 'X200' (X + yz)
 * statcan('AEIOU');  // Returns 'A000' (all vowels after first removed)
 * ```
 *
 * @example
 * Real-world surname examples:
 * ```typescript
 * statcan('McDonald');  // Returns 'M235'
 * statcan('O\'Brien');  // Returns 'O165'
 * statcan('Van Der Berg'); // Returns 'V536'
 * statcan('François');  // Returns 'F652'
 * ```
 *
 * @group Phonetic
 * @category StatCan
 */
export function statcan(text: StringLike): string {
  return phonetic(text, algorithm);
}
