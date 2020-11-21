
/**
 * Check to see if an object is a primitive
 * 
 * @param input object to test
 * @returns true, if the object is a c
 */
export function isPrimitive(input: unknown): input is null | undefined | string | number | bigint | boolean | symbol {
    return input === null
        || input === undefined
        || typeof input === 'string'
        || typeof input === 'number'
        || typeof input === 'bigint'
        || typeof input === 'boolean'
        || typeof input === 'symbol';
}

export default isPrimitive;
