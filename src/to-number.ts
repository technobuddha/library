import { isBoolean } from './is-boolean.ts';
import { isNumber } from './is-number.ts';
import { isString } from './is-string.ts';

/**
 * Convert an entity to a number.
 *
 * @param entity - The entity to convert, the entity will attempt to be converted as a number, a boolean or a string
 * @returns The entity as a number, or NaN if it cannot be converted
 * @group Primitive
 * @category Conversion
 */
export function toNumber(entity: unknown): number {
  return (
    isNumber(entity) ? entity
    : isBoolean(entity) ?
      entity ? 1
      : 0
    : isString(entity) ? Number.parseFloat(entity)
    : Number.NaN
  );
}
