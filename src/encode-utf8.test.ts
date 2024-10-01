import encodeUTF8 from './encode-utf8.js';

// cspell:ignore ΑΒΓΔ 𝐀𝐁𝐂
describe('encodeUTF8', () => {
  test('should not change ASCII', () => {
    expect(encodeUTF8('abcdef')).toBe('abcdef');
    expect(encodeUTF8('\u0000\u0001\u0002\u0003\u007F')).toBe('\u0000\u0001\u0002\u0003\u007F');
  });

  test('should encode codepoints < 0x8000', () => {
    expect(encodeUTF8('¼½¾')).toBe('\u00C2\u00BC\u00C2\u00BD\u00C2\u00BE');
    expect(encodeUTF8('ΑΒΓΔ')).toBe('\u00CE\u0091\u00CE\u0092\u00CE\u0093\u00CE\u0094');
  });

  test('should use encode non astral codepoints', () => {
    expect(encodeUTF8('♀♂')).toBe('\u00E2\u0099\u0080\u00E2\u0099\u0082');
    expect(encodeUTF8('ꭓꭔꭕ')).toBe('\u00EA\u00AD\u0093\u00EA\u00AD\u0094\u00EA\u00AD\u0095');
  });

  test('should should encode astral codepoints', () => {
    expect(encodeUTF8('😀😁😂')).toBe(
      '\u00F0\u009F\u0098\u0080\u00F0\u009F\u0098\u0081\u00F0\u009F\u0098\u0082',
    );
    expect(encodeUTF8('𝐀𝐁𝐂')).toBe(
      '\u00F0\u009D\u0090\u0080\u00F0\u009D\u0090\u0081\u00F0\u009D\u0090\u0082',
    );
  });

  test('should trap bad surrogate pairs', () => {
    expect(() => encodeUTF8('\uD83D')).toThrow();
    expect(() => encodeUTF8('\uD83D\u0000')).toThrow();
  });
});
