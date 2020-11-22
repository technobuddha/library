import isUndefined  from 'lodash/isUndefined';
import isNil        from 'lodash/isNil';
import isNull       from 'lodash/isNull';
import isNaN        from 'lodash/isNaN';
import toPrimitive  from './toPrimitive';

/**
 * Compare two objects
 * 
 * @param a First object
 * @param b Second object
 * @returns 0 if a == b; -1 if a < b; 1 if a > b
 */
export function compare(x: unknown, y: unknown): number {
    const px = toPrimitive(x, 'number');
    const py = toPrimitive(y, 'number');

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
        const nx = Number(px);
        const ny = Number(py);

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

/**
 * Compare two numbers
 * 
 * @param a First object
 * @param b  Second object
 * @returns 0 if a == b; -1 if a < b; 1 if a > b
 */
 export function compareNumbers(a: number | null, b: number | null): (-1 | 0 | 1) {
     if(a == b) return 0;
     if(isNil(a)) return -1;
     if(isNil(b)) return 1;
 
     return a < b ? -1 : 1;
 }

 type Options = {
    /** if true, strings are to be compared case insensitive */ 
    caseInsensitive?: boolean,
    /** if true, compare numeric portions of the string as numbers */
    natural?: boolean,
    /** if true, compare strings as version numbers */
    version?: boolean
};

/**
 * Compare two strings
 * 
 * @param a First string
 * @param b Second string
 * @param caseInsesitive True if strings are to be compared case insensitive (default false)
 * @returns 0 if a == b; -1 if a < b; 1 if a > b
 * 
 * @default caseInsensitive false
 * @default natural false
 * @default version false
 */
export function compareStrings(
    text1: string | null,
    text2: string | null,
     {caseInsensitive = false, natural = false, version = false}: Options = {}
):  (-1 | 0 | 1) {
    if(text1 == text2) return 0;
    if(isNil(text1)) return -1;
    if(isNil(text2)) return 1;

    if(caseInsensitive) {
        text1 = text1.toLowerCase();
        text2 = text2.toLowerCase();
        if(text1 == text2) return 0;
    }

    if(version) {
        const v1 = text1.trim().split(/[.-]/);
        const v2 = text2.trim().split(/[.-]/);
        const count = Math.max(v1.length, v2.length);
        let   order = 0 as (-1 | 0 | 1);

        for(let i = 0; order === 0 && i < count; ++i) {
            order = compareStrings(v1[i], v2[i], { natural: true });
        }

        return order || compareNumbers(v1.length, v2.length);
    } else if(natural) {
        const t1 = text1.match(/(\.\d+|\d+|\D+)/g) ?? [];
        const t2 = text2.match(/(\.\d+|\d+|\D+)/g) ?? [];
        const count = Math.min(t1.length, t2.length);
        let order = 0 as (-1 | 0 | 1);

        for(let i = 0; order === 0 && i < count; ++i) {
            if(t1[i] !== t2[i]) {
                const n1 = Number.parseFloat(t1[i]);
                const n2 = Number.parseFloat(t2[i]);

                if(isNaN(n1) || isNaN(n2))
                    order = compareStrings(t1[i], t2[i]);
                else
                    order = compareNumbers(n1, n2);
            }
        }

        return order || compareNumbers(t1.length, t2.length);
    }
    else
        return text1 < text2 ? -1 : 1;
}

export default compare;
