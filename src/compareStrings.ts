import isNil          from 'lodash/isNil';
import compareNumbers from './compareNumbers';

type Options = {
    /** if true, strings are to be compared case insensitive */
    caseInsensitive?: boolean;
    /** if true, compare numeric portions of the string as numbers */
    natural?: boolean;
    /** if true, compare strings as version numbers */
    version?: boolean;
};

/**
 * Compare two strings
 *
 * @param a First string
 * @param b Second string
 * @param caseInsensitive True if strings are to be compared case insensitive (default false)
 * @returns 0 if a == b; -1 if a < b; 1 if a > b
 *
 * @default caseInsensitive false
 * @default natural false
 * @default version false
 */
export function compareStrings(
    text1: string | null,
    text2: string | null,
    { caseInsensitive = false, natural = false, version = false }: Options = {}
):  (-1 | 0 | 1) {
    if(text1 === text2) return 0;
    if(isNil(text1)) return -1;
    if(isNil(text2)) return 1;

    if(caseInsensitive) {
        text1 = text1.toLowerCase();
        text2 = text2.toLowerCase();
        if(text1 === text2) return 0;
    }

    if(version) {
        const v1 = text1.trim().split(/[.-]/u);
        const v2 = text2.trim().split(/[.-]/u);
        const count = Math.max(v1.length, v2.length);
        let   order = 0 as (-1 | 0 | 1);

        for(let i = 0; order === 0 && i < count; ++i)
            order = compareStrings(v1[i], v2[i], { natural: true });

        return order || compareNumbers(v1.length, v2.length);
    } else if(natural) {
        const t1 = text1.match(/(\.\d+|\d+|\D+)/ug) ?? [];
        const t2 = text2.match(/(\.\d+|\d+|\D+)/ug) ?? [];
        const count = Math.min(t1.length, t2.length);
        let order = 0 as (-1 | 0 | 1);

        for(let i = 0; order === 0 && i < count; ++i) {
            if(t1[i] !== t2[i]) {
                const n1 = Number.parseFloat(t1[i]);
                const n2 = Number.parseFloat(t2[i]);

                order = Number.isNaN(n1) || Number.isNaN(n2) ? compareStrings(t1[i], t2[i]) : compareNumbers(n1, n2);
            }
        }

        return order || compareNumbers(t1.length, t2.length);
    }
    return text1 < text2 ? -1 : 1;
}

export default compareStrings;
