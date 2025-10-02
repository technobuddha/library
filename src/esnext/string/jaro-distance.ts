import { create1dArray } from '../array/create1d-array.ts';

import { type StringLike } from './string-like.ts';
import { toString } from './to-string.ts';

/**
 * Configuration options for the Jaro distance calculation.
 *
 * @group String
 * @category Similarity
 */
export type JaroOptions = {
  /**
   * Whether the comparison should be case-sensitive. Defaults to false.
   */
  caseSensitive?: boolean;
};

/**
 * Calculates the Jaro distance between two strings, which is a measure of similarity.
 * The Jaro distance is a value between 0 and 1, where 1 indicates an exact match.
 *
 * @param text1 - The first string to compare.
 * @param text2 - The second string to compare.
 * @param options - Configuration options for the calculation.
 *   - `caseSensitive`: Whether the comparison should be case-sensitive. Defaults to false.
 * @returns The Jaro distance as a number between 0 and 1.
 *
 * @example
 * ```ts
 * jaroDistance('MARTHA', 'MARHTA'); // 0.9444444444444445
 * jaroDistance('DWAYNE', 'DUANE');  // 0.8222222222222223
 * jaroDistance('DIXON', 'DICKSONX'); // 0.7666666666666666
 * ```
 *
 * @group String
 * @category Similarity
 */
export function jaroDistance(
  text1: StringLike,
  text2: StringLike,
  { caseSensitive = false }: JaroOptions = {},
): number {
  const str1 = caseSensitive ? toString(text1) : toString(text1).toUpperCase();
  const str2 = caseSensitive ? toString(text2) : toString(text2).toUpperCase();

  if (str1.length === 0 || str2.length === 0) {
    return 0;
  }

  if (str1 === str2) {
    return 1;
  }

  let matches = 0;
  const len1: number = str1.length;
  const len2: number = str2.length;

  const window: number = Math.floor(Math.max(len1, len2) / 2) - 1;

  const mark1: boolean[] = create1dArray(len1, false);
  const mark2: boolean[] = create1dArray(len2, false);

  for (let i = 0; i < len1; i++) {
    for (let j = Math.max(0, i - window); j <= Math.min(len2, i + window + 1); j++) {
      if (!mark1[i] && !mark2[j] && str1[i] === str2[j]) {
        ++matches;
        mark1[i] = true;
        mark2[j] = true;
        break;
      }
    }
  }

  if (matches === 0) {
    return 0;
  }

  let transpositions = 0;
  let point = 0;

  for (let i = 0; i < len1; i++) {
    if (mark1[i]) {
      while (!mark2[point]) {
        point++;
      }

      if (str1.at(i) !== str2.at(point++)) {
        transpositions++;
      }
    }
  }

  transpositions /= 2;
  return (matches / len1 + matches / len2 + (matches - transpositions) / matches) / 3;
}
