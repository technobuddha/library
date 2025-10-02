import { type StringLike } from '../string/string-like.ts';
import { toString } from '../string/to-string.ts';

/**
 * Returns the uppercase initials of the given string.
 *
 * Extracts the first letter of each word in the input string and concatenates them into a single uppercase string.
 *
 * @param words - The input string from which to extract initials.
 * @returns The uppercase initials of the input string.
 * @group Tokenization
 * @category Initials
 * @example
 * ```typescript
 * initials("John Doe") // "JD"
 * initials("alice in wonderland") // "AIW"
 * ```
 */
export function initials(words: StringLike): string {
  return Array.from(toString(words).matchAll(/\b(\w)/gv), (m) => m[1])
    .join('')
    .toUpperCase();
}
