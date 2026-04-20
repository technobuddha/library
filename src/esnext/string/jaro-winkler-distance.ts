import { jaroDistance, type JaroDistanceOptions } from './jaro-distance.ts';
import { type StringLike } from './string-like.ts';
import { toString } from './to-string.ts';

/**
 * Calculates the Jaro-Winkler distance between two strings, which is an extension of the Jaro distance.
 * The Jaro-Winkler distance gives more favorable ratings to strings that match from the beginning.
 *
 * @param text1 - The first string to compare.
 * @param text2 - The second string to compare.
 * @param options - Configuration options for the calculation.
 * @returns The Jaro-Winkler distance as a number between 0 and 1.
 *
 * @example
 * ```ts
 * jaroWinklerDistance('MARTHA', 'MARHTA'); // 0.9611111111111111
 * jaroWinklerDistance('DWAYNE', 'DUANE');  // 0.84
 * jaroWinklerDistance('DIXON', 'DICKSONX'); // 0.8133333333333332
 * ```
 *
 * @group String
 * @category Similarity
 */
export function jaroWinklerDistance(
  text1: StringLike,
  text2: StringLike,
  options?: JaroDistanceOptions,
): number {
  const str1 = toString(text1);
  const str2 = toString(text2);

  let jaroDist: number = jaroDistance(str1, str2, options);
  let prefix = 0;

  if (jaroDist > 0.7) {
    const minIndex = Math.min(str1.length, str2.length);
    let i = 0;
    while (str1.at(i) === str2.at(i) && i < 4 && i < minIndex) {
      ++prefix;
      i++;
    }

    jaroDist += 0.1 * prefix * (1 - jaroDist);
  }

  return jaroDist;
}
