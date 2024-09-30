import { empty } from './constants';
import splitWords from './split-words';
import toASCII from './to-ascii';

/**
 * Approximate the number of syllables in a string
 *
 * @param input The string
 * @returns the number of syllables
 */
export function syllables(input: string): number {
  return splitWords(toASCII(input.toLowerCase())).reduce((c, w) => {
    let count = c;
    let word = w;

    if (word.length <= 3) {
      count++;
    } else {
      // cspell:disable
      word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/u, empty).replace(/^y/u, empty);

      const match = word.match(/[aeiouy]{1,2}/gu);
      count += match === null ? 0 : match.length;
      // cspell:enable
    }

    return count;
  }, 0);
}

export default syllables;
