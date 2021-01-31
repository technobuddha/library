import toEnumeration from './toEnumeration';

type Options = {
    /** An iterable list of values that are "true" */
    trueValues?: Iterable<string | RegExp>;
    /** An iterable list of values that are "true" */
    falseValues?: Iterable<string | RegExp>;
};

const defaultTrue  = [ 'true',  'yes', 'y', 'on',  '1' ];
const defaultFalse = [ 'false', 'no',  'n', 'off', '0' ];

/**
 * Convert a string to a boolean value
 *
 * @param input The string to convert
 * @parm __namedParameters see {@link Options}
 * @defaults trueValues 'true', 'yes', 'y', 'on', or '1'
 * @defaults falseValues 'false', 'no', 'n', 'off', '0'
 */
export function toBoolean(input: string, { trueValues = defaultTrue, falseValues = defaultFalse }: Options = {}): boolean | undefined {
    return [ true, false, undefined ][toEnumeration(input, trueValues, falseValues) ?? 2];
}

export default toBoolean;
