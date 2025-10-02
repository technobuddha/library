import { empty } from '../../unicode/unicode.ts';

import { decodeBase64 } from '../decode-base64.ts';

describe('decodeBase64', () => {
  test('should decode ASCII', () => {
    expect(decodeBase64('YWJjZGVm', 'utf-8')).toBe('abcdef');
  });

  test('should decode control characters', () => {
    expect(decodeBase64('AAECA38=', 'utf-8')).toBe('\u0000\u0001\u0002\u0003\u007F');
  });

  test('should decode 2 byte utf-8 sequences', () => {
    expect(decodeBase64('wrzCvcK+', 'utf-8')).toBe('¼½¾');
    expect(decodeBase64('zpHOks6TzpQ=', 'utf-8')).toBe('ΑΒΓΔ');
  });

  test('should decode 3 byte utf-8 sequences', () => {
    expect(decodeBase64('4pmA4pmC', 'utf-8')).toBe('♀♂');
    expect(decodeBase64('6q2T6q2U6q2V', 'utf-8')).toBe('ꭓꭔꭕ');
  });

  test('should decode 4 byte utf-8 sequences', () => {
    expect(decodeBase64('8J+YgPCfmIHwn5iC', 'utf-8')).toBe('😀😁😂');
    expect(decodeBase64('8J2QgPCdkIHwnZCC', 'utf-8')).toBe('𝐀𝐁𝐂');
  });

  test('should handle empty string', () => {
    expect(decodeBase64(empty, 'utf-8')).toBe(empty);
  });

  test('should decode string of length 1', () => {
    expect(decodeBase64('YQ==', 'utf-8')).toBe('a');
  });

  test('should decode string of length 2', () => {
    expect(decodeBase64('YWI=', 'utf-8')).toBe('ab');
  });

  test('should decode string of length 3', () => {
    expect(decodeBase64('YWJj', 'utf-8')).toBe('abc');
  });

  test('should decode string of length 4', () => {
    expect(decodeBase64('YWJjZA==', 'utf-8')).toBe('abcd');
  });

  test('should decode binary', () => {
    expect(Array.from(decodeBase64('AAECAwQF+vv8/f7/'))).toStrictEqual([
      0, 1, 2, 3, 4, 5, 250, 251, 252, 253, 254, 255,
    ]);
  });

  test('should decode binary of length 0', () => {
    expect(Array.from(decodeBase64(empty))).toStrictEqual([]);
  });

  test('should decode binary of length 1', () => {
    expect(Array.from(decodeBase64('AQ=='))).toStrictEqual([1]);
  });

  test('should decode binary of length 2', () => {
    expect(Array.from(decodeBase64('AQI='))).toStrictEqual([1, 2]);
  });

  test('should decode binary of length 3', () => {
    expect(Array.from(decodeBase64('AQID'))).toStrictEqual([1, 2, 3]);
  });

  test('should decode binary of length 4', () => {
    expect(Array.from(decodeBase64('AQIDBA=='))).toStrictEqual([1, 2, 3, 4]);
  });

  test('should throw on bad input', () => {
    expect(() => decodeBase64('!!!!!')).toThrow();
  });

  test('should decode base64 with whitespace in the middle', () => {
    expect(decodeBase64('YWJj ZGVm', 'utf-8')).toBe('abcdef');
    expect(decodeBase64('YWJj\tZGVm', 'utf-8')).toBe('abcdef');
    expect(decodeBase64('YWJj\nZGVm', 'utf-8')).toBe('abcdef');
    expect(decodeBase64('YWJj\rZGVm', 'utf-8')).toBe('abcdef');
    expect(decodeBase64('YWJj\fZGVm', 'utf-8')).toBe('abcdef');
    expect(decodeBase64('YWJj\vZGVm', 'utf-8')).toBe('abcdef');
  });
});
