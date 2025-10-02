import { type Primitive } from './primitive.ts';

/**
 * Check to see if an object is a primitive
 * @param input - object to test
 * @returns true, if the object is a primitive
 * @example
 * ```typescript
 * isPrimitive(42); // true
 * isPrimitive('hello'); // true
 * isPrimitive(null); // true
 * isPrimitive(undefined); // true
 * isPrimitive(Symbol('s')); // true
 * isPrimitive({}); // false
 * isPrimitive([]); // false
 * ```
 * @group Primitive
 * @category Type Checking
 */
export function isPrimitive(input: unknown): input is Primitive {
  return (
    input === null ||
    input === undefined ||
    typeof input === 'string' ||
    typeof input === 'number' ||
    typeof input === 'bigint' ||
    typeof input === 'boolean' ||
    typeof input === 'symbol'
  );
}
