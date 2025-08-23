import { lineLength } from './line-length.ts';

describe('lineLength', () => {
  test('returns 0 for a zero-length line', () => {
    expect(lineLength({ x0: 0, y0: 0, x1: 0, y1: 0 })).toBe(0);
  });

  test('calculates length for a horizontal line', () => {
    expect(lineLength({ x0: 1, y0: 2, x1: 4, y1: 2 })).toBe(3);
  });

  test('calculates length for a vertical line', () => {
    expect(lineLength({ x0: 3, y0: 1, x1: 3, y1: 5 })).toBe(4);
  });

  test('calculates length for a diagonal line', () => {
    expect(lineLength({ x0: 0, y0: 0, x1: 3, y1: 4 })).toBe(5);
  });

  test('works with negative coordinates', () => {
    expect(lineLength({ x0: -1, y0: -1, x1: -4, y1: -5 })).toBe(5);
  });

  test('works with mixed positive and negative coordinates', () => {
    expect(lineLength({ x0: -2, y0: 3, x1: 2, y1: -1 })).toBeCloseTo(5.65685, 5);
  });
});
