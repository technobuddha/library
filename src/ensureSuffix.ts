/**
 * Add a suffix to a string, if it does not already have the suffix
 *
 * @param input The string
 * @param suffix The suffix
 * @returns The string followed by the suffix
 */
export function ensureSuffix(input: string, suffix: string): string {
    return input.endsWith(suffix) ? input : input + suffix;
}

export default ensureSuffix;
