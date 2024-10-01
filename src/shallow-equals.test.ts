import shallowEquals from './shallow-equals.js';

describe('shallowEquals', () => {
  test('computes checksum & build table', () => {
    expect(shallowEquals({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3 })).toBeTrue();
  });

  test('null == null && undefined == undefined', () => {
    expect(shallowEquals(null, null)).toBeTrue();
    expect(shallowEquals()).toBeTrue();
    expect(shallowEquals(undefined, null)).toBeFalse();
    expect(shallowEquals(null)).toBeFalse();
  });

  test('object == self', () => {
    const obj = {};
    expect(shallowEquals(obj, obj)).toBeTrue();
  });

  test('object != null / undefined', () => {
    const obj = {};
    expect(shallowEquals(obj, null)).toBeFalse();
    expect(shallowEquals(obj, null)).toBeFalse();
  });

  test('diff #keys is unequal', () => {
    expect(shallowEquals({ a: 1 }, { a: 1, b: 2 })).toBeFalse();
  });

  test('value comparison is by reference', () => {
    const a = { z: 1 };
    const b = { z: 1 };
    expect(shallowEquals({ q: a }, { q: b })).toBeFalse();
  });

  test('NaN == NaN', () => {
    expect(shallowEquals({ q: Number.NaN }, { q: Number.NaN })).toBeTrue();
  });

  test('-0 != 0', () => {
    expect(shallowEquals({ q: 0 }, { q: -0 })).toBeFalse();
  });
});
