import { type StringLike } from '../string/string-like.ts';
import { empty } from '../unicode/unicode.ts';

import { soundex } from './soundex.ts';

/**
 * Calculate the difference between two strings based on their Soundex codes.
 *
 * Compares the Soundex representations of two strings and returns a numeric
 * score indicating how similar they sound. The algorithm compares various
 * substrings of the Soundex codes to determine phonetic similarity.
 *
 * @param data1 - The first string to compare
 * @param data2 - The second string to compare
 * @returns A similarity score from 0 to 4:
 *   - 0: Not matched (no phonetic similarity)
 *   - 1: Weak match (first letters sound similar)
 *   - 2-3: Moderate match (some phonetic similarity)
 *   - 4: Strong match (identical Soundex codes)
 *
 * @example
 * ```typescript
 * soundexCompare('Smith', 'Smyth'); // Returns 4 (identical Soundex)
 * soundexCompare('John', 'Jon'); // Returns 4 (identical Soundex)
 * soundexCompare('Robert', 'Rupert'); // Returns 2 (moderate similarity)
 * soundexCompare('Hello', 'World'); // Returns 0 (no similarity)
 * ```
 *
 * @group Phonetic
 * @category Soundex
 */
export function soundexCompare(data1: StringLike, data2: StringLike): number {
  let result = 0;

  const soundex1 = soundex(data1);
  const soundex2 = soundex(data2);

  if (soundex1 === empty || soundex2 === empty) {
    return 0;
  }

  if (soundex1 === soundex2) {
    return 4;
  }

  if (soundex1.at(0) === soundex2.at(0)) {
    result = 1;
  }

  const sub1 = soundex1.slice(1, 4); //characters 2, 3, 4
  if (soundex2.includes(sub1)) {
    return result + 3;
  }

  const sub2 = soundex1.slice(2, 4); //characters 3, 4
  if (soundex2.includes(sub2)) {
    return result + 2;
  }

  const sub3 = soundex1.slice(1, 3); //characters 2, 3
  if (soundex2.includes(sub3)) {
    return result + 1;
  }

  const sub4 = soundex1.at(1)!;
  if (soundex2.includes(sub4)) {
    result++;
  }

  const sub5 = soundex1.at(2)!;
  if (soundex2.includes(sub5)) {
    result++;
  }

  const sub6 = soundex1.at(3)!;
  if (soundex2.includes(sub6)) {
    result++;
  }
  return result;
}
