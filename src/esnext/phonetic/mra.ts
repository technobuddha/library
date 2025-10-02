import { type StringLike } from '../string/string-like.ts';
import { empty } from '../unicode/unicode.ts';

import { createAlgorithm } from './algorithm.ts';
import { phonetic } from './phonetic.ts';

/**
 * The algorithm definition for the Match Rating Approach (MRA) phonetic encoding.
 *
 * This object specifies the transformation rules for the MRA algorithm, including vowel removal (except first letter) and reduction of double consonants.
 * It is used internally by the {@link mra} function to generate phonetic codes for input strings.
 *
 * @internal
 */
const algorithm = createAlgorithm({
  keep: { alphabetic: true },
  priorRules: [
    { r: /\B[AEIOU]/gv, s: empty },
    { r: /(.)\1+/gv, s: '$1' },
  ],
});

/**
 * Match Rating Approach (MRA) phonetic algorithm for name comparison.
 *
 * Removes vowels (except first letter), reduces double consonants, and truncates codes to 6 characters.
 * Provides a compare method for similarity scoring.
 *
 * @param input - The string to encode using MRA
 * @returns The MRA phonetic code
 * @example
 * mra('Smith') // returns 'SMTH'
 * mra.compare('Smith', 'Smyth') // returns \{ codex: ['SMTH', 'SMTH'], minimum: 5, similarity: 6, matching: true \}
 * @group Phonetic
 * @category MRA
 */
export function mra(input: StringLike): string {
  const codex = phonetic(input, algorithm);
  const offset = Math.min(3, codex.length - 3);
  return codex.slice(0, 3) + codex.slice(codex.length - offset);
}
