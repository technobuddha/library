import { decodeUTF8 } from './decode-utf8.js';

describe('decodeUTF8', () => {
  test('should not change ASCII', () => {
    expect(decodeUTF8('abcdef')).toBe('abcdef');
    expect(decodeUTF8('\u0000\u0001\u0002\u0003\u007F')).toBe('\u0000\u0001\u0002\u0003\u007F');
  });

  test('should decode codepoints < 0x8000', () => {
    expect(decodeUTF8('\u00C2\u00BC\u00C2\u00BD\u00C2\u00BE')).toBe('¼½¾');
    expect(decodeUTF8('\u00CE\u0091\u00CE\u0092\u00CE\u0093\u00CE\u0094')).toBe('ΑΒΓΔ');
  });

  test('should use decode non astral codepoints', () => {
    expect(decodeUTF8('\u00E2\u0099\u0080\u00E2\u0099\u0082')).toBe('♀♂');
    expect(decodeUTF8('\u00EA\u00AD\u0093\u00EA\u00AD\u0094\u00EA\u00AD\u0095')).toBe('ꭓꭔꭕ');
  });

  test('should should decode astral codepoints', () => {
    expect(
      decodeUTF8('\u00F0\u009F\u0098\u0080\u00F0\u009F\u0098\u0081\u00F0\u009F\u0098\u0082'),
    ).toBe('😀😁😂');
    expect(
      decodeUTF8('\u00F0\u009D\u0090\u0080\u00F0\u009D\u0090\u0081\u00F0\u009D\u0090\u0082'),
    ).toBe('𝐀𝐁𝐂');
  });

  test('should trap bad surrogate pairs', () => {
    expect(() => decodeUTF8('\u00C0')).toThrow();
    expect(() => decodeUTF8('\u00C0\u0000')).toThrow();
    expect(() => decodeUTF8('\u00E0')).toThrow();
    expect(() => decodeUTF8('\u00E0\u0080')).toThrow();
    expect(() => decodeUTF8('\u00E0\u0000')).toThrow();
    expect(() => decodeUTF8('\u00E0\u0080\u0000')).toThrow();
    expect(() => decodeUTF8('\u00F0')).toThrow();
    expect(() => decodeUTF8('\u00F0\u0080')).toThrow();
    expect(() => decodeUTF8('\u00F0\u0000')).toThrow();
    expect(() => decodeUTF8('\u00F0\u0080\u0080')).toThrow();
    expect(() => decodeUTF8('\u00F0\u0000\u0080')).toThrow();
    expect(() => decodeUTF8('\u00F0\u0080\u0080\u0000')).toThrow();
    expect(() => decodeUTF8('\u00F4\u00BF\u00BF\u00BF')).toThrow();
    expect(() => decodeUTF8('\u00F9')).toThrow();
  });
});
