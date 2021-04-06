import isNumber  from 'lodash/isNumber';
import isBoolean from 'lodash/isBoolean';
import isString  from 'lodash/isString';

export function toNumber(entity: unknown): number {
    return isNumber(entity) ? entity : isBoolean(entity) ? (entity ? 1 : 0) : isString(entity) ? parseFloat(entity) : NaN;
}

export default toNumber;
