/*
 * Copyright © 2020 Phil Hill
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found at https://github.com/technobuddha/hill.software/blob/main/LICENSE
 */

import isNil        from 'lodash/isNil';

/**
 * Compare two numbers
 *
 * @param a First object
 * @param b  Second object
 * @returns 0 if a == b; -1 if a < b; 1 if a > b
 */
export function compareNumbers(a: number | null, b: number | null): (-1 | 0 | 1) {
    if(a === b) return 0;
    if(isNil(a)) return -1;
    if(isNil(b)) return 1;

    return a < b ? -1 : 1;
}

export default compareNumbers;
