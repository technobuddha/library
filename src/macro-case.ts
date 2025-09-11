import { removeDiacritics } from './remove-diacritics.ts';
import { tokenize } from './tokenize.ts';

/**
 * Convert an identifier string to macro case
 * @param input - The identifier string
 * @returns the identifier in macro case
 * @group Programming
 * @category Variables
 * @example
 * ```typescript
 * macroCase('hello world'); // 'HELLO_WORLD'
 * macroCase('HelloWorld'); // 'HELLO_WORLD'
 * macroCase('foo_bar-baz'); // 'FOO_BAR_BAZ'
 * macroCase('FOO BAR'); // 'FOO_BAR'
 * ```
 */
export function macroCase(input: string): string {
  return tokenize(removeDiacritics(input)).join('_').toUpperCase();
}
