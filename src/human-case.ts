import { removeDiacritics } from './remove-diacritics.ts';
import { tokenize } from './tokenize.ts';
import { space } from './unicode.ts';

/**
 * Convert an identifier string to a human case
 * @param input - The identifier string
 * @returns string in human case
 * @group Programming
 * @category Variables
 * @example
 * ```typescript
 * humanCase('helloWorld'); // 'hello world'
 * humanCase('HelloWorld'); // 'hello world'
 * humanCase('foo_bar-baz'); // 'foo bar baz'
 * humanCase('FOO BAR'); // 'foo bar'
 * ```
 */
export function humanCase(input: string): string {
  return tokenize(removeDiacritics(input)).join(space).toLowerCase();
}
