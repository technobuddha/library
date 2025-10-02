import { median } from '../median.ts';

describe('median', () => {
  test('returns NaN for an empty array', () => {
    expect(median([])).toBeNaN();
  });

  test('calculates the median of an odd-length array', () => {
    expect(median([1, 3, 2])).toBe(2);
    expect(median([7, 1, 3, 5, 9])).toBe(5);
    expect(median([10])).toBe(10);
  });

  test('calculates the median of an even-length array', () => {
    expect(median([1, 2, 3, 4])).toBe(2.5);
    expect(median([7, 1, 3, 5])).toBe(4);
    expect(median([10, 20])).toBe(15);
  });

  test('calculates the median with negative numbers', () => {
    expect(median([-5, -1, -3])).toBe(-3);
    expect(median([-2, -4, -6, -8])).toBe(-5);
  });

  test('calculates the median with mixed positive and negative numbers', () => {
    expect(median([-10, 0, 10])).toBe(0);
    expect(median([-3, 1, 2, -1])).toBe(0);
  });

  test('calculates the median with floating point numbers', () => {
    expect(median([1.5, 2.5, 3.5])).toBe(2.5);
    expect(median([1.1, 2.2, 3.3, 4.4])).toBeCloseTo(2.75);
  });

  test('does not mutate the original array', () => {
    const arr = [3, 1, 2];
    median(arr);
    expect(arr).toEqual([3, 1, 2]);
  });
});
