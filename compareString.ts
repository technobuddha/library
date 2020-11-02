import isNil            from 'lodash/isNil';
import isNaN            from 'lodash/isNaN';
import defaultTo        from 'lodash/defaultTo';
import compareNumber    from './compareNumber';

type Options = {
    caseInsensitive?: boolean,
    natural?: boolean,
    version?: boolean
};

/**
  * Compare two strings
  * @param a                First object
  * @param b                Second object
  * @param caseInsesitive    True if strings are to be compared case insensitive (default false)
  * @returns                0 if a == b; -1 if a < b; 1 if a > b
  */
export function compareString(text1: string | null, text2: string | null, {caseInsensitive = false, natural = false, version = false}: Options = {}): (-1 | 0 | 1)
{
    if(text1 == text2) return 0;
    if(isNil(text1)) return -1;
    if(isNil(text2)) return 1;

    if(caseInsensitive) {
        text1 = text1.toLowerCase();
        text2 = text2.toLowerCase();
        if(text1 == text2) return 0;
    }

    if(version) {
        let v1 = text1.trim().split('.');
        let v2 = text2.trim().split('.');
        let count = Math.max(v1.length, v2.length);
        let order = 0 as (-1 | 0 | 1);

        for(let i = 0; order === 0 && i < count; ++i) {
            order = compareString(v1[i], v2[i], { natural: true });
        }

        return order || compareNumber(v1.length, v2.length);
    } else if(natural) {
        const t1 = defaultTo(text1.match(/(\.\d+|\d+|\D+)/g), []);
        const t2 = defaultTo(text2.match(/(\.\d+|\d+|\D+)/g), []);
        const count = Math.min(t1.length, t2.length);
        let order = 0 as (-1 | 0 | 1);

        for(let i = 0; order === 0 && i < count; ++i) {
            if(t1[i] !== t2[i]) {
                const n1 = Number.parseFloat(t1[i]);
                const n2 = Number.parseFloat(t2[i]);

                if(isNaN(n1) || isNaN(n2))
                    order = compareString(t1[i], t2[i]);
                else
                    order = compareNumber(n1, n2);
            }
        }

        return order || compareNumber(t1.length, t2.length);
    }
    else
        return text1 < text2 ? -1 : 1;
}

export default compareString;
