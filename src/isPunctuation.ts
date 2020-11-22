const re = /^(\p{P})+$/u;

/**
 * Test a string for all punctuation characters
 * 
 * @param input string to test 
 * @return true, if all characters in the string are punctuation
 */
export function isPunctuation(input: string): boolean {
    return re.test(input);
}

export default isPunctuation;
