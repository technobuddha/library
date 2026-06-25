import { toString } from '../string/to-string.ts';

import { isError } from './is-error.ts';

/**
 * Convert the entity to an Error object.
 * @param entity - The entity to convert, if it is already an error ir will be returned
 * otherwise a new Error object will be created.
 * @returns The entity as an Error object.
 * @example
 * ```typescript
 * toError(new Error('fail')); // returns the same Error object
 * toError('fail'); // returns Error: fail
 * toError(404); // returns Error: 404
 * ```
 * @group Error
 * @category Conversion
 */
export function toError(entity: unknown): Error & { code?: string } {
  return isError(entity) ? entity : new Error(toString(entity));
}
