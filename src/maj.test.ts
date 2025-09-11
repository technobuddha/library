/* eslint-disable no-bitwise */
import { maj } from './maj.ts';

describe('maj', () => {
  test('all zeros', () => {
    expect(maj(0, 0, 0)).toBe(0);
  });

  test('all ones', () => {
    expect(maj(0xffffffff, 0xffffffff, 0xffffffff)).toBe(0xffffffff);
  });

  test('two ones, one zero', () => {
    expect(maj(0xffffffff, 0xffffffff, 0)).toBe(0xffffffff);
    expect(maj(0xffffffff, 0, 0xffffffff)).toBe(0xffffffff);
    expect(maj(0, 0xffffffff, 0xffffffff)).toBe(0xffffffff);
  });

  test('two zeros, one one', () => {
    expect(maj(0, 0, 0xffffffff)).toBe(0);
    expect(maj(0, 0xffffffff, 0)).toBe(0);
    expect(maj(0xffffffff, 0, 0)).toBe(0);
  });

  test('alternating bits', () => {
    const a = 0xaaaaaaaa; // 1010...
    const b = 0x55555555; // 0101...
    const c = 0xaaaaaaaa;
    expect(maj(a, b, c)).toBe(a);
    expect(maj(b, a, c)).toBe(a);
    expect(maj(a, a, b)).toBe(a);
  });

  test('random values', () => {
    expect(maj(0x12345678, 0x87654321, 0xf0f0f0f0)).toBe(
      ((0x12345678 & 0x87654321) | (0xf0f0f0f0 & (0x12345678 | 0x87654321))) >>> 0,
    );
    expect(maj(0x0f0f0f0f, 0x12345678, 0x87654321).toString(16)).toBe(
      (((0x0f0f0f0f & 0x12345678) | (0x87654321 & (0x0f0f0f0f | 0x12345678))) >>> 0).toString(16),
    );
  });
});
