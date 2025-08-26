import { empty } from './unicode.ts';

const re = /\p{Mn}/gu;

/**
 * Remove all diacritics from a string
 *
 * @param input - The string
 * @returns string with diacritics removed
 * @group Unicode
 * @category Normalization
 */
export function removeDiacritics(input: string): string {
  return input.normalize('NFD').replaceAll(re, empty).normalize('NFC');
}
