import { empty } from '../../unicode/unicode.ts';

import { encodeBase64 } from '../encode-base64.ts';

describe('encodeBase64', () => {
  test('should encode ASCII', () => {
    expect(encodeBase64('abcdef', 'utf-8')).toBe('YWJjZGVm');
  });

  test('should encode control characters', () => {
    expect(encodeBase64('\u{0}\u{1}\u{2}\u{3}\u{7F}', 'utf-8')).toBe('AAECA38=');
  });

  test('should encode 2 byte utf-8 sequences', () => {
    expect(encodeBase64('¼½¾', 'utf-8')).toBe('wrzCvcK+');
    expect(encodeBase64('ΑΒΓΔ', 'utf-8')).toBe('zpHOks6TzpQ=');
  });

  test('should encode 3 byte utf-8 sequences', () => {
    expect(encodeBase64('♀♂', 'utf-8')).toBe('4pmA4pmC');
    expect(encodeBase64('ꭓꭔꭕ', 'utf-8')).toBe('6q2T6q2U6q2V');
  });

  test('should encode 4 byte utf-8 sequences', () => {
    expect(encodeBase64('😀😁😂', 'utf-8')).toBe('8J+YgPCfmIHwn5iC');
    expect(encodeBase64('𝐀𝐁𝐂', 'utf-8')).toBe('8J2QgPCdkIHwnZCC');
  });

  test('should trap bad surrogate pairs', () => {
    expect(encodeBase64('\u{D83D}', 'utf-8')).toBe('74+9');
    expect(encodeBase64('\u{D83D}\u{0}', 'utf-8')).toBe('74+9');
  });

  test('should handle empty string', () => {
    expect(encodeBase64(empty, 'utf-8')).toBe(empty);
  });

  test('should encode string of length 1', () => {
    expect(encodeBase64('a', 'utf-8')).toBe('YQ==');
  });

  test('should encode string of length 2', () => {
    expect(encodeBase64('ab', 'utf-8')).toBe('YWI=');
  });

  test('should encode string of length 3', () => {
    expect(encodeBase64('abc', 'utf-8')).toBe('YWJj');
  });

  test('should encode string of length 4', () => {
    expect(encodeBase64('abcd', 'utf-8')).toBe('YWJjZA==');
  });

  test('should encode binary', () => {
    expect(encodeBase64(new Uint8Array([0, 1, 2, 3, 4, 5, 250, 251, 252, 253, 254, 255]))).toBe(
      'AAECAwQF+vv8/f7/',
    );
  });

  test('should encode binary of length 0', () => {
    expect(encodeBase64(new Uint8Array(0))).toBe(empty);
  });

  test('should encode binary of length 1', () => {
    expect(encodeBase64(new Uint8Array([1]))).toBe('AQ==');
  });

  test('should encode binary of length 2', () => {
    expect(encodeBase64(new Uint8Array([1, 2]))).toBe('AQI=');
  });

  test('should encode binary of length 3', () => {
    expect(encodeBase64(new Uint8Array([1, 2, 3]))).toBe('AQID');
  });

  test('should encode binary of length 4', () => {
    expect(encodeBase64(new Uint8Array([1, 2, 3, 4]))).toBe('AQIDBA==');
  });
});
