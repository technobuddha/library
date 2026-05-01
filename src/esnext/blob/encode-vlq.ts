import { empty } from '../unicode/unicode.ts';

import { integerToChar } from './vlq.ts';

export function encodeVLQ(value: number | number[]): string {
  if (typeof value === 'number') {
    return encodeInteger(value);
  }

  return value.reduce((result, num) => result + encodeInteger(num), empty);
}

function encodeInteger(num: number): string {
  let int = num;
  let result = empty;

  if (int < 0) {
    int = (-int << 1) | 1;
  } else {
    int <<= 1;
  }

  do {
    let clamped = int & 31;
    int >>>= 5;

    if (int > 0) {
      clamped |= 32;
    }

    result += integerToChar[clamped];
  } while (int > 0);

  return result;
}
