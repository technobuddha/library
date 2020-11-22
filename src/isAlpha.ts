const reAlpha = /^\p{L}+$/u;

/**
 * Test a string for all alphaetic characters
 * 
 * @param input string to test
 * @return true, if all characters in the string are alphabetic
 */
export function isAlpha(input: string): boolean {
    return reAlpha.test(input);
}

export default isAlpha;
