import { encodeUTF32 } from '../encode-utf32.ts';

describe('encodeUTF32', () => {
  test('should encode ASCII characters', () => {
    expect(Array.from(encodeUTF32('ABC'))).toEqual([0x41, 0x42, 0x43]);
  });

  test('should encode BMP characters', () => {
    expect(Array.from(encodeUTF32('¼½¾'))).toEqual([0xbc, 0xbd, 0xbe]);
    expect(Array.from(encodeUTF32('ΑΒΓΔ'))).toEqual([0x391, 0x392, 0x393, 0x394]);
  });

  test('should encode supplementary plane characters (emoji)', () => {
    expect(Array.from(encodeUTF32('😀😁😂'))).toEqual([0x1f600, 0x1f601, 0x1f602]);
    expect(Array.from(encodeUTF32('💡'))).toEqual([0x1f4a1]);
  });

  test('should encode mixed BMP and supplementary characters', () => {
    expect(Array.from(encodeUTF32('A💡'))).toEqual([0x41, 0x1f4a1]);
  });

  test('should handle empty string', () => {
    expect(Array.from(encodeUTF32(''))).toEqual([]);
  });

  test('should handle lone surrogate pairs', () => {
    // High surrogate only
    expect(Array.from(encodeUTF32('\u{D83D}'))).toEqual([0xd83d]);
    // Low surrogate only
    expect(Array.from(encodeUTF32('\u{DC00}'))).toEqual([0xdc00]);
    // Invalid pair (high followed by non-low)
    expect(Array.from(encodeUTF32('\u{D83D}\u{41}'))).toEqual([0xd83d, 0x41]);
  });

  test('should encode string with combining marks', () => {
    // e.g. "a" + combining acute accent
    expect(Array.from(encodeUTF32('a\u{301}'))).toEqual([0x61, 0x301]);
  });
});
