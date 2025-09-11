import { toPrimitive } from './to-primitive.ts';

/**
 * Compare two objects
 * @param a - First object
 * @param b - Second object
 * @returns
 * - 0 if a == b
 * - -1 if a \< b
 * - 1 if a \> b
 * @group Object
 * @category Comparison
 * @example
 * ```typescript
 * compare(1, 2); // -1
 * compare(2, 1); // 1
 * compare(2, 2); // 0
 * compare('a', 'b'); // -1
 * compare('b', 'a'); // 1
 * compare('a', 'a'); // 0
 * compare(null, undefined); // -1
 * compare(undefined, undefined); // 0
 * compare(NaN, NaN); // 0
 * ```
 */
export function compare(a: unknown, b: unknown): number {
  const pa = toPrimitive(a, 'number');
  const pb = toPrimitive(b, 'number');

  if (pa === undefined && pb === undefined) {
    return 0;
  } else if (pa === undefined) {
    return -1;
  } else if (pb === undefined) {
    return 1;
  } else if (pa === null && pb === null) {
    return 0;
  } else if (pa === null) {
    return -1;
  } else if (pb === null) {
    return 1;
  } else if (typeof pa !== 'string' && typeof pb !== 'string') {
    const na = Number(pa);
    const nb = Number(pb);

    if (Number.isNaN(na) && Number.isNaN(nb)) {
      return 0;
    } else if (Number.isNaN(na)) {
      return -1;
    } else if (Number.isNaN(nb)) {
      return 1;
    } else if (na === nb) {
      return 0;
    } else if (na < nb) {
      return -1;
    }
    return 1;
  }
  if (pa === pb) {
    return 0;
  } else if ((pa as number) < (pb as number)) {
    return -1;
  }
  return 1;
}
