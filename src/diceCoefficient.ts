import { compareStrings } from './compareStrings';

type Options = {
    /** compare the two strings in case insensitive mode */
    caseInsensitive?: boolean;
};

/**
 * Compute the dice coefficient measure of similarity between two strings
 *
 * @param input The first string
 * @param compareTo The second string
 * @param __nameParameters see {@link Options}
 * @return a number from 0 (not similar) to 1 (equal) measuring the similarity
 */
export function diceCoefficient(input: string, compareTo: string, { caseInsensitive = false }: Options = {}): number {
    if(input.length <= 1 || compareTo.length <= 1)
        return compareStrings(input, compareTo, { caseInsensitive }) === 0 ? 1.0 : 0.0;

    const bg0 = biGrams(caseInsensitive ? input.toLowerCase()     : input);
    const bg1 = biGrams(caseInsensitive ? compareTo.toLowerCase() : compareTo);
    let   count = 0;

    for(const bg of bg0) {
        const pos = bg1.indexOf(bg);
        if(pos >= 0) {
            count += 1;
            bg1[pos] = null;
        }
    }

    return count * 2 / (bg0.length + bg1.length);
}

function biGrams(input: string): (string | null)[] {
    const biGram = [] as string[];

    for(let i = 0; i < input.length - 1; ++i)
        biGram.push(input.substr(i, 2));
    return biGram;
}

export default diceCoefficient;
