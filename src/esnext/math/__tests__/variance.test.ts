import { variance } from '../variance.ts';

describe('variance', () => {
  test('should compute variance', () => {
    expect(variance(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)).toBe(11);
    expect(variance(0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20)).toBe(44);
    expect(variance(-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5)).toBe(11);
    expect(variance(-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10)).toBe(44);
  });

  test('should handle edge cases', () => {
    expect(Number.isNaN(variance())).toBeTrue();
    expect(Number.isNaN(variance(1))).toBeTrue();
  });
});
