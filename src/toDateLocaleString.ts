import isDate   from 'lodash/isDate';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import toString from 'lodash/toString';

export function toDateLocaleString(entity: unknown): string | null {
    if(entity === null || entity === undefined)
        return null;
    else if(isDate(entity))
        return entity.toLocaleString();
    else if(isString(entity) || isNumber(entity))
        return new Date(entity).toLocaleString();
    return new Date(toString(entity)).toLocaleString();
}

export default toDateLocaleString;
