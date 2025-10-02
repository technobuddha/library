import { removeDiacritics } from '../unicode/remove-diacritics.ts';

import { caseTokenizer } from './case-tokenizer.ts';

/**
 * Convert an identifier string to a kebab-case form
 * @param input - The identifier string
 * @returns the identifier in kebab-case form
 * @example
 * ```typescript
 * kebabCase('hello world'); // 'hello-world'
 * kebabCase('HelloWorld'); // 'hello-world'
 * kebabCase('foo_bar-baz'); // 'foo-bar-baz'
 * kebabCase('FOO BAR'); // 'foo-bar'
 * ```
 * @group Case Conversion
 * @category Naming Conventions
 */
export function kebabCase(input: string): string {
  return caseTokenizer(removeDiacritics(input)).join('-').toLowerCase();
}
