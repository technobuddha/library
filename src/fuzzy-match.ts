import { diceCoefficient } from './dice-coefficient.ts';
import { levenshteinDistance } from './levenshtein-distance.ts';
import { longestCommonSubstring } from './longest-common-substring.ts';

/**
 * @group String
 * @category Fuzzy Match
 */
export type FuzzyMatchOptions = {
  /** The compairson will ignore case */
  caseInsensitive?: boolean;
  /** Weight of levenshtein distance */
  weightLevenshteinDistance?: number;
  /** Weight of diceCoefficient */
  weightDiceCoefficient?: number;
  /** Weight of longestCommonSubstring */
  weightLongestCommonSubstring?: number;
};

/**
 * @group String
 * @category Fuzzy Match
 */
export function fuzzyMatch(
  input: string,
  comparedTo: string,
  {
    caseInsensitive = true,
    weightLevenshteinDistance = 5,
    weightDiceCoefficient = 3,
    weightLongestCommonSubstring = 2,
  }: FuzzyMatchOptions = {},
): number {
  const len = Math.max(input.length, comparedTo.length);
  let wgt = 0;
  let sum = 0;

  if (len) {
    if (weightLevenshteinDistance) {
      sum +=
        weightLevenshteinDistance *
        (1.0 - levenshteinDistance(input, comparedTo, { caseInsensitive }) / len);
      wgt += weightLevenshteinDistance;
    }

    if (weightDiceCoefficient) {
      sum += weightDiceCoefficient * diceCoefficient(input, comparedTo, { caseInsensitive });
      wgt += weightDiceCoefficient;
    }

    if (weightLongestCommonSubstring) {
      sum +=
        weightLongestCommonSubstring *
        (longestCommonSubstring(input, comparedTo, { caseInsensitive }).length / len);
      wgt += weightLongestCommonSubstring;
    }
  }

  return wgt === 0 ? 0 : sum / wgt;
}
