import isDate   from 'lodash/isDate';
import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import toString from 'lodash/toString';

export function toDateUTCString(entity: unknown): string | null {
    if(entity === null || entity === undefined)
        return null;
    else if(isDate(entity))
        return entity.toUTCString();
    else if(isString(entity) || isNumber(entity))
        return new Date(entity).toUTCString();
    else
        return new Date(toString(entity)).toUTCString();
}

export default toDateUTCString;
