import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';

import { lancasterStemmer } from './lancaster.ts';
import { porter } from './porter.ts';
import { sStemmer } from './s-stemmer.ts';

/**
 * Available stemming algorithms for reducing words to their base forms
 *
 * - `'porter'` - Porter stemming algorithm, a widely-used suffix-stripping algorithm
 * - `'lancaster'` - Lancaster (Paice-Husk) stemming algorithm, more aggressive than Porter
 * - `'s'` - Simple S-stemmer, removes plural 's' suffixes
 *
 * @group English
 * @category Stem
 */
export type StemAlgorithms = 'porter' | 'lancaster' | 's';

/**
 * Stem a word to its base form using the specified stemming algorithm.
 * @param input - word to be stemmed
 * @param algorithm - stemming algorithm to use (default: 'porter')
 * @returns stemmed word
 * @throws Error if the specified algorithm is not implemented
 * @group English
 * @category Stem
 */
export function stem(
  input: StringLike,
  algorithm: StemAlgorithms = 'porter',
  lancasterStyle?: 'c' | 'paper',
): string {
  switch (algorithm) {
    case 'lancaster': {
      return lancasterStemmer(toString(input), { style: lancasterStyle });
    }
    case 'porter': {
      return porter(input);
    }
    case 's': {
      return sStemmer(input);
    }
    // no default
  }
}
