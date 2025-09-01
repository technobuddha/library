import { int32 } from './int32.ts';

describe('int32', () => {
  test('returns the same value for 32-bit signed integers', () => {
    expect(int32(0)).toBe(0);
    expect(int32(1)).toBe(1);
    expect(int32(-1)).toBe(-1);
    expect(int32(2147483647)).toBe(2147483647); // Max 32-bit int
    expect(int32(-2147483648)).toBe(-2147483648); // Min 32-bit int
  });

  test('truncates decimals', () => {
    expect(int32(1.9)).toBe(1);
    expect(int32(-1.9)).toBe(-1);
    expect(int32(123.456)).toBe(123);
    expect(int32(-123.456)).toBe(-123);
  });

  test('wraps numbers outside 32-bit signed integer range', () => {
    expect(int32(2147483648)).toBe(-2147483648);
    expect(int32(2147483649)).toBe(-2147483647);
    expect(int32(-2147483649)).toBe(2147483647);
    expect(int32(4294967295)).toBe(-1);
    expect(int32(-4294967296)).toBe(0);
  });

  test('handles special values', () => {
    expect(int32(NaN)).toBe(0);
    expect(int32(Infinity)).toBe(0);
    expect(int32(-Infinity)).toBe(0);
  });

  test('handles very large numbers', () => {
    expect(int32(Number.MAX_SAFE_INTEGER)).toBe(-1);
    expect(int32(Number.MIN_SAFE_INTEGER)).toBe(1);
  });
});
