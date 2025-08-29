import { isBoolean } from './is-boolean.ts';
import { isNumber } from './is-number.ts';
import { isString } from './is-string.ts';

/**
 * Convert an entity to a integer number.
 * @param entity - The entity to convert, the entity will attempt to be converted as a number, a boolean or a string
 * @returns The entity as a number, or NaN if it cannot be converted
 * @group Object
 * @category Conversion
 * @example
 * ```typescript
 * toInteger(42.7); // 42
 * toInteger(true); // 1
 * toInteger(false); // 0
 * toInteger('123'); // 123
 * toInteger('abc'); // NaN
 * toInteger(null); // NaN
 * ```
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
