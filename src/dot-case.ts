import { removeDiacritics } from './remove-diacritics.ts';
import { tokenize } from './tokenize.ts';

/**
 * Convert an identifier string to a dot form
 * @param input - The identifier string
 * @returns the identifier in dot form
 * @group Programming
 * @category Variables
 * @example
 * ```typescript
 * dotCase('hello world'); // 'hello.world'
 * dotCase('HelloWorld'); // 'hello.world'
 * dotCase('foo_bar-baz'); // 'foo.bar.baz'
 * dotCase('FOO BAR'); // 'foo.bar'
 * ```
 */
export function dotCase(input: string): string {
  return tokenize(removeDiacritics(input)).join('.').toLowerCase();
}
