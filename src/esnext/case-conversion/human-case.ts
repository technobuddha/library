import { removeDiacritics } from '../unicode/remove-diacritics.ts';
import { space } from '../unicode/unicode.ts';

import { caseTokenizer } from './case-tokenizer.ts';

/**
 * Convert an identifier string to a human case
 * @param input - The identifier string
 * @returns string in human case
 * @example
 * ```typescript
 * humanCase('helloWorld'); // 'hello world'
 * humanCase('HelloWorld'); // 'hello world'
 * humanCase('foo_bar-baz'); // 'foo bar baz'
 * humanCase('FOO BAR'); // 'foo bar'
 * ```
 * @group Case Conversion
 * @category Naming Conventions
 */
export function humanCase(input: string): string {
  return caseTokenizer(removeDiacritics(input)).join(space).toLowerCase();
}
