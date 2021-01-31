import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';

export function toInteger(entity: unknown): number {
    return isNumber(entity) ? Math.trunc(entity) : isString(entity) ? parseInt(entity, 10) : NaN;
}

export default toInteger;
