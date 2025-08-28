import { removeDiacritics } from './remove-diacritics.ts';
import { tokenize } from './tokenize.ts';

/**
 * Convert an identifier string to a kebab-case form
 * @param input - The identifier string
 * @returns the identifier in kebab-case form
 * @group String
 * @category Case Conversion
 */
export function kebabCase(input: string): string {
  return tokenize(removeDiacritics(input)).join('-').toLowerCase();
}
