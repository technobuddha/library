import { isSurrogate } from './is-surrogate.js';

describe('isSurrogate', () => {
  test('should detect surrogates', () => {
    expect(isSurrogate('a')).toBeFalse();
    expect(isSurrogate('\uD800')).toBeTrue();
    expect(isSurrogate('\uDC00')).toBeTrue();
  });

  test('should detect high and low', () => {
    expect(isSurrogate('\uD800', { high: false })).toBeFalse();
    expect(isSurrogate('\uDC00', { high: false })).toBeTrue();
    expect(isSurrogate('\uD800', { low: false })).toBeTrue();
    expect(isSurrogate('\uDC00', { low: false })).toBeFalse();
  });
});
