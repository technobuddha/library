/**
  * Add a prefix to a string, if it does not already have the prefix
  * @param    input        The string
  * @param    prefix        The prefix
  */
export function ensurePrefix(input: string, prefix: string): string {
    return input.startsWith(prefix) ? input : prefix + input;
}

export default ensurePrefix;
