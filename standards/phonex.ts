/* eslint-disable require-unicode-regexp */
/* eslint-disable no-param-reassign */
import { empty, removeDiacritics } from '@technobuddha/library';

const INITIALS: [Set<string>, string][] = [
  [new Set(['A', 'E', 'I', 'O', 'U', 'Y']), 'A'],
  [new Set(['B', 'P']), 'B'],
  [new Set(['V', 'F']), 'F'],
  [new Set(['K', 'Q', 'C']), 'C'],
  [new Set(['J', 'G']), 'G'],
  [new Set(['Z', 'S']), 'S'],
];

const B_SET = new Set(['B', 'P', 'F', 'V']);
const C_SET = new Set(['C', 'S', 'K', 'G', 'J', 'Q', 'X', 'Z']);
const VOWELS_SET = new Set(['A', 'E', 'I', 'O', 'U', 'Y']);

export function phonex(name: string): string {
  // Deburring the string & dropping any non-alphabetical character
  name = removeDiacritics(name)
    .toUpperCase()
    .replaceAll(/[^A-Z]/gu, '');

  if (name.length === 0) {
    return empty;
  }

  // Removing trailing S
  name = name.replace(/S+$/u, '');

  // Substitution of some initials
  const firstTwoLetter = name.slice(0, 2);
  const rest = name.slice(2);

  // eslint-disable-next-line default-case
  switch (firstTwoLetter) {
    case 'KN': {
      name = `N${rest}`;
      break;
    }
    case 'PH': {
      name = `F${rest}`;
      break;
    }
    case 'WR': {
      name = `R${rest}`;
      // No default
      break;
    }
  }

  // Ignoring first H if present
  if (name.startsWith('H')) {
    name = name.slice(1);
  }

  // Encoding first character
  for (let i = 0, l = INITIALS.length; i < l; i++) {
    const [letters, replacement] = INITIALS[i];

    if (letters.has(name[0])) {
      name = replacement + name.slice(1);
      break;
    }
  }

  // eslint-disable-next-line @typescript-eslint/prefer-destructuring
  let code = name[0];
  let last = code;

  for (let i = 1, l = name.length; i < l; i++) {
    const letter = name[i];
    const nextLetter = name[i + 1];

    let encoding = '0';

    if (B_SET.has(letter)) {
      encoding = '1';
    } else if (C_SET.has(letter)) {
      encoding = '2';
    } else {
      // eslint-disable-next-line default-case
      switch (letter) {
        case 'D':
        case 'T': {
          if (nextLetter !== 'C') {
            encoding = '3';
          }

          break;
        }
        case 'L': {
          if (VOWELS_SET.has(nextLetter) || i + 1 === l) {
            encoding = '4';
          }

          break;
        }
        case 'M':
        case 'N': {
          if (nextLetter === 'D' || nextLetter === 'G') {
            name = name.slice(0, i + 1) + letter + name.slice(i + 2);
          }
          encoding = '5';

          break;
        }
        case 'R': {
          if (VOWELS_SET.has(nextLetter) || i + 1 === l) {
            encoding = '6';
          }

          break;
        }
        // No default
      }
    }

    if (encoding !== last && encoding !== '0') {
      code += encoding;
    }

    last = code.slice(-1);
  }

  return code?.padEnd(4, '0').slice(0, 4) ?? '0000';
}
