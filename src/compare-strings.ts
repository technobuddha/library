import { isNil } from 'lodash-es';

import { compareNumbers } from './compare-numbers.ts';

/**
 * @group String
 * @category Comparison
 */
export type CompareStringsOptions = {
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
 * @param a - First string
 * @param b - Second string
 * @param caseInsensitive - True if strings are to be compared case insensitive (default false)
 * @defaultValue caseInsensitive false
 * @defaultValue natural false
 * @defaultValue version false
 * @returns 0 if a == b; -1 if a \< b; 1 if a \> b
 * @group String
 * @category Comparison
 */
export function compareStrings(
  a: string | null,
  b: string | null,
  { caseInsensitive = false, natural = false, version = false }: CompareStringsOptions = {},
): -1 | 0 | 1 {
  let stra = a;
  let strb = b;

  if (stra === strb) {
    return 0;
  }
  if (isNil(stra)) {
    return -1;
  }
  if (isNil(strb)) {
    return 1;
  }

  if (caseInsensitive) {
    stra = stra.toLocaleLowerCase();
    strb = strb.toLocaleLowerCase();
    if (stra === strb) {
      return 0;
    }
  }

  if (version) {
    const v1 = stra.trim().split(/[.-]/u);
    const v2 = strb.trim().split(/[.-]/u);
    const count = Math.max(v1.length, v2.length);
    let order = 0 as -1 | 0 | 1;

    for (let i = 0; order === 0 && i < count; ++i) {
      order = compareStrings(v1[i], v2[i], { natural: true });
    }

    return order || compareNumbers(v1.length, v2.length);
  } else if (natural) {
    const t1 = stra.match(/(\.\d+|\d+|\D+)/gu) ?? [];
    const t2 = strb.match(/(\.\d+|\d+|\D+)/gu) ?? [];
    const count = Math.min(t1.length, t2.length);
    let order = 0 as -1 | 0 | 1;

    for (let i = 0; order === 0 && i < count; ++i) {
      if (t1[i] !== t2[i]) {
        const n1 = Number.parseFloat(t1[i]);
        const n2 = Number.parseFloat(t2[i]);

        order =
          Number.isNaN(n1) || Number.isNaN(n2) ?
            compareStrings(t1[i], t2[i])
          : compareNumbers(n1, n2);
      }
    }

    return order || compareNumbers(t1.length, t2.length);
  }
  return stra < strb ? -1 : 1;
}
