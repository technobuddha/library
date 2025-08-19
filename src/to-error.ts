import { toString } from './to-string.ts';

/**
 * Convert the entity to an Error object.
 *
 * @param entity - The entity to convert, if it is already an error ir will be returned
 * otherwise a new Error object will be created.
 * @returns The entity as an Error object.
 * @group Primitive
 * @category Conversion
 */
export function toError(entity: unknown): Error {
  return Error.isError(entity) ? entity : new Error(toString(entity));
}
