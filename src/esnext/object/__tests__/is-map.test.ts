import { isMap } from '../is-map.ts';

describe('isMap', () => {
  test('returns true for Map instances', () => {
    expect(isMap(new Map())).toBeTrue();
    expect(isMap(new Map([['a', 1]]))).toBeTrue();
  });

  test('returns false for non-Map values', () => {
    expect(isMap(null)).toBeFalse();
    expect(isMap(undefined)).toBeFalse();
    expect(isMap({})).toBeFalse();
    expect(isMap([])).toBeFalse();
    expect(isMap(new Set())).toBeFalse();
    expect(isMap('map')).toBeFalse();
  });
});
