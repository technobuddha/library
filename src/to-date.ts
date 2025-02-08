import { isDate, isNumber, isString, toString } from 'lodash-es';

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
