import { isObject } from './is-object.ts';
import { isPrimitive } from './is-primitive.ts';

/**
 * Convert an object into its primitive (string, number, etc.) value
 * @param input - the object
 * @param hint - A "hint" as to what the type should be.  "string", "number" or "default"
 * @returns primitive value
 * @group Object
 * @category Conversion
 * @example
 * ```typescript
 * toPrimitive(42); // 42
 * toPrimitive('hello'); // 'hello'
 * toPrimitive(new Number(42)); // 42
 * toPrimitive(new String('abc')); // 'abc'
 * toPrimitive({ valueOf() { return 7; } }); // 7
 * toPrimitive({ toString() { return 'x'; } }, 'string'); // 'x'
 * ```
 */
export function toPrimitive(
  input: unknown,
  hint: 'string' | 'number' | 'default' = 'default',
): unknown {
  let wrapper = input;

  if (isPrimitive(input)) {
    if (input == null) {
      return input;
    }

    if (typeof input === 'string') {
      wrapper = String.prototype;
    } else if (typeof input === 'number') {
      wrapper = Number.prototype;
    } else if (typeof input === 'bigint') {
      wrapper = BigInt.prototype;
    } else if (typeof input === 'boolean') {
      wrapper = Boolean.prototype;
    } else {
      wrapper = Symbol.prototype;
    }
  }

  if (isObject(wrapper)) {
    if (Symbol.toPrimitive in wrapper) {
      // @ts-expect-error typescript can't figure out that the wrapper can be indexed by the symbol
      return wrapper[Symbol.toPrimitive].call(input, hint);
    } else if (hint === 'string') {
      if ('toString' in wrapper) {
        return wrapper.toString.call(input);
      } else if ('valueOf' in wrapper) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (wrapper as any).valueOf.call(input);
      }
    } else if ('valueOf' in wrapper) {
      return wrapper.valueOf.call(input);
    } else if ('toString' in wrapper) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (wrapper as any).toString.call(input);
    }
  }
  throw new TypeError('Cannot convert object to a primitive value');
}
