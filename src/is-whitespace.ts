/**
 * Test a string for all white space characters
 * @param input - string to test
 * @returns true, if all characters in the string are white space
 * @group String
 * @category Categorization
 */
export function isWhitespace(input: string): boolean {
  return /^\s+$/u.test(input);
}
