import { mean } from './mean.ts';

describe('mean', () => {
  test('calculates the mean of positive numbers', () => {
    expect(mean([1, 2, 3, 4, 5])).toBe(3);
  });

  test('calculates the mean of negative numbers', () => {
    expect(mean([-2, -4, -6])).toBe(-4);
  });

  test('calculates the mean of mixed positive and negative numbers', () => {
    expect(mean([10, -10, 20, -20])).toBe(0);
  });

  test('calculates the mean of a single number', () => {
    expect(mean([42])).toBe(42);
  });

  test('returns NaN for an empty array', () => {
    expect(mean([])).toBeNaN();
  });

  test('calculates the mean with floating point numbers', () => {
    expect(mean([1.5, 2.5, 3.5])).toBeCloseTo(2.5);
  });
});
