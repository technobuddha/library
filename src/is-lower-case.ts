const re = /^(\p{Ll})+$/u;

/**
 * Test a string for all lower case characters
 *
 * @param input - string to test
 * @returns true, if all characters in the string are lower case
 * @group String
 * @category Categorization
 */
export function isLowerCase(input: string): boolean {
  return re.test(input);
}
