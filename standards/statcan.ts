/* eslint-disable require-unicode-regexp */
import { removeDiacritics } from '@technobuddha/library';

const DROPPED = /[AEIOUY]/gu;

export function statcan(name: string): string {
  let code = removeDiacritics(name)
    .toUpperCase()
    .replaceAll(/[^A-Z]/gu, '');

  if (code === '') {
    return '';
  }

  // 1-- Keeping the first letter
  // eslint-disable-next-line @typescript-eslint/prefer-destructuring
  const first = code[0];
  code = code.slice(1);

  // 2-- Dropping vowels and Y
  code = code.replaceAll(DROPPED, '');

  // 3-- Dropping consecutive duplicates
  code = code.replaceAll(/(.)\1+/gu, '$1');

  // 4-- Dropping blanks
  code = code.replaceAll(/\s/gu, '');

  // 5-- Limiting code size to 4
  return (first + code).slice(0, 4);
}
