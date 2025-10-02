import { lineIntersection } from '../line-intersection.ts';

describe('lineIntersection', () => {
  test('returns intersection point for crossing segments', () => {
    const a = { x0: 0, y0: 0, x1: 4, y1: 4 };
    const b = { x0: 0, y0: 4, x1: 4, y1: 0 };
    const result = lineIntersection(a, b);
    expect(result).toEqual({ x: 2, y: 2 });
  });

  test('returns undefined for non-intersecting segments', () => {
    const a = { x0: 0, y0: 0, x1: 1, y1: 1 };
    const b = { x0: 2, y0: 2, x1: 3, y1: 3 };
    const result = lineIntersection(a, b);
    expect(result).toBeUndefined();
  });

  test('returns undefined for parallel segments', () => {
    const a = { x0: 0, y0: 0, x1: 1, y1: 1 };
    const b = { x0: 0, y0: 1, x1: 1, y1: 2 };
    const result = lineIntersection(a, b);
    expect(result).toBeUndefined();
  });

  test('returns undefined for coincident segments', () => {
    const a = { x0: 0, y0: 0, x1: 2, y1: 2 };
    const b = { x0: 1, y0: 1, x1: 3, y1: 3 };
    const result = lineIntersection(a, b);
    expect(result).toBeUndefined();
  });

  test('returns intersection point for infinite lines (extend=true)', () => {
    const a = { x0: 0, y0: 0, x1: 1, y1: 0 };
    const b = { x0: 0.5, y0: -1, x1: 0.5, y1: 1 };
    const result = lineIntersection(a, b, true);
    expect(result).toEqual({ x: 0.5, y: 0 });
  });

  test('returns null if intersection is outside segments and extend=false', () => {
    const a = { x0: 0, y0: 0, x1: 1, y1: 0 };
    const b = { x0: 2, y0: -1, x1: 2, y1: 1 };
    const result = lineIntersection(a, b, false);
    expect(result).toBeNull();
  });

  test('returns intersection at segment endpoint', () => {
    const a = { x0: 0, y0: 0, x1: 2, y1: 2 };
    const b = { x0: 2, y0: 2, x1: 2, y1: 0 };
    const result = lineIntersection(a, b);
    expect(result).toEqual({ x: 2, y: 2 });
  });

  test('returns intersection for vertical and horizontal lines', () => {
    const a = { x0: 1, y0: 0, x1: 1, y1: 2 };
    const b = { x0: 0, y0: 1, x1: 2, y1: 1 };
    const result = lineIntersection(a, b);
    expect(result).toEqual({ x: 1, y: 1 });
  });
});
