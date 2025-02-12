import { isNaN, isNull, isUndefined } from 'lodash-es';

import { toPrimitive } from './to-primitive.js';

/**
 * Compare two objects
 *
 * @param a - First object
 * @param b - Second object
 * @returns 0 if a == b; -1 if a \< b; 1 if a \> b
 * @group Object
 * @category Comparison
 */
export function compare(a: unknown, b: unknown): number {
  const pa = toPrimitive(a, 'number');
  const pb = toPrimitive(b, 'number');

  if (isUndefined(pa) && isUndefined(pb)) {
    return 0;
  } else if (isUndefined(pa)) {
    return -1;
  } else if (isUndefined(pb)) {
    return 1;
  } else if (isNull(pa) && isNull(pb)) {
    return 0;
  } else if (isNull(pa)) {
    return -1;
  } else if (isNull(pb)) {
    return 1;
  } else if (typeof pa !== 'string' && typeof pb !== 'string') {
    const na = Number(pa);
    const nb = Number(pb);

    if (isNaN(na) && isNaN(pb)) {
      return 0;
    } else if (isNaN(na)) {
      return -1;
    } else if (isNaN(nb)) {
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
