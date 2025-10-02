import { compareStrings } from '../comparison/compare-strings.ts';
import { bigrams } from '../iteration/n-gram.ts';

import { type StringLike } from './string-like.ts';
import { toString } from './to-string.ts';

/**
 * Options for the {@link diceCoefficient} function
 * @group String
 * @category Similarity
 */
export type DiceCoefficientOptions = {
  /** compare the two strings in case insensitive mode */
  caseInsensitive?: boolean;
};

/**
 * Compute the dice coefficient measure of similarity between two strings
 * @param text - The first string
 * @param compare - The second string
 * @param __nameParameters - see {@link DiceCoefficientOptions}
 * @returns a number from 0 (not similar) to 1 (equal) measuring the similarity
 * @group String
 * @category Similarity
 */
export function diceCoefficient(
  text: StringLike,
  compare: string,
  { caseInsensitive = false }: DiceCoefficientOptions = {},
): number {
  const input = toString(text);
  const compareTo = toString(compare);

  if (input.length <= 1 || compareTo.length <= 1) {
    return compareStrings(input, compareTo, { caseInsensitive }) === 0 ? 1.0 : 0.0;
  }

  const bg0 = bigrams(caseInsensitive ? input.toLocaleLowerCase() : input);
  const bg1: (string | null)[] = bigrams(
    caseInsensitive ? compareTo.toLocaleLowerCase() : compareTo,
  );
  let count = 0;

  for (const bg of bg0) {
    const pos = bg1.indexOf(bg);
    if (pos >= 0) {
      count += 1;
      bg1[pos] = null;
    }
  }

  return (count * 2) / (bg0.length + bg1.length);
}
