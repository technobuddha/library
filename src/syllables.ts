import { empty }    from './constants';
import toASCII from './toASCII';
import splitWords   from './splitWords';

/**
 * Approximate the number of syllables in a string
 *
 * @param input The string
 * @returns the number of syllables
 */
export function syllables(input: string): number {
    return splitWords(toASCII(input.toLowerCase())).reduce(
        (count, word) => {
            if(word.length <= 3) { count++; } else {
                // cspell:disable
                word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/u, empty).replace(/^y/u, empty);

                const match = word.match(/[aeiouy]{1,2}/ug);
                count += match === null ? 0 : match.length;
                // cspell:enable
            }

            return count;
        },
        0
    );
}

export default syllables;
