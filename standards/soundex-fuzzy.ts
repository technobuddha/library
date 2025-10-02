/* eslint-disable @typescript-eslint/prefer-destructuring */
/* eslint-disable @typescript-eslint/prefer-string-starts-ends-with */
/* eslint-disable require-unicode-regexp */
/* eslint-disable no-secrets/no-secrets */
/**
 * Talisman phonetics/fuzzy-soundex
 * =================================
 *
 * Implementation of the "Fuzzy Soundex" algorithm.
 *
 * [Reference]:
 * http://wayback.archive.org/web/20100629121128/http://www.ir.iit.edu/publications/downloads/IEEESoundexV5.pdf
 *
 */

import { removeDiacritics as deburr } from '@technobuddha/library';

import { squeeze, translation } from './helpers/index.ts';

/**
 * Constants.
 */
const TRANSLATION = translation('ABCDEFGHIJKLMNOPQRSTUVWXYZ', '0193017-07745501769301-7-9');

const SET1 = new Set(['CS', 'CZ', 'TS', 'TZ']);
const SET2 = new Set(['HR', 'WR']);
const SET3 = new Set(['KN', 'NG']);
const SET4 = new Set('HWY');

const RULES: [RegExp, string][] = [
  [/CA/g, 'KA'],
  [/CC/g, 'KK'],
  [/CK/g, 'KK'],
  [/CE/g, 'SE'],
  [/CHL/g, 'KL'],
  [/CL/g, 'KL'],
  [/CHR/g, 'KR'],
  [/CR/g, 'KR'],
  [/CI/g, 'SI'],
  [/CO/g, 'KO'],
  [/CU/g, 'KU'],
  [/CY/g, 'SY'],
  [/DG/g, 'GG'],
  [/GH/g, 'HH'],
  [/MAC/g, 'MK'],
  [/MC/g, 'MK'],
  [/NST/g, 'NSS'],
  [/PF/g, 'FF'],
  [/PH/g, 'FF'],
  [/SCH/g, 'SSS'],
  [/TIO/g, 'SIO'],
  [/TIA/g, 'SIO'],
  [/TCH/g, 'CHH'],
];

export function soundexFuzzy(input: string): string {
  if (!input) {
    return '';
  }

  // Deburring the string & dropping any non-alphabetical character
  let name = deburr(input)
    .toUpperCase()
    .replaceAll(/[^A-Z]/g, '');

  // Applying some substitutions for beginnings
  const firstTwoLetters = name.slice(0, 2);
  const rest = name.slice(2);

  if (SET1.has(firstTwoLetters)) {
    name = `SS${rest}`;
  } else if (firstTwoLetters === 'GN') {
    name = `NN${rest}`;
  } else if (SET2.has(firstTwoLetters)) {
    name = `RR${rest}`;
  } else if (firstTwoLetters === 'HW') {
    name = `WW${rest}`;
  } else if (SET3.has(firstTwoLetters)) {
    name = `NN${rest}`;
  }

  // Applying some substitutions for endings
  const lastTwoLetters = name.slice(-2);
  const initial = name.slice(0, -2);

  switch (lastTwoLetters) {
    case 'CH': {
      name = `${initial}KK`;
      break;
    }
    case 'NT': {
      name = `${initial}TT`;
      break;
    }
    case 'RT': {
      name = `${initial}RR`;
      break;
    }
    default: {
      if (name.slice(-3) === 'RDT') {
        name = `${name.slice(0, -3)}RR`;
      }
    }
  }

  // Applying the rules
  for (let i = 0, l = RULES.length; i < l; i++) {
    name = name.replace(...RULES[i]);
  }

  // Caching the first letter
  const firstLetter = name[0];

  // Translating
  let code = '';
  for (let i = 0, l = name.length; i < l; i++) {
    code += TRANSLATION[name[i]] || name[i];
  }

  // Removing hyphens
  code = code.replaceAll('-', '');

  // Squeezing the code
  code = squeeze(code);

  // Dealing with some initials
  // [[Technobuddha fixed bug where checking code[0] instead of firstLetter]]
  code = SET4.has(firstLetter) ? firstLetter + code : firstLetter + code.slice(1);

  // Dropping vowels
  code = code.replaceAll('0', '');

  return code;
}
