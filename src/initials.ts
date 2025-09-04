/**
 * Returns the uppercase initials of the given string.
 *
 * Extracts the first letter of each word in the input string and concatenates them into a single uppercase string.
 *
 * @param words - The input string from which to extract initials.
 * @returns The uppercase initials of the input string.
 * @group String
 * @category Operations
 * @example
 * ```typescript
 * initials("John Doe") // "JD"
 * initials("alice in wonderland") // "AIW"
 * ```
 */
export function initials(words: string): string {
  return Array.from(words.matchAll(/\b(\w)/gu), (m) => m[1])
    .join('')
    .toUpperCase();
}
