/**
 * Add a prefix to a string, if it does not already have the prefix
 * 
 * @param input The string
 * @param prefix The prefix
 * @returns The prefix followed by the string
 */
export function ensurePrefix(input: string, prefix: string): string {
    return input.startsWith(prefix) ? input : prefix + input;
}

export default ensurePrefix;
