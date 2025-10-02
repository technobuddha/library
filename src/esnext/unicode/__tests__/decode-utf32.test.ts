import { decodeUTF32 } from '../decode-utf32.ts';
import { empty } from '../unicode.ts';

describe('decodeUTF32', () => {
  test('should decode ASCII code points', () => {
    const arr = new Uint32Array([0x41, 0x42, 0x43]);
    expect(decodeUTF32(arr)).toBe('ABC');
  });

  test('should decode BMP code points', () => {
    const arr = new Uint32Array([0x03b1, 0x03b2, 0x03b3]);
    expect(decodeUTF32(arr)).toBe('αβγ');
  });

  test('should decode supplementary plane code points', () => {
    const arr = new Uint32Array([0x1f600, 0x1f601, 0x1f602]);
    expect(decodeUTF32(arr)).toBe('😀😁😂');
  });

  test('should decode mixed BMP and supplementary code points', () => {
    const arr = new Uint32Array([0x41, 0x1f4a1, 0x42]);
    expect(decodeUTF32(arr)).toBe('A💡B');
  });

  test('should handle empty array', () => {
    const arr = new Uint32Array([]);
    expect(decodeUTF32(arr)).toBe(empty);
  });

  test('should decode control characters', () => {
    const arr = new Uint32Array([0x00, 0x01, 0x7f]);
    expect(decodeUTF32(arr)).toBe('\u0000\u0001\u007F');
  });

  test('should decode single code point', () => {
    const arr = new Uint32Array([0x1f680]);
    expect(decodeUTF32(arr)).toBe('🚀');
  });
});
