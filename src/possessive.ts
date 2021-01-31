import removeDiacritics from './removeDiacritics';
import matchCase        from './matchCase';

/**
 * Determine the possessive form of a word
 *
 * @param input the word
 * @returns the posessive form of the word
 */
export function possessive(input: string): string {
    const last = removeDiacritics(input[input.length - 1]);

    if(last === 's' || last === 'S')
        return matchCase(`${input}'`, input);
    return matchCase(`${input}'s`, input);
}

export default possessive;
