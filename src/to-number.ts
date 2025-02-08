import { isBoolean, isNumber, isString } from 'lodash-es';

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
