import matches from './matches';

/**
 * Convert a string to a boolean value
 * 
 * @param input The string to convert
 * @parm __namedParameters see {@link Options}
 * @defaults trueValues 'true', 'yes', 'y', 'on', or '1'
 * @defaults falseValues 'false', 'no', 'n', 'off', '0'
 * @returns true, false or undefined if the string doesn't match
 */
export function toEnumeration(input: string, ...tests: (Iterable<string | RegExp> | string | RegExp)[]): number | undefined {
    for(let i = 0; i < tests.length; ++i) {
        if(matches(input, tests[i])) return i;
    }
    return undefined;
}

export default toEnumeration;
