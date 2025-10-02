import { Int } from '../binary/int.ts';

import { type BigIntLike } from './big-int-like.ts';
import { isNumber } from './is-number.ts';

/**
 * Convert an entity to a bigint.
 *
 * Converts various types to bigint:
 * - Numbers are truncated to integers before conversion
 * - Booleans become 1n (true) or 0n (false)
 * - Strings are parsed as numeric values (supports hex, octal, binary)
 * - All other types default to 0n
 *
 * @param entity - The entity to convert (number, bigint, boolean, string, or other)
 * @returns The entity as a bigint. Returns 0n for null, undefined, objects, symbols, and functions.
 * @throws \{RangeError\} When converting NaN or Infinity numbers
 * @throws \{SyntaxError\} When converting invalid numeric strings
 *
 * @example
 * ```typescript
 * toBigInt(42);           // 42n
 * toBigInt(42n);          // 42n
 * toBigInt(3.14);         // 3n (truncated)
 * toBigInt(true);         // 1n
 * toBigInt(false);        // 0n
 * toBigInt('123');        // 123n
 * toBigInt('0xff');       // 255n
 * toBigInt('0b1010');     // 10n
 * toBigInt(null);         // 0n
 * toBigInt({});           // 0n
 * toBigInt(NaN);          // throws RangeError
 * toBigInt(Infinity);     // throws RangeError
 * toBigInt('abc');        // throws SyntaxError
 * ```
 *
 * @group Number
 * @category Conversion
 */
export function toBigInt(entity: BigIntLike): bigint {
  return (
    typeof entity === 'bigint' ? entity
    : isNumber(entity) ? BigInt(Math.trunc(entity))
    : entity instanceof Int ? toBigInt(entity.value)
    : BigInt(entity)
  );
}
