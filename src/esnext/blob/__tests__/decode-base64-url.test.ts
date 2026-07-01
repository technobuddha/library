import { empty } from '../../unicode/unicode.ts';

import { decodeBase64Url } from '../decode-base64-url.ts';

describe('decodeBase64Url', () => {
  test('should decode ASCII', () => {
    expect(decodeBase64Url('YWJjZGVm', 'utf-8')).toBe('abcdef');
  });

  test('should decode control characters', () => {
    expect(decodeBase64Url('AAECA38', 'utf-8')).toBe('\u{0}\u{1}\u{2}\u{3}\u{7F}');
  });

  test('should decode 2 byte utf-8 sequences', () => {
    expect(decodeBase64Url('wrzCvcK-', 'utf-8')).toBe('¼½¾');
    expect(decodeBase64Url('zpHOks6TzpQ', 'utf-8')).toBe('ΑΒΓΔ');
  });

  test('should decode 3 byte utf-8 sequences', () => {
    expect(decodeBase64Url('4pmA4pmC', 'utf-8')).toBe('♀♂');
    expect(decodeBase64Url('6q2T6q2U6q2V', 'utf-8')).toBe('ꭓꭔꭕ');
  });

  test('should decode 4 byte utf-8 sequences', () => {
    expect(decodeBase64Url('8J-YgPCfmIHwn5iC', 'utf-8')).toBe('😀😁😂');
    expect(decodeBase64Url('8J2QgPCdkIHwnZCC', 'utf-8')).toBe('𝐀𝐁𝐂');
  });

  test('should handle empty string', () => {
    expect(decodeBase64Url(empty, 'utf-8')).toBe(empty);
  });

  test('should decode string of length 1', () => {
    expect(decodeBase64Url('YQ', 'utf-8')).toBe('a');
  });

  test('should decode string of length 2', () => {
    expect(decodeBase64Url('YWI', 'utf-8')).toBe('ab');
  });

  test('should decode string of length 3', () => {
    expect(decodeBase64Url('YWJj', 'utf-8')).toBe('abc');
  });

  test('should decode string of length 4', () => {
    expect(decodeBase64Url('YWJjZA', 'utf-8')).toBe('abcd');
  });

  test('should decode binary', () => {
    expect(Array.from(decodeBase64Url('AAECAwQF-vv8_f7_'))).toStrictEqual([
      0, 1, 2, 3, 4, 5, 250, 251, 252, 253, 254, 255,
    ]);
  });

  test('should decode binary of length 0', () => {
    expect(Array.from(decodeBase64Url(empty))).toStrictEqual([]);
  });

  test('should decode binary of length 1', () => {
    expect(Array.from(decodeBase64Url('AQ'))).toStrictEqual([1]);
  });

  test('should decode binary of length 2', () => {
    expect(Array.from(decodeBase64Url('AQI'))).toStrictEqual([1, 2]);
  });

  test('should decode binary of length 3', () => {
    expect(Array.from(decodeBase64Url('AQID'))).toStrictEqual([1, 2, 3]);
  });

  test('should decode binary of length 4', () => {
    expect(Array.from(decodeBase64Url('AQIDBA'))).toStrictEqual([1, 2, 3, 4]);
  });

  test('should throw on bad input', () => {
    expect(() => decodeBase64Url('!!!!!')).toThrow();
  });
});
