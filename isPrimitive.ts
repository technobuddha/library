
/**
  * Check to see if an object is a primitive
  */
export function isPrimitive(input: any): boolean
{
    return input === null
        || input === undefined
        || typeof input === 'string'
        || typeof input === 'number'
        || typeof input === 'boolean'
        || typeof input === 'symbol';
}

export default isPrimitive;
