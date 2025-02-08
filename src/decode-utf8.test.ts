import { decodeUTF8 } from './decode-utf8.js';

const RC = '\uFFFD'; // unicode replacement character

function ui8(arg: number[]): Uint8Array {
  return new Uint8Array(arg);
}

describe('decodeUTF8', () => {
  test('should not change ASCII', () => {
    expect(decodeUTF8(ui8([0x61, 0x62, 0x63, 0x64, 0x65, 0x66]))).toBe('abcdef');
    expect(decodeUTF8(ui8([0x00, 0x01, 0x02, 0x03, 0x7f]))).toBe('\u0000\u0001\u0002\u0003\u007F');
  });

  test('two byte ut8 sequences', () => {
    expect(decodeUTF8(ui8([0xc2, 0xbc, 0xc2, 0xbd, 0xc2, 0xbe]))).toBe('¼½¾');
    expect(decodeUTF8(ui8([0xce, 0x91, 0xce, 0x92, 0xce, 0x93, 0xce, 0x94]))).toBe('ΑΒΓΔ');
  });

  test('three byte ut8 sequences', () => {
    expect(decodeUTF8(ui8([0xe2, 0x99, 0x80, 0xe2, 0x99, 0x82]))).toBe('♀♂');
    expect(decodeUTF8(ui8([0xea, 0xad, 0x93, 0xea, 0xad, 0x94, 0xea, 0xad, 0x95]))).toBe('ꭓꭔꭕ');
  });

  test('four byte ut8 sequences', () => {
    expect(
      decodeUTF8(ui8([0xf0, 0x9f, 0x98, 0x80, 0xf0, 0x9f, 0x98, 0x81, 0xf0, 0x9f, 0x98, 0x82])),
    ).toBe('😀😁😂');
    expect(
      decodeUTF8(ui8([0xf0, 0x9d, 0x90, 0x80, 0xf0, 0x9d, 0x90, 0x81, 0xf0, 0x9d, 0x90, 0x82])),
    ).toBe('𝐀𝐁𝐂');
  });

  test('should trap bad surrogate pairs', () => {
    expect(decodeUTF8(ui8([0xc0]))).toBe(RC);
    expect(decodeUTF8(ui8([0xc0, 0x00]))).toBe(RC);
    expect(decodeUTF8(ui8([0xe0]))).toBe(RC);
    expect(decodeUTF8(ui8([0xe0, 0x80]))).toBe(RC);
    expect(decodeUTF8(ui8([0xe0, 0x00]))).toBe(RC);
    expect(decodeUTF8(ui8([0xe0, 0x80, 0x00]))).toBe(RC);
    expect(decodeUTF8(ui8([0xf0]))).toBe(RC);
    expect(decodeUTF8(ui8([0xf0, 0x80]))).toBe(RC);
    expect(decodeUTF8(ui8([0xf0, 0x00]))).toBe(RC);
    expect(decodeUTF8(ui8([0xf0, 0x80, 0x80]))).toBe(RC);
    expect(decodeUTF8(ui8([0xf0, 0x00, 0x80]))).toBe(RC);
    expect(decodeUTF8(ui8([0xf0, 0x80, 0x80, 0x00]))).toBe(RC);
    expect(decodeUTF8(ui8([0xf4, 0xbf, 0xbf, 0xbf]))).toBe(RC);
    expect(decodeUTF8(ui8([0xf9]))).toBe(RC);
  });
});
