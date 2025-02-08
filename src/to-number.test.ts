import { toNumber } from './to-number.js';

describe('toNumber', () => {
  test('should return numbers', () => {
    expect(toNumber(123456.789)).toBe(123456.789);
  });

  test('should convert strings', () => {
    expect(toNumber('123456.789')).toBe(123456.789);
  });

  test('should convert booleans', () => {
    expect(toNumber(false)).toBe(0);
    expect(toNumber(true)).toBe(1);
  });

  test('convert other types are NaN', () => {
    expect(toNumber({})).toBeNaN();
  });
});
