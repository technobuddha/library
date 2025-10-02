import { type StringLike } from '../string/string-like.ts';
import { empty } from '../unicode/unicode.ts';

import { createAlgorithm } from './algorithm.ts';
import { phonetic } from './phonetic.ts';

/**
 * The algorithm definition for the Lein phonetic encoding.
 *
 * This object specifies the transformation rules, scan patterns, padding, and code length for the Lein algorithm.
 * It is used internally by the {@link lein} function to generate phonetic codes for input strings.
 *
 * @internal
 */
// prettier-ignore
const algorithm = createAlgorithm({
  keep: { alphabetic: true },
  priorRules: [
    // cspell:disable-next-line
    { r: /\B[AEIOUYWH]/vg, s: empty  },
    { r: /\B(.)\1+/vg,     s: '$1'   },
  ],
  removeDuplicates: 'none',
  scan: [
    { m: 'A', i: 'b', o: 'A' },
    { m: 'B', i: 'b', o: 'B' },
    { m: 'B',         o: '4' },
    { m: 'C', i: 'b', o: 'C' },
    { m: 'C',         o: '5' },
    { m: 'D', i: 'b', o: 'D' },
    { m: 'D',         o: '1' },
    { m: 'E', i: 'b', o: 'E' },
    { m: 'F', i: 'b', o: 'F' },
    { m: 'F',         o: '4' },
    { m: 'G', i: 'b', o: 'G' },
    { m: 'G',         o: '5' },
    { m: 'H', i: 'b', o: 'H' },
    { m: 'I', i: 'b', o: 'I' },
    { m: 'J', i: 'b', o: 'J' },
    { m: 'J',         o: '5' },
    { m: 'K', i: 'b', o: 'K' },
    { m: 'K',         o: '5' },
    { m: 'L', i: 'b', o: 'L' },
    { m: 'L',         o: '3' },
    { m: 'M', i: 'b', o: 'M' },
    { m: 'M',         o: '2' },
    { m: 'N', i: 'b', o: 'N' },
    { m: 'N',         o: '2' },
    { m: 'O', i: 'b', o: 'O' },
    { m: 'P', i: 'b', o: 'P' },
    { m: 'P',         o: '4' },
    { m: 'Q', i: 'b', o: 'Q' },
    { m: 'Q',         o: '5' },
    { m: 'R', i: 'b', o: 'R' },
    { m: 'R',         o: '3' },
    { m: 'S', i: 'b', o: 'S' },
    { m: 'S',         o: '5' },
    { m: 'T', i: 'b', o: 'T' },
    { m: 'T',         o: '1' },
    { m: 'U', i: 'b', o: 'U' },
    { m: 'V', i: 'b', o: 'V' },
    { m: 'V',         o: '4' },
    { m: 'W', i: 'b', o: 'W' },
    { m: 'X', i: 'b', o: 'X' },
    { m: 'X',         o: '5' },
    { m: 'Y', i: 'b', o: 'Y' },
    { m: 'Z', i: 'b', o: 'Z' },
    { m: 'Z',         o: '5' },
  ],
  pad: '0',
  length: 4
});

/**
 * Computes the Lein code (phonetic algorithm) for a given string.
 *
 * The Lein algorithm generates a phonetic representation of words, primarily for matching similar-sounding words in genealogical and linguistic applications.
 *
 * @param text - The input string to encode.
 * @returns The Lein phonetic code for the input string.
 * @example
 * ```ts
 * lein('Smith'); // e.g., 'S530'
 * lein('Schmidt'); // e.g., 'S530'
 * ```
 * @group Phonetic
 * @category Lein
 */
export function lein(text: StringLike): string {
  return phonetic(text, algorithm);
}
