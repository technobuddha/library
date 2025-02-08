import { removeDiacritics } from './remove-diacritics.ts';
import { tokenize } from './tokenize.ts';

/**
 * Convert an identifier string to a dot form
 *
 * @param input - The identifier string
 * @returns the identifier in dot form
 * @group String
 * @category Case Conversion
 */
export function dotCase(input: string): string {
  return tokenize(removeDiacritics(input)).join('.').toLowerCase();
}
