import { isBoolean, isNumber, isString } from 'lodash-es';

/**
 * Convert an entity to a number.
 *
 * @param entiry - The entiry to convert, the entiry will attempt to be converted as a number, a boolean or a string
 * @returns The entiry as a number, or NaN if it cannot be converted
 * @group Conversion
 * @category To Number
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
