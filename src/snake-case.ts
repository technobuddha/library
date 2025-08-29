import { removeDiacritics } from './remove-diacritics.ts';
import { tokenize } from './tokenize.ts';

/**
 * Convert an identifier string to snake case
 * @param input - The identifier string
 * @returns the identifier in snake case
 * @group Programming
 * @category Variables
 * @example
 * ```typescript
 * snakeCase('hello world'); // 'hello_world'
 * snakeCase('HelloWorld'); // 'hello_world'
 * snakeCase('foo_bar-baz'); // 'foo_bar_baz'
 * snakeCase('FOO BAR'); // 'foo_bar'
 * ```
 */
export function snakeCase(input: string): string {
  return tokenize(removeDiacritics(input)).join('_').toLowerCase();
}
