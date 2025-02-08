import { empty } from './constants.js';
import { splitWords } from './split-words.js';
import { toASCII } from './to-ascii.js';

/**
 * Approximate the number of syllables in a string
 *
 * @param input - The string
 * @returns the number of syllables
 */
export function syllables(input: string): number {
  return splitWords(toASCII(input.toLocaleLowerCase())).reduce((c, w) => {
    let count = c;
    let word = w;

    if (word.length <= 3) {
      count++;
    } else {
      word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/u, empty).replace(/^y/u, empty);

      const match = word.match(/[aeiouy]{1,2}/gu);
      count += match === null ? 0 : match.length;
    }

    return count;
  }, 0);
}
