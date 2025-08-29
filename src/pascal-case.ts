import { capitalize } from './capitalize.ts';
import { removeDiacritics } from './remove-diacritics.ts';
import { tokenize } from './tokenize.ts';
import { empty } from './unicode.ts';

/**
 * Convert an identifier string to pascal case
 * @param input - The identifier string
 * @returns the identifier in pascal case
 * @group Programming
 * @category Variables
 * @example
 * ```typescript
 * pascalCase('hello world'); // 'HelloWorld'
 * pascalCase('Hello world'); // 'HelloWorld'
 * pascalCase('foo_bar-baz'); // 'FooBarBaz'
 * pascalCase('FOO BAR'); // 'FooBar'
 * ```
 */
export function pascalCase(input: string): string {
  return tokenize(removeDiacritics(input))
    .map((r) => capitalize(r.toLowerCase()))
    .join(empty);
}
