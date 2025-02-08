/**
 * Test a string for all white space characters
 *
 * @param input - string to test
 * @returns true, if all characters in the string are white space
 */
export function isWhitespace(input: string): boolean {
  return /^\s+$/u.test(input);
}
