import { type Primitive } from './primitive.ts';

/**
 * Converts an object or value to its primitive (string, number, bigint, boolean, or symbol) value, following ECMAScript ToPrimitive semantics.
 *
 * If the input is already a primitive, it is returned as-is. For boxed primitives (e.g., `new String('abc')`), the underlying primitive is extracted. For objects, the function attempts to use the `Symbol.toPrimitive` method, or falls back to `valueOf` and `toString` according to the provided hint.
 *
 * @param input - The value or object to convert.
 * @param hint - A \"hint\" for the preferred type: 'string', 'number', or 'default'. Defaults to 'default'.
 * @returns The primitive value extracted from the input.
 *
 * @example
 * ```typescript
 * toPrimitive(42); // 42
 * toPrimitive('hello'); // 'hello'
 * toPrimitive(new Number(42)); // 42
 * toPrimitive(new String('abc')); // 'abc'
 * toPrimitive({ valueOf() { return 7; } }); // 7
 * toPrimitive({ toString() { return 'x'; } }, 'string'); // 'x'
 * toPrimitive(Object(Symbol('s'))); // Symbol('s')
 * toPrimitive(new Boolean(true)); // true
 * ```
 *
 * @throws If the object cannot be converted to a primitive value.
 *
 * @group Primitive
 * @category Conversion
 */
/**
 * Attempts to extract a primitive value from a wrapper or object using ECMAScript ToPrimitive logic.
 *
 * @param wrapper - The wrapper or object to extract from (may be a prototype object).
 * @param input - The original input value (used as `this` context for method calls).
 * @param hint - The preferred type hint: 'string', 'number', or 'default'.
 * @returns A tuple: [true, primitive] if successful, or [false, null] if not.
 *
 * @internal
 */
export function toPrimitive(
  input: unknown,
  hint: 'string' | 'number' | 'default' = 'default',
): Primitive {
  let [ok, result] = makePrimitive(input, input, hint);
  if (ok) {
    return result;
  }

  let wrapper = input;
  if (wrapper == null) {
    return wrapper;
  } else if (typeof wrapper === 'string') {
    wrapper = String.prototype;
  } else if (typeof wrapper === 'number') {
    wrapper = Number.prototype;
  } else if (typeof wrapper === 'bigint') {
    wrapper = BigInt.prototype;
  } else if (typeof wrapper === 'boolean') {
    wrapper = Boolean.prototype;
  } else if (typeof wrapper === 'symbol') {
    wrapper = Symbol.prototype;
  } else if (typeof wrapper === 'function') {
    wrapper = Function.prototype;
  }

  [ok, result] = makePrimitive(wrapper, input, hint);
  if (ok) {
    return result;
  }
  throw new TypeError('Cannot convert object to a primitive value');
}

function makePrimitive(
  wrapper: unknown,
  input: unknown,
  hint: 'string' | 'number' | 'default',
): [boolean, Primitive] {
  if (typeof wrapper === 'object' && wrapper !== null) {
    if (Symbol.toPrimitive in wrapper && typeof wrapper[Symbol.toPrimitive] === 'function') {
      return [true, (wrapper[Symbol.toPrimitive] as (h: string) => Primitive).call(input, hint)];
    }

    if (hint === 'string') {
      if ('toString' in wrapper && typeof wrapper.toString === 'function') {
        return [true, (wrapper.toString as () => string).call(input)];
      }

      if ('valueOf' in wrapper && typeof wrapper.valueOf === 'function') {
        return [true, (wrapper.valueOf as () => Primitive).call(input)];
      }
    } else {
      if ('valueOf' in wrapper && typeof wrapper.valueOf === 'function') {
        return [true, (wrapper.valueOf as () => Primitive).call(input)];
      }

      if ('toString' in wrapper && typeof wrapper.toString === 'function') {
        return [true, (wrapper.toString as () => string).call(input)];
      }
    }
  }
  return [false, null];
}
