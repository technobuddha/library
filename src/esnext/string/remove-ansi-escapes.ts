import { ansiEscapes } from '../regexp/ansi-escapes.ts';
import { empty } from '../unicode/unicode.ts';

import { type StringLike } from './string-like.ts';
import { toString } from './to-string.ts';

/**
 * Removes ANSI escape sequences from a string.
 * @param input - The input value to sanitize
 * @returns The input converted to a string without ANSI escape sequences
 * @group String
 * @category Clean
 */
export function removeANSIEscapes(input: StringLike): string {
  return toString(input).replaceAll(ansiEscapes, empty);
}
