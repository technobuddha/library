// cspell:ignore ΑΒΓΔ AAEC AQID AQIDBA

import { empty } from './constants.ts';
import { encodeBase64, encodeBase64Url } from './encode-base-64.ts';

describe('encodeBase64', () => {
  test('should encode ASCII', () => {
    expect(encodeBase64('abcdef', 'utf8')).toBe('YWJjZGVm');
  });

  test('should encode control characters', () => {
    expect(encodeBase64('\u0000\u0001\u0002\u0003\u007F', 'utf8')).toBe('AAECA38=');
  });

  test('should encode 2 byte utf-8 sequences', () => {
    expect(encodeBase64('¼½¾', 'utf8')).toBe('wrzCvcK+');
    expect(encodeBase64('ΑΒΓΔ', 'utf8')).toBe('zpHOks6TzpQ=');
  });

  test('should encode 3 byte utf-8 sequences', () => {
    expect(encodeBase64('♀♂', 'utf8')).toBe('4pmA4pmC');
    expect(encodeBase64('ꭓꭔꭕ', 'utf8')).toBe('6q2T6q2U6q2V');
  });

  test('should encode 4 byte utf-8 sequences', () => {
    expect(encodeBase64('😀😁😂', 'utf8')).toBe('8J+YgPCfmIHwn5iC');
    expect(encodeBase64('𝐀𝐁𝐂', 'utf8')).toBe('8J2QgPCdkIHwnZCC');
  });

  test('should trap bad surrogate pairs', () => {
    expect(encodeBase64('\uD83D', 'utf8')).toBe('74+9');
    expect(encodeBase64('\uD83D\u0000', 'utf8')).toBe('74+9');
  });

  test('should handle empty string', () => {
    expect(encodeBase64(empty, 'utf8')).toBe(empty);
  });

  test('should encode string of length 1', () => {
    expect(encodeBase64('a', 'utf8')).toBe('YQ==');
  });

  test('should encode string of length 2', () => {
    expect(encodeBase64('ab', 'utf8')).toBe('YWI=');
  });

  test('should encode string of length 3', () => {
    expect(encodeBase64('abc', 'utf8')).toBe('YWJj');
  });

  test('should encode string of length 4', () => {
    expect(encodeBase64('abcd', 'utf8')).toBe('YWJjZA==');
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

describe('encodeBase64Url', () => {
  test('should encode ASCII', () => {
    expect(encodeBase64Url('abcdef', 'utf8')).toBe('YWJjZGVm');
  });

  test('should encode control characters', () => {
    expect(encodeBase64Url('\u0000\u0001\u0002\u0003\u007F', 'utf8')).toBe('AAECA38');
  });

  test('should encode 2 byte utf-8 sequences', () => {
    expect(encodeBase64Url('¼½¾', 'utf8')).toBe('wrzCvcK-');
    expect(encodeBase64Url('ΑΒΓΔ', 'utf8')).toBe('zpHOks6TzpQ');
  });

  test('should encode 3 byte utf-8 sequences', () => {
    expect(encodeBase64Url('♀♂', 'utf8')).toBe('4pmA4pmC');
    expect(encodeBase64Url('ꭓꭔꭕ', 'utf8')).toBe('6q2T6q2U6q2V');
  });

  test('should encode 4 byte utf-8 sequences', () => {
    expect(encodeBase64Url('😀😁😂', 'utf8')).toBe('8J-YgPCfmIHwn5iC');
    expect(encodeBase64Url('𝐀𝐁𝐂', 'utf8')).toBe('8J2QgPCdkIHwnZCC');
  });

  test('should trap bad surrogate pairs', () => {
    expect(encodeBase64Url('\uD83D', 'utf8')).toBe('74-9');
    expect(encodeBase64Url('\uD83D\u0000', 'utf8')).toBe('74-9');
  });

  test('should handle empty string', () => {
    expect(encodeBase64Url(empty, 'utf8')).toBe(empty);
  });

  test('should encode string of length 1', () => {
    expect(encodeBase64Url('a', 'utf8')).toBe('YQ');
  });

  test('should encode string of length 2', () => {
    expect(encodeBase64Url('ab', 'utf8')).toBe('YWI');
  });

  test('should encode string of length 3', () => {
    expect(encodeBase64Url('abc', 'utf8')).toBe('YWJj');
  });

  test('should encode string of length 4', () => {
    expect(encodeBase64Url('abcd', 'utf8')).toBe('YWJjZA');
  });

  test('should encode binary', () => {
    expect(encodeBase64Url(new Uint8Array([0, 1, 2, 3, 4, 5, 250, 251, 252, 253, 254, 255]))).toBe(
      'AAECAwQF-vv8_f7_',
    );
  });

  test('should encode binary of length 0', () => {
    expect(encodeBase64Url(new Uint8Array(0))).toBe(empty);
  });

  test('should encode binary of length 1', () => {
    expect(encodeBase64Url(new Uint8Array([1]))).toBe('AQ');
  });

  test('should encode binary of length 2', () => {
    expect(encodeBase64Url(new Uint8Array([1, 2]))).toBe('AQI');
  });

  test('should encode binary of length 3', () => {
    expect(encodeBase64Url(new Uint8Array([1, 2, 3]))).toBe('AQID');
  });

  test('should encode binary of length 4', () => {
    expect(encodeBase64Url(new Uint8Array([1, 2, 3, 4]))).toBe('AQIDBA');
  });
});
