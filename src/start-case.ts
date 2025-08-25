/**
 * Converts a given string to start case, capitalizing the first letter of each word and converting the rest to lowercase.
 *
 * @param input - The input string to be converted.
 * @returns The start-cased version of the input string.
 *
 * @example
 * ```typescript
 * startCase('hello world'); // "Hello World"
 * startCase('fooBar');      // "Foobar"
 * ```
 * @group Programming
 * @category Case Conversion
 */
export function startCase(input: string): string {
  return input.toLocaleLowerCase().replaceAll(/\b\w/gu, (l) => l.toLocaleUpperCase());
}
