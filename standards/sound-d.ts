/* eslint-disable no-param-reassign */
/* eslint-disable no-secrets/no-secrets */
/* eslint-disable require-unicode-regexp */
// cspell:ignore afrom AEIOUYWHBPFVCSKGJQXZDTLMNR
import { removeDiacritics } from '@technobuddha/library';

function squeeze(target: string): string {
  return target.replaceAll(/(.)\1+/gu, '$1');
}

function translation(from: string, to: string): Record<string, string> {
  const index: Record<string, string> = {};

  const afrom = from.split('');
  const ato = to.split('');

  for (let i = 0, l = from.length; i < l; i++) {
    index[afrom[i]] = ato[i];
  }

  return index;
}

/**
 * Translations.
 */
const TRANSLATIONS = translation('AEIOUYWHBPFVCSKGJQXZDTLMNR', '00000000111122222222334556');

/**
 * Constants.
 */
const INITIALS = new Set(['KN', 'GN', 'PN', 'AC', 'WR']);

/**
 * Helpers.
 */
function pad(code: string): string {
  return `${code}0000`.slice(0, 4);
}

export function soundD(name: string): string {
  name = removeDiacritics(name)
    .toUpperCase()
    .replaceAll(/[^A-Z]/gu, '');

  if (name.length === 0) {
    return '';
  }

  // Handling some initials
  if (INITIALS.has(name.slice(0, 2))) {
    name = name.slice(1);
  } else if (name.startsWith('X')) {
    name = `S${name.slice(1)}`;
  } else if (name.startsWith('WH')) {
    name = `W${name.slice(2)}`;
  }

  // Process the code for the name's tail
  let tail = '';

  for (let i = 0, l = name.length; i < l; i++) {
    const letter = name[i];

    // Handling 'DGE', 'DGI', 'GH'
    if (letter === 'D') {
      if (name[i + 1] === 'G' && (name[i + 2] === 'E' || name[i + 2] === 'I')) {
        tail += '2';
        i += 2;
        continue;
      }
    } else if (letter === 'G' && name[i + 1] === 'H') {
      tail += '0';
      i++;

      continue;
    }

    tail += TRANSLATIONS[letter];
  }

  // Composing the code from the tail
  const code = squeeze(tail).replaceAll('0', '');

  return pad(code);
}
