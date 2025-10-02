import { type Polygon } from '../geometry.ts';
import { toClosed } from '../to-closed.ts';

describe('toClosed', () => {
  test('returns empty array for empty polygon', () => {
    const polygon: Polygon = [];
    expect(toClosed(polygon)).toEqual([]);
  });

  test('returns same array for single-point polygon', () => {
    const polygon: Polygon = [{ x: 1, y: 2 }];
    expect(toClosed(polygon)).toEqual([{ x: 1, y: 2 }]);
  });

  test('returns same array if already closed', () => {
    const polygon: Polygon = [
      { x: 0, y: 0 },
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 0, y: 0 },
    ];
    expect(toClosed(polygon)).toEqual(polygon);
  });

  test('appends first point if not closed', () => {
    const polygon: Polygon = [
      { x: 0, y: 0 },
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 4, y: 5 },
    ];
    expect(toClosed(polygon)).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 4, y: 5 },
      { x: 0, y: 0 },
    ]);
  });

  test('returns same array for two identical points', () => {
    const polygon: Polygon = [
      { x: 5, y: 5 },
      { x: 5, y: 5 },
    ];
    expect(toClosed(polygon)).toEqual(polygon);
  });
});
