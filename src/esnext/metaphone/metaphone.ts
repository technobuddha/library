import { phonetic } from '../phonetic/phonetic.ts';
import { type StringLike } from '../string/string-like.ts';

import { algorithm as metaphone1 } from './metaphone1.ts';
import { algorithm as doubleMetaphone } from './metaphone2.ts';

/**
 * Computes the Metaphone phonetic encoding for a given string.
 *
 * Uses the original Metaphone algorithm, which returns a single code representing the primary pronunciation of the input.
 *
 * @param input - The input string to encode.
 * @param algorithm - The algorithm version to use ('1').
 * @returns a single phonetic code string.
 *
 * @example
 * ```ts
 * metaphone('Smith', '1'); // 'SM0'
 * metaphone('Smith'); // ['SM0', 'XMT']
 * ```
 */
export function metaphone(input: StringLike, algorithm: '1'): string;
/**
 * Computes the Metaphone phonetic encoding for a given string.
 *
 * Uses the Double Metaphone algorithm, which returns both a primary and an alternate code to account for different pronunciations.
 *
 * @param input - The input string to encode.
 * @param algorithm - The algorithm version to use ('2', or 'double').
 * @returns a tuple of primary and alternate phonetic codes.
 *
 * @example
 * ```ts
 * metaphone('Schmidt', 'double'); // ['XMT', 'SMT']
 * ```
 */
export function metaphone(input: StringLike, algorithm?: '2' | 'double'): [string, string];
/**
 * Computes the Metaphone phonetic encoding for a given string.
 * @group Phonetic
 * @category Metaphone
 */
export function metaphone(
  input: StringLike,
  algorithm: '1' | '2' | 'double' = 'double',
): string | string[] {
  if (algorithm === '1') {
    return phonetic(input, metaphone1);
  }
  return phonetic(input, doubleMetaphone);
}
