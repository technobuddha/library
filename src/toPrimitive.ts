import isPrimitive  from './isPrimitive';
import isNull       from 'lodash/isNull';
import isUndefined  from 'lodash/isUndefined';
import isObject     from 'lodash/isObject';

/**
 * Convert an object into its primitive (string, number, etc.) value
 *
 * @param input the object
 * @param hint A "hint" as to what the type should be.  "string", "number" or "default"
 * @returns primitive value
 */
export function toPrimitive(input: unknown, hint: ('string' | 'number' | 'default') = 'default'): any {
    let wrapper = input;

    if(isPrimitive(input)) {
        if(isNull(input) || isUndefined(input))
            return input;

        if(typeof(input) === 'string')
            wrapper = String.prototype;
        else if(typeof(input) === 'number')
            wrapper = Number.prototype;
        else if(typeof(input) === 'bigint')
            wrapper = BigInt.prototype;
        else if(typeof(input) === 'boolean')
            wrapper = Boolean.prototype;
        else
            wrapper = Symbol.prototype;
    }

    if(isObject(wrapper)) {
        if(Symbol.toPrimitive in wrapper) {
            // @ts-expect-error typescript can't figure out that the wrapper can be indexed by the symbol
            return wrapper[Symbol.toPrimitive].call(input, hint);
        } else if(hint === 'string') {
            if('toString' in wrapper)
                return wrapper.toString.call(input);
            else if('valueOf' in wrapper)
                return wrapper.valueOf.call(input);
        } else if('valueOf' in wrapper) {
            return wrapper.valueOf.call(input);
        } else if('toString' in wrapper) {
            return wrapper.toString.call(input);
        }
    }
    throw new TypeError('Cannot convert object to a primitive value');
}

export default toPrimitive;
