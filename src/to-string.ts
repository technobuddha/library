/**
 * Converts an unknown value to its string representation.
 *
 * - Returns an empty string if the value is `null` or `undefined`.
 * - Returns the value itself if it is a string.
 * - Converts booleans to `'true'` or `'false'`.
 * - Converts symbols and bigints using their respective `toString` methods.
 * - Returns a string representation for functions in the format `function <name>();`.
 * - Converts numbers using their `toString` method.
 * - For all other types, returns the result of `Object.prototype.toString`.
 *
 * @param value - The value to convert to a string.
 * @returns The string representation of the input value.
 * @group Utility
 * @category Conversion
 */
import { empty } from './constants.ts';

export function toString(value: unknown): string {
  if (value == null) {
    return empty;
  }

  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }

  if (typeof value === 'symbol') {
    return value.toString();
  }

  if (typeof value === 'bigint') {
    return value.toString();
  }

  if (typeof value === 'function') {
    return `function ${value.name}();`;
  }

  if (typeof value === 'number') {
    return value.toString();
  }

  if (typeof value === 'object') {
    if ('toString' in value) {
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      return value.toString();
    }
    const proto = Object.getPrototypeOf(value);
    if (proto && 'toString' in proto) {
      return proto.toString.call(value);
    }
  }

  return Object.prototype.toString.call(value);
}
