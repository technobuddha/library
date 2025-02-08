import { compareNumbers } from './compare-numbers.ts';

/**
 * Options for the {@link compareStrings} function
 *
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
  let strA = a;
  let strB = b;

  if (strA === strB) {
    return 0;
  }
  if (strA == null) {
    return -1;
  }
  if (strB == null) {
    return 1;
  }

  if (caseInsensitive) {
    strA = strA.toLocaleLowerCase();
    strB = strB.toLocaleLowerCase();
    if (strA === strB) {
      return 0;
    }
  }

  if (version) {
    const v1 = strA.trim().split(/[.-]/u);
    const v2 = strB.trim().split(/[.-]/u);
    const count = Math.max(v1.length, v2.length);
    let order = 0 as -1 | 0 | 1;

    for (let i = 0; order === 0 && i < count; ++i) {
      order = compareStrings(v1[i], v2[i], { natural: true });
    }

    return order || compareNumbers(v1.length, v2.length);
  } else if (natural) {
    const t1 = strA.match(/(\.\d+|\d+|\D+)/gu) ?? [];
    const t2 = strB.match(/(\.\d+|\d+|\D+)/gu) ?? [];
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
  return strA < strB ? -1 : 1;
}
