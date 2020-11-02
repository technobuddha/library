import isUndefined  from 'lodash/isUndefined';
import isNull       from 'lodash/isNull';
import isNaN        from 'lodash/isNaN';
import toPrimitive  from './toPrimitive';

/**
  * Compare two objects
  * @param a                First object
  * @param b                Second object
  * @param caseInsesitive    True if strings are to be compared case insensitive (default false)
  * @returns                0 if a == b; -1 if a < b; 1 if a > b
  */
export function compare(x: unknown, y: unknown, _caseInsensitive: boolean = false): number
{
    let px = toPrimitive(x, 'number');
    let py = toPrimitive(y, 'number');

    if(isUndefined(px) && isUndefined(py))
        return 0;
    else if(isUndefined(px))
        return -1;
    else if(isUndefined(py))
        return 1;
    else if(isNull(px) && isNull(py))
        return 0;
    else if(isNull(px))
        return -1;
    else if(isNull(py))
        return 1;
    else if(typeof px !== 'string' && typeof py !== 'string') {
        let nx = Number(px);
        let ny = Number(py);

        if(isNaN(nx) && isNaN(py))
            return 0;
        else
        if(isNaN(nx))
            return -1;
        else
        if(isNaN(ny))
            return 1;
        else
        if(nx === ny)
            return 0;
        else
        if(nx < ny)
            return -1;
        else
            return 1;
    } else {
        if(px === py)
            return 0;
        else
        if(px < py)
            return -1;
        else
            return 1;
    }
}

export default compare;
