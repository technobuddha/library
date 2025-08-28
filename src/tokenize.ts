/**
 * Regular expression to match words and numbers in a Unicode-aware manner.
 * @internal
 */
const reWord = /(?:\p{Lu}\p{Ll}+)|(?:(?:\p{Lu}(?!\p{Ll}))+)|(?:\p{Ll}+)|(?:\p{N}+)/gu;

/**
 * Splits the input string into an array of words.
 *
 * @param input - The string to tokenize.
 * @returns An array of words found in the input string. Returns an empty array if no matches are found.
 * @group Programming
 * @category Case Conversion
 */
export function tokenize(input: string): string[] {
  return input.match(reWord) ?? [];
}
