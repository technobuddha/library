import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';

export function toNumber(entity: unknown): number {
    return isNumber(entity) ? entity : isString(entity) ? parseFloat(entity as string) : NaN;
}

export default toNumber;
