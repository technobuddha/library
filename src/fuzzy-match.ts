import { diceCoefficient } from './dice-coefficient.ts';
import { levenshteinDistance } from './levenshtein-distance.ts';
import { longestCommonSubstring } from './longest-common-substring.ts';

/**
 * Options for the {@link fuzzyMatch} function
 * @group String
 * @category Fuzzy Match
 */
export type FuzzyMatchOptions = {
  /** The comparison will ignore case */
  caseInsensitive?: boolean;
  /** Weight of levenshtein distance */
  weightLevenshteinDistance?: number;
  /** Weight of diceCoefficient */
  weightDiceCoefficient?: number;
  /** Weight of longestCommonSubstring */
  weightLongestCommonSubstring?: number;
};

/**
 * Computes a fuzzy similarity score between two strings using a weighted combination
 * of Levenshtein distance, Dice coefficient, and longest common substring metrics.
 * @param input - The input string to compare.
 * @param comparedTo - The string to compare against.
 * @param options - Optional configuration for the comparison.
 * @returns A similarity score between 0 and 1, where 1 indicates a perfect match.
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
