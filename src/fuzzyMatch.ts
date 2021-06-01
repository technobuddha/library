import levenshteinDistance      from './levenshteinDistance';
import diceCoefficient          from './diceCoefficient';
import longestCommonSubstring   from './longestCommonSubstring';

type Options = {
    /** The compairson will ignore case */
    caseInsensitive?: boolean;
    /** Weight of levenshtein distance */
    weightLevenshteinDistance?: number;
    /** Weight of diceCoefficient */
    weightDiceCoefficient?: number;
    /** Weight of longestCommonSubstring */
    weightLongestCommonSubstring?: number;
};

export function fuzzyMatch(
    input: string,
    comparedTo: string,
    {
        caseInsensitive = true,
        weightLevenshteinDistance = 5,
        weightDiceCoefficient = 3,
        weightLongestCommonSubstring = 2,
    }: Options = {}
) {
    const len = Math.max(input.length, comparedTo.length);
    let wgt = 0;
    let sum = 0;

    if(len) {
        if(weightLevenshteinDistance) {
            sum += weightLevenshteinDistance *
                (1.0 - levenshteinDistance(input, comparedTo, { caseInsensitive }) / len);
            wgt += weightLevenshteinDistance;
        }

        if(weightDiceCoefficient) {
            sum += weightDiceCoefficient * (diceCoefficient(input, comparedTo, { caseInsensitive }));
            wgt += weightDiceCoefficient;
        }

        if(weightLongestCommonSubstring) {
            sum += weightLongestCommonSubstring * (longestCommonSubstring(input, comparedTo, { caseInsensitive }).length / len);
            wgt += weightLongestCommonSubstring;
        }
    }

    return wgt === 0 ? 0 : sum / wgt;
}

export default fuzzyMatch;
