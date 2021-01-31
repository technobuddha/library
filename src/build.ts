import { empty }  from './constants';
import compact    from 'lodash/compact';
import isNil      from 'lodash/isNil';
import isString   from 'lodash/isString';
import isArray    from 'lodash/isArray';
import isFunction from 'lodash/isFunction';

type stringy = string | string[];
/**
 * Concatenates strings and/or arrays of strings
 *
 * @param args Concatenates a list of strings, string arrays, or functions that return a string or string array.
 * @returns The concatenation of *args*.
 */
export function build(...args: (stringy | Generator<stringy> | (() => stringy))[]): string {
    return compact(args.flatMap(a => (isNil(a) ? null : isString(a) || isArray(a) ? a : isFunction(a) ? a() : Array.from(a)))).join(empty);
}

export default build;
