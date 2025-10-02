import { asciiMapping } from '../@data/ascii-mapping.ts';
import { build } from '../string/build.ts';
import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';
import { splitChars } from '../tokenization/split-chars.ts';

/**
 * Change a string to be all from the basic latin unicode plane
 * @param input - The string
 * @group Unicode
 * @category Normalization
 */
export function toASCII(input: StringLike): string {
  return build(splitChars(toString(input)).map((c) => asciiMapping[c.codePointAt(0)!] ?? '?'));
}
