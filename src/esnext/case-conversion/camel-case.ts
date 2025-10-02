import { removeDiacritics } from '../unicode/remove-diacritics.ts';
import { empty } from '../unicode/unicode.ts';

import { capitalize } from './capitalize.ts';
import { caseTokenizer } from './case-tokenizer.ts';

/**
 * Convert an identifier string to a camel case
 * @param input - The identifier string
 * @returns string in camel case
 * @example
 * ```typescript
 * camelCase('hello world'); // 'helloWorld'
 * camelCase('Hello World'); // 'helloWorld'
 * camelCase('foo_bar-baz'); // 'fooBarBaz'
 * camelCase('FOO BAR'); // 'fooBar'
 * ```
 * @group Case Conversion
 * @category Naming Conventions
 */
export function camelCase(input: string): string {
  const [first, ...rest] = caseTokenizer(removeDiacritics(input));
  return `${first.toLowerCase()}${rest.map((r) => capitalize(r.toLowerCase())).join(empty)}`;
}
