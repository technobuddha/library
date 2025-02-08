import { capitalize } from './capitalize.ts';
import { empty } from './constants.ts';
import { removeDiacritics } from './remove-diacritics.ts';
import { tokenize } from './tokenize.ts';

/**
 * Convert an identifier string to a camel case
 *
 * @param input - The identifier string
 * @returns string in camel case
 * @group String
 * @category Case Conversion
 */
export function camelCase(input: string): string {
  const [first, ...rest] = tokenize(removeDiacritics(input));
  return `${first.toLowerCase()}${rest.map((r) => capitalize(r.toLowerCase())).join(empty)}`;
}
