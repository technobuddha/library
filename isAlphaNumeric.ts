const reAlphaNumeric = /^(\p{L}|\p{N})+$/u;

/**
 * Test a string for all alphanumeric characters
 * 
 * @param input string to test 
 * @return true, if all characters in the string are alphanumeric
 */
export function isAlphaNumeric(input: string): boolean {
    return reAlphaNumeric.test(input);
}

export default isAlphaNumeric;
