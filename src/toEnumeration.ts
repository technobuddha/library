import matches from './matches';

/**
 * Convert a string to a numeric value
 *
 * @param input The string to convert
 * @param tests Array of tests (string value or regular expressions)
 * @parm __namedParameters see {@link Options}
 * @returns The index of the first test to match the input string
 */
export function toEnumeration(input: string, ...tests: (Iterable<string | RegExp> | string | RegExp)[]): number | undefined {
    for(let i = 0; i < tests.length; ++i)
        if(matches(input, tests[i])) return i;

    return undefined;
}

export default toEnumeration;
