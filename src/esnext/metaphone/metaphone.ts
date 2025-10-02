import { phonetic } from '../phonetic/phonetic.ts';
import { type StringLike } from '../string/string-like.ts';

import { algorithm as metaphone1 } from './metaphone1.ts';
import { algorithm as doubleMetaphone } from './metaphone2.ts';

/**
 * Computes the Metaphone phonetic encoding for a given string.
 *
 * Metaphone is a phonetic algorithm for indexing words by their sound, as pronounced in English.
 * This function supports multiple algorithm versions:
 * - '1': Original Metaphone algorithm
 * - '2' or 'double': Double Metaphone algorithm (returns primary and alternate codes)
 *
 * @param input - The input string to encode.
 * @param algorithm - The algorithm version to use ('1', '2', or 'double').
 * @returns For algorithm '1': a single phonetic code string.
 *          For '2'/'double': a tuple of primary and alternate phonetic codes.
 *
 * @example
 * ```ts
 * metaphone('Smith', '1'); // 'SM0'
 * metaphone('Smith'); // ['SM0', 'XMT']
 * metaphone('Schmidt', 'double'); // ['XMT', 'SMT']
 * ```
 *
 * @group Phonetic
 * @category Metaphone
 */
export function metaphone(input: StringLike, algorithm: '1'): string;
export function metaphone(input: StringLike, algorithm?: '2' | 'double'): [string, string];
export function metaphone(
  input: StringLike,
  algorithm: '1' | '2' | 'double' = 'double',
): string | string[] {
  if (algorithm === '1') {
    return phonetic(input, metaphone1);
  }
  return phonetic(input, doubleMetaphone);
}
