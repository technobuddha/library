import { removeDiacritics } from '../unicode/remove-diacritics.ts';

import { caseTokenizer } from './case-tokenizer.ts';

/**
 * Convert an identifier string to macro case
 * @param input - The identifier string
 * @returns the identifier in macro case
 * @example
 * ```typescript
 * macroCase('hello world'); // 'HELLO_WORLD'
 * macroCase('HelloWorld'); // 'HELLO_WORLD'
 * macroCase('foo_bar-baz'); // 'FOO_BAR_BAZ'
 * macroCase('FOO BAR'); // 'FOO_BAR'
 * ```
 * @group Case Conversion
 * @category Naming Conventions
 */
export function macroCase(input: string): string {
  return caseTokenizer(removeDiacritics(input)).join('_').toUpperCase();
}
