
const re    = /^(\p{Lu})+$/u;

/**
 * Test a string for all upper case characters
 * 
 * @param input string to test 
 * @return true, if all characters in the string are upper case
 */
export function isUpperCase(input: string): boolean {
    return re.test(input);
}

export default isUpperCase;
