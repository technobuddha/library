const re = /^(\p{Ll})+$/u;

/**
 * Test a string for all lower case characters
 * 
 * @param input string to test 
 * @return true, if all characters in the string are lower case
 */
export function isLowerCase(input: string): boolean {
    return re.test(input);
}

export default isLowerCase;