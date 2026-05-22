/**
 * Determines whether the provided value is an `Error` object.
 * @param entity - The value to check.
 * @returns True if the value is an Error object, otherwise false.
 * @example
 * ```typescript
 * isError(new Error('boom')); // true
 * isError('boom'); // false
 * isError({ message: 'boom' }); // false
 * ```
 * @group Error
 * @category Type Checking
 */
export function isError(entity: unknown): entity is Error {
  return Object.prototype.toString.call(entity) === '[object Error]';
}
