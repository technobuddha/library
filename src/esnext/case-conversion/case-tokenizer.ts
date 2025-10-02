/**
 * Regular expression to match words and numbers in a Unicode-aware manner.
 * @internal
 */
const reWord =
  /(?:\p{Lu}[\p{Ll}\p{N}]+)|(?:\p{Lu}[\p{Lu}\p{N}]*(?!\p{Ll}))|(?:\p{Ll}[\p{Ll}\p{N}]*)|(?:\p{N}+)/gv;

/**
 * Splits the input string into an array of words.
 * @param input - The string to tokenize.
 * @returns An array of words found in the input string. Returns an empty array if no matches are found.
 * @example
 * ```ts
 * tokenize('camelCase');           // ['camel', 'Case']
 * tokenize('PascalCase');          // ['Pascal', 'Case']
 * tokenize('snake_case');          // ['snake', 'case']
 * tokenize('kebab-case');          // ['kebab', 'case']
 * tokenize('SCREAMING_SNAKE_CASE'); // ['SCREAMING', 'SNAKE', 'CASE']
 * tokenize('mixedUP_CasE123');     // ['mixed', 'UP', 'Cas', 'E', '123']
 * tokenize('hello world');         // ['hello', 'world']
 * tokenize('test123ABC');          // ['test', '123', 'ABC']
 * ```
 * @group Case Conversion
 * @category Tokenization
 */
export function caseTokenizer(input: string): string[] {
  return input.match(reWord) ?? [];
}
