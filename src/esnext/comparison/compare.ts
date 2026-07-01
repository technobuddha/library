import { toPrimitive } from '../primitive/to-primitive.ts';

/**
 * Compare two objects
 * @param a - First object
 * @param b - Second object
 * @returns
 * - 0 if a == b
 * - -1 if a \< b
 * - 1 if a \> b
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
 * @group Object
 * @category Comparison
 */
export function compare(a: unknown, b: unknown): number {
  const pa = toPrimitive(a, 'number');
  const pb = toPrimitive(b, 'number');

  if (pa === undefined && pb === undefined) {
    return 0;
  }
  if (pa === undefined) {
    return -1;
  }
  if (pb === undefined) {
    return 1;
  }
  if (pa === null && pb === null) {
    return 0;
  }
  if (pa === null) {
    return -1;
  }
  if (pb === null) {
    return 1;
  }
  if (typeof pa !== 'string' && typeof pb !== 'string') {
    const na = Number(pa);
    const nb = Number(pb);

    if (Number.isNaN(na) && Number.isNaN(nb)) {
      return 0;
    }
    if (Number.isNaN(na)) {
      return -1;
    }
    if (Number.isNaN(nb)) {
      return 1;
    }
    if (na === nb) {
      return 0;
    }
    if (na < nb) {
      return -1;
    }
    return 1;
  }
  if (pa === pb) {
    return 0;
  }
  if ((pa as number) < (pb as number)) {
    return -1;
  }
  return 1;
}
