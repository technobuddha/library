import { removeDiacritics } from '../unicode/remove-diacritics.ts';

import { caseTokenizer } from './case-tokenizer.ts';

/**
 * Convert an identifier string to a dot form
 * @param input - The identifier string
 * @returns the identifier in dot form
 * @example
 * ```typescript
 * dotCase('hello world'); // 'hello.world'
 * dotCase('HelloWorld'); // 'hello.world'
 * dotCase('foo_bar-baz'); // 'foo.bar.baz'
 * dotCase('FOO BAR'); // 'foo.bar'
 * ```
 * @group Case Conversion
 * @category Naming Conventions
 */
export function dotCase(input: string): string {
  return caseTokenizer(removeDiacritics(input)).join('.').toLowerCase();
}
