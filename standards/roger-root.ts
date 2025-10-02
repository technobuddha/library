// cspell:ignore TSCH
/* eslint-disable require-unicode-regexp */
/* eslint-disable no-param-reassign */

// Borrowed from 'talisman'
// Copyright (c) 2016-2020 Guillaume Plique (Yomguithereal)
// MIT License
// [Converted to TypeScript by Technobuddha 2025]

import { removeDiacritics } from '@technobuddha/library';

const FIRST_LETTER_ENCODING: Record<string, string | [string, string][]> = {
  A: '1',
  B: '09',
  C: [
    ['CE', '00'],
    ['CH', '06'],
    ['CI', '00'],
    ['CY', '00'],
    ['C', '07'],
  ],
  D: [
    ['DG', '07'],
    ['D', '01'],
  ],
  E: '1',
  F: '08',
  G: [
    ['GF', '08'],
    ['GM', '03'],
    ['GN', '02'],
    ['G', '07'],
  ],
  H: '2',
  I: '1',
  J: '3',
  K: [
    ['KN', '02'],
    ['K', '07'],
  ],
  L: '05',
  M: '03',
  N: '02',
  O: '1',
  P: [
    ['PF', '08'],
    ['PH', '08'],
    ['PN', '02'],
    ['P', '09'],
  ],
  Q: '07',
  R: '04',
  S: [
    ['SCH', '06'],
    ['SH', '06'],
    ['S', '00'],
  ],
  T: [
    ['TSCH', '06'],
    ['TSH', '06'],
    ['TS', '00'],
    ['T', '01'],
  ],
  U: '1',
  V: '08',
  W: [
    ['WR', '04'],
    ['W', '4'],
  ],
  X: '07',
  Y: '5',
  Z: '00',
};

const ENCODING: Record<string, string | [string, string][]> = {
  B: '9',
  C: [
    ['CE', '0'],
    ['CH', '6'],
    ['CI', '0'],
    ['CY', '0'],
    ['C', '7'],
  ],
  D: [
    ['DG', '7'],
    ['D', '1'],
  ],
  F: '8',
  G: '7',
  J: '6',
  K: '7',
  L: '5',
  M: '3',
  N: '2',
  P: [
    ['PH', '8'],
    ['P', '9'],
  ],
  Q: '7',
  R: '4',
  S: [
    ['SCH', '6'],
    ['SH', '6'],
    ['S', '0'],
  ],
  T: [
    ['TSCH', '6'],
    ['TSH', '6'],
    ['TS', '0'],
    ['T', '1'],
  ],
  V: '8',
  X: '7',
  Z: '0',
};

function pad(code: string): string {
  return `${code}00000`.slice(0, 5);
}

export function rogerRoot(name: string): string {
  name = removeDiacritics(name)
    .toUpperCase()
    .replaceAll(/[^A-Z]/gu, '');

  if (name === '') {
    return '';
  }

  let code = '';
  let encodedFirstLetter = '';

  for (let i = 0, l = name.length; i < l; i++) {
    const firstIteration = !i;
    const encoding = firstIteration ? FIRST_LETTER_ENCODING : ENCODING;
    const rules = encoding[name[i]];

    if (rules) {
      if (typeof rules === 'string') {
        code += rules;
      } else {
        for (let j = 0, m = rules.length; j < m; j++) {
          const [match, replacement] = rules[j];

          if (name.slice(i, i + match.length) === match) {
            code += replacement;
            i += match.length - 1;
            break;
          }
        }
      }
    } else {
      code += '-';
    }

    if (firstIteration) {
      encodedFirstLetter = code;
    }
  }

  // Squeezing the code
  code = encodedFirstLetter + code.slice(encodedFirstLetter.length).replaceAll(/(.)\1+/gu, '$1');

  return pad(code.replaceAll('-', ''));
}
