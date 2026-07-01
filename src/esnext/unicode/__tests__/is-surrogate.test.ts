import { isSurrogate } from '../is-surrogate.ts';

describe('isSurrogate', () => {
  test('should detect surrogates', () => {
    expect(isSurrogate('a')).toBeFalse();
    expect(isSurrogate('\u{D800}')).toBeTrue();
    expect(isSurrogate('\u{DC00}')).toBeTrue();
  });

  test('should detect surrogates char codes', () => {
    expect(isSurrogate(0x61)).toBeFalse();
    expect(isSurrogate(0xd800)).toBeTrue();
    expect(isSurrogate(0xdc00)).toBeTrue();
  });
});
