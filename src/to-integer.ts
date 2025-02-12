import { isBoolean, isNumber, isString } from 'lodash-es';

/**
 * Convert an entity to a integer number.
 *
 * @param entiry - The entiry to convert, the entiry will attempt to be converted as a number, a boolean or a string
 * @returns The entiry as a number, or NaN if it cannot be converted
 * @group Conversion
 * @category To Integer
 */
export function toInteger(entity: unknown): number {
  return (
    isNumber(entity) ? Math.trunc(entity)
    : isBoolean(entity) ?
      entity ? 1
      : 0
    : isString(entity) ? Number.parseInt(entity)
    : Number.NaN
  );
}
