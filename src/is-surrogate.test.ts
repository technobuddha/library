import { isSurrogate, isSurrogateHigh, isSurrogateLow } from './is-surrogate.ts';

describe('isSurrogate', () => {
  test('should detect surrogates', () => {
    expect(isSurrogate('a')).toBeFalse();
    expect(isSurrogate('\uD800')).toBeTrue();
    expect(isSurrogate('\uDC00')).toBeTrue();
  });

  test('should detect surrogates char codes', () => {
    expect(isSurrogate(0x61)).toBeFalse();
    expect(isSurrogate(0xd800)).toBeTrue();
    expect(isSurrogate(0xdc00)).toBeTrue();
  });
});

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

describe('isSurrogateHigh', () => {
  test('should detect high', () => {
    expect(isSurrogateHigh('a')).toBeFalse();
    expect(isSurrogateHigh('\uD800')).toBeTrue();
    expect(isSurrogateHigh('\uDC00')).toBeFalse();
  });

  test('should detect high and low', () => {
    expect(isSurrogateHigh('\uD800')).toBeTrue();
    expect(isSurrogateHigh('\uDC00')).toBeFalse();
  });

  test('should detect surrogates char codes', () => {
    expect(isSurrogateHigh(0x61)).toBeFalse();
    expect(isSurrogateHigh(0xd800)).toBeTrue();
    expect(isSurrogateHigh(0xdc00)).toBeFalse();
  });

  test('should detect high and low char codes', () => {
    expect(isSurrogateHigh(0xd800)).toBeTrue();
    expect(isSurrogateHigh(0xdc00)).toBeFalse();
  });
});
