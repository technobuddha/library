import { isSet } from '../is-set.ts';

describe('isSet', () => {
  test('returns true for Set instances', () => {
    expect(isSet(new Set())).toBeTrue();
    expect(isSet(new Set(['a', 'b']))).toBeTrue();
  });

  test('returns false for non-Set values', () => {
    expect(isSet(null)).toBeFalse();
    expect(isSet(undefined)).toBeFalse();
    expect(isSet({})).toBeFalse();
    expect(isSet([])).toBeFalse();
    expect(isSet(new Map())).toBeFalse();
    expect(isSet('set')).toBeFalse();
  });
});
