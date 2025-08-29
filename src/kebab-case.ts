import { removeDiacritics } from './remove-diacritics.ts';
import { tokenize } from './tokenize.ts';

/**
 * Convert an identifier string to a kebab-case form
 * @param input - The identifier string
 * @returns the identifier in kebab-case form
 * @group Programming
 * @category Variables
 * @example
 * ```typescript
 * kebabCase('hello world'); // 'hello-world'
 * kebabCase('HelloWorld'); // 'hello-world'
 * kebabCase('foo_bar-baz'); // 'foo-bar-baz'
 * kebabCase('FOO BAR'); // 'foo-bar'
 * ```
 */
export function kebabCase(input: string): string {
  return tokenize(removeDiacritics(input)).join('-').toLowerCase();
}
