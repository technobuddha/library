import { capitalize } from './capitalize.ts';
import { removeDiacritics } from './remove-diacritics.ts';
import { tokenize } from './tokenize.ts';
import { empty } from './unicode.ts';

/**
 * Convert an identifier string to a camel case
 * @param input - The identifier string
 * @returns string in camel case
 * @group Programming
 * @category Variables
 * @example
 * ```typescript
 * camelCase('hello world'); // 'helloWorld'
 * camelCase('Hello World'); // 'helloWorld'
 * camelCase('foo_bar-baz'); // 'fooBarBaz'
 * camelCase('FOO BAR'); // 'fooBar'
 * ```
 */
export function camelCase(input: string): string {
  const [first, ...rest] = tokenize(removeDiacritics(input));
  return `${first.toLowerCase()}${rest.map((r) => capitalize(r.toLowerCase())).join(empty)}`;
}
