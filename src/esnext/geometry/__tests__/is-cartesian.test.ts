import { type Cartesian } from '../geometry.ts';
import { isCartesian } from '../is-cartesian.ts';

describe('isCartesian', () => {
  test('returns true for valid Cartesian point', () => {
    const point: Cartesian = { x: 1, y: -2 };
    expect(isCartesian(point)).toBeTrue();
  });

  test('returns false for object missing x', () => {
    const point = { y: 2 };
    expect(isCartesian(point)).toBeFalse();
  });

  test('returns false for object missing y', () => {
    const point = { x: 2 };
    expect(isCartesian(point)).toBeFalse();
  });

  test('returns false for object with non-numeric x', () => {
    const point = { x: 'a', y: 2 };
    expect(isCartesian(point)).toBeFalse();
  });

  test('returns false for object with non-numeric y', () => {
    const point = { x: 1, y: null };
    expect(isCartesian(point)).toBeFalse();
  });

  test('returns false for null', () => {
    expect(isCartesian(null)).toBeFalse();
  });

  test('returns false for undefined', () => {
    expect(isCartesian(undefined)).toBeFalse();
  });

  test('returns false for array', () => {
    expect(isCartesian([1, 2])).toBeFalse();
  });

  test('returns false for primitive values', () => {
    expect(isCartesian(42)).toBeFalse();
    expect(isCartesian('foo')).toBeFalse();
    expect(isCartesian(true)).toBeFalse();
  });

  test('returns true for object with extra properties', () => {
    const point = { x: 3, y: 4, z: 5 };
    expect(isCartesian(point)).toBeTrue();
  });
});
