import { empty }  from './constants';
import isFunction from 'lodash/isFunction';

/**
 * Concatenates strings and/or arrays of strings
 * 
 * @param args Concatenates a list of strings, string arrays, or functions that return a string or string array.
 * @returns The concatenation of *args*.
 */
export function build(...args: (string | string[] | (() => string | string[]))[]): string {
    return args.flatMap(a => isFunction(a) ? a() : a).join(empty);
}

export default build;
