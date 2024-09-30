import { isBoolean, isNumber, isString } from 'lodash-es';

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

export default toInteger;
