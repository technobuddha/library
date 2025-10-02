import { type StringLike } from '../string/string-like.ts';

import { createAlgorithm } from './algorithm.ts';
import { phonetic } from './phonetic.ts';

const C0 = ['A', 'H', 'K', 'L', 'O', 'Q', 'R', 'U', 'X'];
const C1 = ['A', 'H', 'K', 'O', 'Q', 'U', 'X'];

const SZ = ['S', 'Z'];
const CSZ = ['C', 'S', 'Z'];
const CKQ = ['C', 'K', 'Q'];

/**
 * Cologne phonetic algorithm configuration for encoding German words.
 * The algorithm maps characters to numeric codes based on their phonetic similarity,
 * allowing for sound-based matching of German words and names.
 */
// prettier-ignore
const algorithm = createAlgorithm({
  keep: { alphabetic: true },
  preprocessRules: [
    { r: /[ẞß]/vg, s: 'SS' },
  ],
  scan: [
    { m: 'A',                         o: '0' },
    { m: 'B',                         o: '1' },
    { m: 'C', i: 'b',         n: C0,  o: '4' },
    { m: 'C', i: 'b',                 o: '8' },
    { m: 'C', i: 'e', ṗ: SZ,          o: '4' },
    { m: 'C',         ṗ: SZ,  n: C1,  o: '4' },
    { m: 'C',         ṗ: SZ,          o: '8' },
    { m: 'C',                         o: '8' },
    { m: 'D',                 n: CSZ, o: '8' },
    { m: 'D',                         o: '2' },
    { m: 'E',                         o: '0' },
    { m: 'F',                         o: '3' },
    { m: 'G',                         o: '4' },
    { m: 'H',                                },
    { m: 'I',                         o: '0' },
    { m: 'J',                         o: '0' },
    { m: 'K',                         o: '4' },
    { m: 'L',                         o: '5' },
    { m: 'M',                         o: '6' },
    { m: 'N',                         o: '6' },
    { m: 'O',                         o: '0' },
    { m: 'P',                 n: 'H', o: '3' },
    { m: 'P',                         o: '1' },
    { m: 'Q',                         o: '4' },
    { m: 'R',                         o: '7' },
    { m: 'S',                         o: '8' },
    { m: 'T',                 n: CSZ, o: '8' },
    { m: 'T',                         o: '2' },
    { m: 'U',                         o: '0' },
    { m: 'V',                         o: '3' },
    { m: 'W',                         o: '3' },
    { m: 'X',         ṗ: CKQ,         o: '48' },
    { m: 'X',                         o: '8' },
    { m: 'Y',                         o: '0' },
    { m: 'Z',                         o: '8' },
  ],
  laterRules: [
    { r: /\B0/vg, s: '' },            // remove zeros
  ],
});

/**
 * Encodes a string using the Cologne phonetic algorithm.
 *
 * The Cologne phonetic algorithm is a phonetic algorithm similar to Soundex,
 * specifically designed for the German language. It converts words into a
 * numeric code based on their pronunciation, enabling fuzzy matching of
 * German names and words that sound similar but may be spelled differently.
 *
 * @param input - The string to encode using the Cologne phonetic algorithm
 * @returns The Cologne phonetic code as a string of digits
 *
 * @example
 * ```typescript
 * cologne('Mueller'); // Returns phonetic code for "Mueller"
 * cologne('Müller');  // Returns the same phonetic code
 * cologne('Schmidt'); // Returns phonetic code for "Schmidt"
 * ```
 * @see [Wikipedia](https://en.wikipedia.org/wiki/Cologne_phonetics)
 * @group Phonetic
 * @category Cologne
 */
export function cologne(input: StringLike): string {
  return phonetic(input, algorithm);
}
