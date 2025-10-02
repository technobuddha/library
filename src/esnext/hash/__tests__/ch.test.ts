import { ch } from '../ch.ts';

describe('ch', () => {
  test('returns y when x is all 1s', () => {
    expect(ch(0xffffffff, 0x12345678, 0x87654321)).toBe(0x12345678);
  });

  test('returns z when x is all 0s', () => {
    expect(ch(0x00000000, 0x12345678, 0x87654321)).toBe(0x87654321);
  });

  test('returns y & x | z & ~x for mixed bits', () => {
    // x: 0b10101010, y: 0b11110000, z: 0b00001111
    expect(ch(0b10101010, 0b11110000, 0b00001111)).toBe(
      (0b10101010 & 0b11110000) ^ (~0b10101010 & 0b00001111),
    );
  });

  test('returns correct value for alternating bits', () => {
    expect(ch(0xaaaaaaaa, 0xffffffff, 0x00000000)).toBe(0xaaaaaaaa);
    expect(ch(0x55555555, 0xffffffff, 0x00000000)).toBe(0x55555555);
  });

  test('returns correct value for random values', () => {
    expect(ch(0x0f0f0f0f, 0x12345678, 0x87654321)).toBe(
      ((0x0f0f0f0f & 0x12345678) ^ (~0x0f0f0f0f & 0x87654321)) >>> 0,
    );
  });
});
