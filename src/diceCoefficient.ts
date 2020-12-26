import {compareStrings} from './compareStrings';


type Options = {
    /** compare the two strings in case insensitive mode */
    caseInsensitive?: boolean;
}

/**
 * Comput the dice coefficent measure of similarity between two strings
 * 
 * @param input The first string
 * @param compareTo The second string
 * @param __nameParameters see {@link Options}
 * @return a number from 0 (not similar) to 1 (equal) measuring the similarity
 */
export function diceCoefficient(input: string, compareTo: string, {caseInsensitive = false}: Options = {}): number {
    if(input.length <= 1 || compareTo.length <= 1)
        return compareStrings(input, compareTo, { caseInsensitive }) === 0 ? 1.0 : 0.0;

    const bg0 = biGrams(caseInsensitive ? input.toLowerCase()     : input);
    const bg1 = biGrams(caseInsensitive ? compareTo.toLowerCase() : compareTo);
    let   count = 0;

    for(let i = 0; i < bg0.length; ++i) {
        const pos = bg1.indexOf(bg0[i]);
        if(pos >= 0) {
            count += 1;
            bg1[pos] = null;
        }
    }

    return count * 2 / (bg0.length + bg1.length);
}

function biGrams(input: string): (string | null)[] {
    const bigram = [] as string[];

    for(let i = 0; i < input.length - 1; ++i)
        bigram.push(input.substr(i, 2));
    return bigram;
}

export default diceCoefficient;
