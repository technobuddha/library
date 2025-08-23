import { type Rect } from './@types/geometry.ts';
import { isRect } from './is-rect.ts';

describe('isRect', () => {
  test('returns true for a valid Rect object', () => {
    const rect: Rect = { x: 1, y: 2, width: 3, height: 4 };
    expect(isRect(rect)).toBeTrue();
  });

  test('returns false for null', () => {
    expect(isRect(null)).toBeFalse();
  });

  test('returns false for undefined', () => {
    expect(isRect(undefined)).toBeFalse();
  });

  test('returns false for a number', () => {
    expect(isRect(42)).toBeFalse();
  });

  test('returns false for a string', () => {
    expect(isRect('rect')).toBeFalse();
  });

  test('returns false for an object missing properties', () => {
    expect(isRect({ x: 1, y: 2, width: 3 })).toBeFalse();
    expect(isRect({ x: 1, y: 2, height: 4 })).toBeFalse();
    expect(isRect({ width: 3, height: 4 })).toBeFalse();
  });

  test('returns false for an object with non-numeric properties', () => {
    expect(isRect({ x: '1', y: 2, width: 3, height: 4 })).toBeFalse();
    expect(isRect({ x: 1, y: null, width: 3, height: 4 })).toBeFalse();
    expect(isRect({ x: 1, y: 2, width: '3', height: 4 })).toBeFalse();
    expect(isRect({ x: 1, y: 2, width: 3, height: undefined })).toBeFalse();
  });

  test('returns true for extra properties', () => {
    const rect = { x: 0, y: 0, width: 1, height: 1, color: 'red' };
    expect(isRect(rect)).toBeTrue();
  });

  test('returns false for array', () => {
    expect(isRect([1, 2, 3, 4])).toBeFalse();
  });
});
