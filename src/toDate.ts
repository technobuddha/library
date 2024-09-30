import { isDate } from 'lodash-es';
import { isString } from 'lodash-es';
import { isNumber } from 'lodash-es';
import { toString } from 'lodash-es';

export function toDate(entity: unknown): Date {
  if (entity === null || entity === undefined) return new Date(Number.NaN);
  else if (isDate(entity)) return entity;
  else if (isString(entity) || isNumber(entity)) return new Date(entity);
  return new Date(toString(entity));
}

export default toDate;
