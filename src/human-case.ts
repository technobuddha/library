import { removeDiacritics } from './remove-diacritics.ts';
import { tokenize } from './tokenize.ts';
import { space } from './unicode.ts';

/**
 * Convert an identifier string to a human case
 * @param input - The identifier string
 * @returns string in human case
 * @group String
 * @category Case Conversion
 */
export function humanCase(input: string): string {
  return tokenize(removeDiacritics(input)).join(space).toLowerCase();
}
