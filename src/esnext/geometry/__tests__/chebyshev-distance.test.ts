import { chebyshevDistance } from '../chebyshev-distance.ts';

describe('chebyshevDistance', () => {
  test('returns 0 for identical points', () => {
    const a = { x: 3, y: -5 };
    expect(chebyshevDistance(a, a)).toBe(0);
  });

  test('calculates correct distance for positive coordinates', () => {
    const a = { x: 1, y: 2 };
    const b = { x: 4, y: 6 };
    expect(chebyshevDistance(a, b)).toBe(4);
  });

  test('calculates correct distance for negative coordinates', () => {
    const a = { x: -2, y: -3 };
    const b = { x: -5, y: -7 };
    expect(chebyshevDistance(a, b)).toBe(4);
  });

  test('calculates correct distance for mixed sign coordinates', () => {
    const a = { x: -2, y: 3 };
    const b = { x: 5, y: -7 };
    expect(chebyshevDistance(a, b)).toBe(10);
  });

  test('handles zero coordinates', () => {
    const a = { x: 0, y: 0 };
    const b = { x: 4, y: 6 };
    expect(chebyshevDistance(a, b)).toBe(6);
  });

  test('handles one coordinate zero', () => {
    const a = { x: 0, y: 5 };
    const b = { x: 0, y: -5 };
    expect(chebyshevDistance(a, b)).toBe(10);
  });
});
