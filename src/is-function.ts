import { isObject } from './is-object.ts';

/**
 * Determines whether the provided value is a function.
 *
 * This includes regular functions, generator functions, async functions, and proxies
 * that behave like functions. It uses both `typeof` and `Object.prototype.toString`
 * checks to ensure accurate detection.
 *
 * @param value - The value to test.
 * @returns True if the value is a function, otherwise false.
 * @group Utility
 * @category Type Checking
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function isFunction(value: unknown): value is Function {
  return (
    typeof value === 'function' ||
    (isObject(value) &&
      [
        '[object Function]',
        '[object GeneratorFunction]',
        '[object AsyncFunction]',
        '[object Proxy]',
      ].includes(Object.prototype.toString.call(value)))
  );
}
