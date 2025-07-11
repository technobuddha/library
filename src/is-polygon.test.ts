import { isPolygon } from './is-polygon.ts';

describe('isPolygon', () => {
  test('returns true for a valid polygon (array of cartesian points)', () => {
    const polygon = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 0, y: 1 },
    ];
    expect(isPolygon(polygon)).toBeTrue();
  });

  test('returns true for an empty array', () => {
    expect(isPolygon([])).toBeTrue();
  });

  test('returns false for array with non-cartesian objects', () => {
    const invalidPolygon = [
      { x: 0, y: 0 },
      { x: 1, z: 0 },
      { x: 1, y: 1 },
    ];
    expect(isPolygon(invalidPolygon)).toBeFalse();
  });

  test('returns false for non-array input', () => {
    expect(isPolygon({ x: 0, y: 0 })).toBeFalse();
    expect(isPolygon('not an array')).toBeFalse();
    expect(isPolygon(123)).toBeFalse();
    expect(isPolygon(null)).toBeFalse();
    expect(isPolygon(undefined)).toBeFalse();
  });

  test('returns false for array with primitives', () => {
    expect(isPolygon([1, 2, 3])).toBeFalse();
    expect(isPolygon(['a', 'b', 'c'])).toBeFalse();
  });

  test('returns false for array with mixed valid and invalid points', () => {
    const mixed = [{ x: 0, y: 0 }, 42, { x: 1, y: 1 }];
    expect(isPolygon(mixed)).toBeFalse();
  });
});
