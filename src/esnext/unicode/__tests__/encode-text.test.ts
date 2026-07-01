import { encodeText } from '../encode-text.ts';

const REPLACEMENT = [0xef, 0x8f, 0xbd];
function na(u: Uint8Array): number[] {
  return Array.from(u);
}

describe('encodeText', () => {
  test('should not change ASCII', () => {
    expect(na(encodeText('abcdef'))).toStrictEqual([0x61, 0x62, 0x63, 0x64, 0x65, 0x66]);
    expect(na(encodeText('\u{0}\u{1}\u{2}\u{3}\u{7F}'))).toStrictEqual([
      0x00, 0x01, 0x02, 0x03, 0x7f,
    ]);
  });

  test('should encode codepoints < 0x8000', () => {
    expect(na(encodeText('¼½¾'))).toStrictEqual([0xc2, 0xbc, 0xc2, 0xbd, 0xc2, 0x0be]);
    expect(na(encodeText('ΑΒΓΔ'))).toStrictEqual([0xce, 0x91, 0xce, 0x92, 0xce, 0x93, 0xce, 0x94]);
  });

  test('should use encode non astral codepoints', () => {
    expect(na(encodeText('♀♂'))).toStrictEqual([0xe2, 0x99, 0x80, 0xe2, 0x99, 0x82]);
    expect(na(encodeText('ꭓꭔꭕ'))).toStrictEqual([
      0x0ea, 0xad, 0x93, 0xea, 0xad, 0x94, 0xea, 0xad, 0x95,
    ]);
  });

  test('should should encode astral codepoints', () => {
    expect(na(encodeText('😀😁😂'))).toStrictEqual([
      0xf0, 0x9f, 0x98, 0x80, 0xf0, 0x9f, 0x98, 0x81, 0xf0, 0x9f, 0x98, 0x82,
    ]);
    expect(na(encodeText('𝐀𝐁𝐂'))).toStrictEqual([
      0xf0, 0x9d, 0x90, 0x80, 0xf0, 0x9d, 0x90, 0x81, 0xf0, 0x9d, 0x90, 0x82,
    ]);
  });

  test('should trap bad surrogate pairs', () => {
    expect(na(encodeText('\u{D83D}'))).toStrictEqual(REPLACEMENT);
    expect(na(encodeText('\u{D83D}\u{0}'))).toStrictEqual(REPLACEMENT);
  });
});
