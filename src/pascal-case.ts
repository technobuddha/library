import { capitalize } from './capitalize.ts';
import { empty } from './constants.ts';
import { removeDiacritics } from './remove-diacritics.ts';
import { tokenize } from './tokenize.ts';

/**
 * Convert an identifier string to pascal case
 *
 * @param input - The identifier string
 * @returns the identifier in pascal case
 * @group String
 * @category Case Conversion
 */
export function pascalCase(input: string): string {
  return tokenize(removeDiacritics(input))
    .map((r) => capitalize(r.toLowerCase()))
    .join(empty);
}
