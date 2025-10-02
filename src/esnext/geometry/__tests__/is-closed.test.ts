import { type Polygon } from '../geometry.ts';
import { isClosed } from '../is-closed.ts';

describe('isClosed', () => {
  test('returns true for empty polygon', () => {
    const polygon: Polygon = [];
    expect(isClosed(polygon)).toBeTrue();
  });

  test('returns true for single-point polygon', () => {
    const polygon: Polygon = [{ x: 1, y: 2 }];
    expect(isClosed(polygon)).toBeTrue();
  });

  test('returns true when first and last points are identical', () => {
    const polygon: Polygon = [
      { x: 0, y: 0 },
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 0, y: 0 },
    ];
    expect(isClosed(polygon)).toBeTrue();
  });

  test('returns false when first and last points differ', () => {
    const polygon: Polygon = [
      { x: 0, y: 0 },
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 4, y: 5 },
    ];
    expect(isClosed(polygon)).toBeFalse();
  });

  test('returns true for two identical points', () => {
    const polygon: Polygon = [
      { x: 5, y: 5 },
      { x: 5, y: 5 },
    ];
    expect(isClosed(polygon)).toBeTrue();
  });
});
