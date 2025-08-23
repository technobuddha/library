import { removeDiacritics } from './remove-diacritics.ts';
import { tokenize } from './tokenize.ts';

/**
 * Convert an identifier string to underscore case
 *
 * @param input - The identifier string
 * @returns the identifier in underscore case
 * @group String
 * @category Case Conversion
 */
export function snakeCase(input: string): string {
  return tokenize(removeDiacritics(input)).join('_').toLowerCase();
}
