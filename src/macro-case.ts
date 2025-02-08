import { removeDiacritics } from './remove-diacritics.ts';
import { tokenize } from './tokenize.ts';

/**
 * Convert an identifier string to macro case
 *
 * @param input - The identifier string
 * @returns the identifier in macro case
 * @group String
 * @category Case Conversion
 */
export function macroCase(input: string): string {
  return tokenize(removeDiacritics(input)).join('_').toUpperCase();
}
