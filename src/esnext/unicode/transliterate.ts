import { romanization } from '../@data/romanization.ts';
import { build } from '../string/build.ts';
import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';
import { splitChars } from '../tokenization/split-chars.ts';

import { empty } from './unicode.ts';

/**
 * Convert a string to its transliterated (Latin alphabet) representation.
 * This function maps Unicode characters from various scripts to their corresponding
 * Latin alphabet equivalents. Characters without a transliteration mapping are removed.
 *
 * @param input - The string to transliterate
 * @returns The transliterated string
 * @example
 * ```typescript
 * transliterate('Привет') // 'Privet' (Cyrillic to Latin)
 * transliterate('こんにちは') // 'konnichiha' (Japanese to Latin)
 * transliterate('你好') // 'Ni Hao' (Chinese to Latin)
 * ```
 * @group Unicode
 * @category Normalization
 */
export function transliterate(input: StringLike): string {
  return build(splitChars(toString(input)).map((c) => romanization[c.codePointAt(0)!] ?? empty));
}
