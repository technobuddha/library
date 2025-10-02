import { bitMask } from '../bit-mask.ts';

describe('bitMask', () => {
  describe('zero and negative values', () => {
    test('returns 0 for length 0', () => {
      expect(bitMask(0)).toBe(0);
    });

    test('returns 0 for negative length', () => {
      expect(bitMask(-1)).toBe(0);
      expect(bitMask(-10)).toBe(0);
      expect(bitMask(-100)).toBe(0);
    });
  });

  describe('small masks (1-7 bits)', () => {
    test('creates mask for 1 bit', () => {
      expect(bitMask(1)).toBe(0b1);
      expect(bitMask(1)).toBe(1);
    });

    test('creates mask for 2 bits', () => {
      expect(bitMask(2)).toBe(0b11);
      expect(bitMask(2)).toBe(3);
    });

    test('creates mask for 3 bits', () => {
      expect(bitMask(3)).toBe(0b111);
      expect(bitMask(3)).toBe(7);
    });

    test('creates mask for 4 bits', () => {
      expect(bitMask(4)).toBe(0b1111);
      expect(bitMask(4)).toBe(15);
    });

    test('creates mask for 7 bits', () => {
      expect(bitMask(7)).toBe(0b1111111);
      expect(bitMask(7)).toBe(127);
    });
  });

  describe('byte-sized masks (8, 16, 24 bits)', () => {
    test('creates mask for 8 bits (1 byte)', () => {
      expect(bitMask(8)).toBe(0xff);
      expect(bitMask(8)).toBe(255);
    });

    test('creates mask for 16 bits (2 bytes)', () => {
      expect(bitMask(16)).toBe(0xffff);
      expect(bitMask(16)).toBe(65535);
    });

    test('creates mask for 24 bits (3 bytes)', () => {
      expect(bitMask(24)).toBe(0xffffff);
      expect(bitMask(24)).toBe(16777215);
    });
  });

  describe('32-bit boundary', () => {
    test('creates mask for 31 bits', () => {
      expect(bitMask(31)).toBe(0x7fffffff);
      expect(bitMask(31)).toBe(2147483647);
    });

    test('creates mask for 32 bits', () => {
      expect(bitMask(32)).toBe(0xffffffff);
      expect(bitMask(32)).toBe(4294967295);
    });
  });

  describe('bigint masks (>32 bits)', () => {
    test('returns bigint for 33 bits', () => {
      const result = bitMask(33);
      expect(typeof result).toBe('bigint');
      expect(result).toBe(0x1ffffffffn);
      expect(result).toBe(8589934591n);
    });

    test('creates mask for 40 bits', () => {
      expect(bitMask(40)).toBe(0xffffffffffn);
      expect(bitMask(40)).toBe(1099511627775n);
    });

    test('creates mask for 48 bits', () => {
      expect(bitMask(48)).toBe(0xffffffffffffn);
      expect(bitMask(48)).toBe(281474976710655n);
    });

    test('creates mask for 56 bits', () => {
      expect(bitMask(56)).toBe(0xffffffffffffffn);
      expect(bitMask(56)).toBe(72057594037927935n);
    });

    test('creates mask for 64 bits', () => {
      expect(bitMask(64)).toBe(0xffffffffffffffffn);
      expect(bitMask(64)).toBe(18446744073709551615n);
    });

    test('creates mask for 128 bits', () => {
      const result = bitMask(128);
      expect(typeof result).toBe('bigint');
      expect(result).toBe(340282366920938463463374607431768211455n);
    });
  });

  describe('return type validation', () => {
    test('returns number for lengths less than 32', () => {
      for (let i = 1; i < 31; i++) {
        expect(typeof bitMask(i)).toBe('number');
      }
    });

    test('returns number for length 32', () => {
      expect(typeof bitMask(32)).toBe('number');
    });

    test('returns bigint for lengths greater than 32', () => {
      expect(typeof bitMask(33)).toBe('bigint');
      expect(typeof bitMask(50)).toBe('bigint');
      expect(typeof bitMask(64)).toBe('bigint');
      expect(typeof bitMask(100)).toBe('bigint');
    });
  });

  describe('practical masking operations', () => {
    test('can mask low nibble (4 bits)', () => {
      const value = 0xab;
      const mask = bitMask(4) as number;
      expect(value & mask).toBe(0x0b);
    });

    test('can mask low byte (8 bits)', () => {
      const value = 0x1234;
      const mask = bitMask(8) as number;
      expect(value & mask).toBe(0x34);
    });

    test('can mask low 16 bits', () => {
      const value = 0x12345678;
      const mask = bitMask(16) as number;
      expect(value & mask).toBe(0x5678);
    });

    test('can mask low 31 bits', () => {
      const value = 0xffffffff;
      const mask = bitMask(31) as number;
      expect((value & mask) >>> 0).toBe(0x7fffffff);
    });

    test('can mask all 32 bits with unsigned shift', () => {
      const value = 0xffffffff;
      const mask = bitMask(32) as number;
      expect((value & mask) >>> 0).toBe(0xffffffff);
    });

    test('can mask bigint values', () => {
      const value = 0x123456789abcdefn;
      const mask = bitMask(40) as bigint;
      expect(value & mask).toBe(0x6789abcdefn);
    });
  });

  describe('edge cases', () => {
    test('handles floating point lengths by truncation', () => {
      expect(bitMask(4.9)).toBe(bitMask(4));
      expect(bitMask(8.1)).toBe(bitMask(8));
    });

    test('sequential masks increase correctly', () => {
      expect(bitMask(1)).toBe(1);
      expect(bitMask(2)).toBe(3);
      expect(bitMask(3)).toBe(7);
      expect(bitMask(4)).toBe(15);
      expect(bitMask(5)).toBe(31);
    });

    test('mask for n bits has exactly n bits set', () => {
      expect(countBitsSet(bitMask(1) as number)).toBe(1);
      expect(countBitsSet(bitMask(5) as number)).toBe(5);
      expect(countBitsSet(bitMask(10) as number)).toBe(10);
      expect(countBitsSet(bitMask(20) as number)).toBe(20);
    });
  });
});

function countBitsSet(n: number): number {
  return n.toString(2).split('1').length - 1;
}
