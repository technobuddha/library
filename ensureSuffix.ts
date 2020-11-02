
/**
  * Add a suffix to a string, if it does not already have the prefix
  * @param    input        The string
  * @param    suffix        The suffix
  */
export function ensureSuffix(input: string, suffix: string): string {
    return input.endsWith(suffix) ? input : input + suffix;
}

export default ensureSuffix;
