/* eslint-disable @typescript-eslint/prefer-destructuring */

import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';

/**
 * S-Stemmer implementation for English words.
 *
 * The S-Stemmer is a simple stemmer that removes plural 's' endings from English words.
 * It is useful for basic text normalization and search applications.
 *
 * @remarks
 * [Reference]:
 * https://citeseerx.ist.psu.edu/viewdoc/download?doi=
 * [Article]:
 * Donna Harman (1991) How effective is suffixing?
 * Journal of the American Society for Information Science (vol. 42 issue 1).
 * @example
 * ```ts
 * import { stem } from '@technobuddha/library';
 *
 * stem('cats', 's'); // 'cat'
 * stem('dog', 's');  // 'dog'
 * ```
 * @internal
 */
export function sStemmer(word: StringLike): string {
  const input = toString(word);
  const length = input.length;

  if (length < 3 || !input.endsWith('s')) {
    return input;
  }

  if (input.endsWith('us') || input.endsWith('ss')) {
    return input;
  }

  // Handle 'ies' -> 'y' (babies -> baby, ponies -> pony)
  if (input.endsWith('ies') && length > 4) {
    return `${input.slice(0, -3)}y`;
  }

  // Do not stem words ending in 'xes', 'ses', 'zes', 'ches', 'shes', 'oes', 'ges', 'tes', 'ees', 'oes', 'ies', 'ves', 'ces', 'pes', 'les', 'mes', 'nes', 'res', 'fes', 'hes', 'kes', 'wes', 'yes'
  const esExceptions = [
    'xes',
    'ses',
    'zes',
    // cspell:disable-next-line
    'ches',
    'shes',
    'oes',
    'ges',
    'tes',
    'ees',
    'ves',
    'ces',
    'pes',
    'les',
    'mes',
    'nes',
    'res',
    'fes',
    'hes',
    'kes',
    'wes',
    'yes',
  ];
  for (const ex of esExceptions) {
    if (input.endsWith(ex)) {
      return input;
    }
  }

  return input.slice(0, -1);
}
