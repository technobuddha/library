import { isError, toString } from 'lodash-es';

/**
 * Convert the entity to an Error object.
 *
 * @param entity - The entity to convert, if it is already an error ir will be returned
 * otherswise a new Error object will be created.
 * @returns The entity as an Error object.
 * @group Conversion
 * @category To Error
 */
export function toError(entity: unknown): Error {
  return isError(entity) ? entity : new Error(toString(entity));
}
