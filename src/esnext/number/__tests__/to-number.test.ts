import { I32 } from '../../binary/i32.ts';
import { U8 } from '../../binary/u8.ts';

import { toNumber } from '../to-number.ts';

describe('toNumber', () => {
  test('should return numbers', () => {
    expect(toNumber(123456.789)).toBe(123456.789);
  });

  test('should convert bigints', () => {
    expect(toNumber(42n)).toBe(42);
    expect(toNumber(0n)).toBe(0);
    expect(toNumber(-123n)).toBe(-123);
    expect(toNumber(9007199254740991n)).toBe(9007199254740991);
  });

  test('should convert integer wrapper instances', () => {
    expect(toNumber(new I32(100))).toBe(100);
    expect(toNumber(new U8(255))).toBe(255);
    expect(toNumber(new I32(-50))).toBe(-50);
  });
});
