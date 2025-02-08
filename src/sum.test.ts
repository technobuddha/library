import { sum } from './sum.ts';

describe('sum', () => {
  test('returns 0 for an empty array', () => {
    expect(sum([])).toBe(0);
  });

  test('returns the number itself for a single-element array', () => {
    expect(sum([5])).toBe(5);
    expect(sum([-3])).toBe(-3);
  });

  test('returns the sum of positive numbers', () => {
    expect(sum([1, 2, 3, 4])).toBe(10);
  });

  test('returns the sum of negative numbers', () => {
    expect(sum([-1, -2, -3, -4])).toBe(-10);
  });

  test('returns the sum of mixed positive and negative numbers', () => {
    expect(sum([10, -5, 3, -2])).toBe(6);
  });

  test('handles array with zeros', () => {
    expect(sum([0, 0, 0])).toBe(0);
    expect(sum([0, 1, 2])).toBe(3);
  });

  test('handles floating point numbers', () => {
    expect(sum([0.1, 0.2, 0.3])).toBeCloseTo(0.6, 10);
  });
});
