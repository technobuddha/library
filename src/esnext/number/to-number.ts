import { Int } from '../binary/int.ts';

import { isNumber } from './is-number.ts';
import { type NumberLike } from './number-like.ts';

/**
 * Convert an entity to a number.
 * @param entity - The entity to convert, the entity will attempt to be converted as a number, a bigint, an integer wrapper (I8, I16, I32, I64, U8, U16, U32, U64), a boolean or a string
 * @returns The entity as a number, or NaN if it cannot be converted
 * @example
 * ```typescript
 * toNumber(42); // 42
 * toNumber(42n); // 42
 * toNumber(new I32(100)); // 100
 * toNumber(new U8(255)); // 255
 * toNumber('123.45'); // 123.45
 * toNumber('abc'); // NaN
 * toNumber(null); // NaN
 * ```
 * @group Number
 * @category Conversion
 */
export function toNumber(entity: NumberLike): number {
  return (
    isNumber(entity) ? entity
    : entity instanceof Int ? toNumber(entity.value)
    : Number(entity)
  );
}
