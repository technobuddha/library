import { negativeZero } from '../../math/constants.ts';

import { pad } from '../pad.ts';

describe('pad', () => {
  test('should handle positive numbers', () => {
    expect(pad(0)).toBe('00');
    expect(pad(1)).toBe('01');
    expect(pad(10)).toBe('10');
    expect(pad(100)).toBe('100');
  });

  test('should handle negative numbers', () => {
    expect(pad(-0)).toBe('00');
    expect(pad(-1)).toBe('-1');
    expect(pad(-10)).toBe('-10');
    expect(pad(-100)).toBe('-100');
  });

  test('should handle different lengths', () => {
    expect(pad(0, 10)).toBe('0000000000');
    expect(pad(1, 10)).toBe('0000000001');
    expect(pad(10, 10)).toBe('0000000010');
    expect(pad(100, 10)).toBe('0000000100');
    expect(pad(-0, 10)).toBe('0000000000');
    expect(pad(-1, 10)).toBe('-000000001');
    expect(pad(-10, 10)).toBe('-000000010');
    expect(pad(-100, 10)).toBe('-000000100');
  });

  test('should handle special numbers', () => {
    expect(pad(negativeZero)).toBe('00');
    expect(pad(Number.NaN)).toBe('NaN');
    expect(pad(Infinity)).toBe('Infinity');
    expect(pad(-Infinity)).toBe('-Infinity');

    expect(pad(negativeZero, 10)).toBe('0000000000');
    expect(pad(Number.NaN, 10)).toBe('       NaN');
    expect(pad(Infinity, 10)).toBe('  Infinity');
    expect(pad(-Infinity, 10)).toBe(' -Infinity');
  });
});
