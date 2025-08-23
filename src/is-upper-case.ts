const re = /^(\p{Lu})+$/u;

/**
 * Test a string for all upper case characters
 *
 * @param input - string to test
 * @returns true, if all characters in the string are upper case
 * @group String
 * @category Categorization
 */
export function isUpperCase(input: string): boolean {
  return re.test(input);
}
