import { isSurrogateLow } from '../is-surrogate-low.ts';

describe('isSurrogateLow', () => {
  test('should detect low', () => {
    expect(isSurrogateLow('\uD800')).toBeFalse();
    expect(isSurrogateLow('\uDC00')).toBeTrue();
  });

  test('should detect surrogates char codes', () => {
    expect(isSurrogateLow(0x61)).toBeFalse();
    expect(isSurrogateLow(0xd800)).toBeFalse();
    expect(isSurrogateLow(0xdc00)).toBeTrue();
  });

  test('should detect high and low char codes', () => {
    expect(isSurrogateLow(0xd800)).toBeFalse();
    expect(isSurrogateLow(0xdc00)).toBeTrue();
  });
});
