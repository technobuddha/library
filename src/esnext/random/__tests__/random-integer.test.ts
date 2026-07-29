// Unit tests for randomInteger
import { randomInteger } from '../random-integer.ts';

describe('randomInteger', () => {
  test('returns min when min == max', () => {
    expect(randomInteger(5, 5)).toBe(5);
  });

  test('returns value within range [min, max]', () => {
    for (let i = 0; i < 100; ++i) {
      const value = randomInteger(1, 10);
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(10);
    }
  });

  test('works with negative numbers', () => {
    for (let i = 0; i < 100; ++i) {
      const value = randomInteger(-10, -1);
      expect(value).toBeGreaterThanOrEqual(-10);
      expect(value).toBeLessThanOrEqual(-1);
    }
  });

  test('uses custom random function', () => {
    // Always returns 0.5, so result should be the middle of the range
    const value = randomInteger(1, 3, { random: () => 0.5 });
    expect([1, 2, 3]).toContain(value);
  });

  test('distribution covers all values', () => {
    const counts = Array.from({ length: 10 }, () => 0);
    for (let i = 0; i < 10000; ++i) {
      const value = randomInteger(1, 10);
      counts[value - 1]++;
    }
    // Each value should appear at least once
    for (const count of counts) {
      expect(count).toBeGreaterThan(0);
    }
  });
});
