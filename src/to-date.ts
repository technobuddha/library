import { isDate, isNumber, isString, toString } from 'lodash-es';

/**
 * Converts an unknown entity to a `Date` object.
 *
 * - If the entity is `null` or `undefined`, returns an invalid `Date` (`new Date(Number.NaN)`).
 * - If the entity is already a `Date`, returns it as is.
 * - If the entity is a `string` or `number`, attempts to create a `Date` from it.
 * - Otherwise, converts the entity to a string and creates a `Date` from that string.
 *
 * @param entity - The value to convert to a `Date`.
 * @returns A `Date` object representing the input, or an invalid `Date` if conversion is not possible.
 *
 * @group Time
 * @category Conversion
 */
export function toDate(entity: unknown): Date {
  if (entity === null || entity === undefined) {
    return new Date(Number.NaN);
  } else if (isDate(entity)) {
    return entity;
  } else if (isString(entity) || isNumber(entity)) {
    return new Date(entity);
  }
  return new Date(toString(entity));
}
