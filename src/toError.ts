import isError   from 'lodash/isError';
import toString  from 'lodash/toString';

export function toError(entity: unknown): Error {
    return isError(entity) ? entity : new Error(toString(entity));
}

export default toError;
