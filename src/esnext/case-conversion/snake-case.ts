import { removeDiacritics } from '../unicode/remove-diacritics.ts';

import { caseTokenizer } from './case-tokenizer.ts';

/**
 * Convert an identifier string to snake case
 * @param input - The identifier string
 * @returns the identifier in snake case
 * @example
 * ```typescript
 * snakeCase('hello world'); // 'hello_world'
 * snakeCase('HelloWorld'); // 'hello_world'
 * snakeCase('foo_bar-baz'); // 'foo_bar_baz'
 * snakeCase('FOO BAR'); // 'foo_bar'
 * ```
 * @group Case Conversion
 * @category Naming Conventions
 */
export function snakeCase(input: string): string {
  return caseTokenizer(removeDiacritics(input)).join('_').toLowerCase();
}
