import { isSurrogateHigh } from '../is-surrogate-high.ts';

describe('isSurrogateHigh', () => {
  test('should detect high', () => {
    expect(isSurrogateHigh('a')).toBeFalse();
    expect(isSurrogateHigh('\u{D800}')).toBeTrue();
    expect(isSurrogateHigh('\u{DC00}')).toBeFalse();
  });

  test('should detect high and low', () => {
    expect(isSurrogateHigh('\u{D800}')).toBeTrue();
    expect(isSurrogateHigh('\u{DC00}')).toBeFalse();
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
