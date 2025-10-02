import { removeDiacritics } from '../unicode/remove-diacritics.ts';
import { empty } from '../unicode/unicode.ts';

import { capitalize } from './capitalize.ts';
import { caseTokenizer } from './case-tokenizer.ts';

/**
 * Convert an identifier string to pascal case
 * @param input - The identifier string
 * @returns the identifier in pascal case
 * @example
 * ```typescript
 * pascalCase('hello world'); // 'HelloWorld'
 * pascalCase('Hello world'); // 'HelloWorld'
 * pascalCase('foo_bar-baz'); // 'FooBarBaz'
 * pascalCase('FOO BAR'); // 'FooBar'
 * ```
 * @group Case Conversion
 * @category Naming Conventions
 */
export function pascalCase(input: string): string {
  return caseTokenizer(removeDiacritics(input))
    .map((r) => capitalize(r.toLowerCase()))
    .join(empty);
}
