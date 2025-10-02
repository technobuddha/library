import { toString } from '../../string/to-string.ts';

import { U16 } from '../u16.ts';

describe('U16', () => {
  describe('constructor', () => {
    test('creates U16 with zero', () => {
      const u16 = new U16(0);
      expect(u16.value).toBe(0);
    });

    test('creates U16 with positive integer', () => {
      const u16 = new U16(42);
      expect(u16.value).toBe(42);
    });

    test('wraps negative integers to unsigned range', () => {
      expect(new U16(-1).value).toBe(65535);
      expect(new U16(-42).value).toBe(65494);
    });

    test('truncates decimal values to 16-bit integer', () => {
      expect(new U16(3.7).value).toBe(3);
      expect(new U16(42.9).value).toBe(42);
    });

    test('wraps values outside 16-bit unsigned range', () => {
      expect(new U16(65536).value).toBe(0);
      expect(new U16(65537).value).toBe(1);
      expect(new U16(131072).value).toBe(0);
    });

    test('handles max 16-bit unsigned value', () => {
      expect(new U16(65535).value).toBe(65535);
      expect(new U16(0xffff).value).toBe(65535);
    });
  });

  describe('len', () => {
    test('returns the bit length of 16', () => {
      expect(new U16(0).len).toBe(16);
      expect(new U16(42).len).toBe(16);
      expect(new U16(65535).len).toBe(16);
    });
  });

  describe('or', () => {
    test('performs bitwise OR on two zeros', () => {
      expect(new U16(0).or(new U16(0)).value).toBe(0);
    });

    test('performs bitwise OR with identity (0)', () => {
      expect(new U16(0b1010).or(new U16(0)).value).toBe(0b1010);
      expect(new U16(0).or(new U16(0b1010)).value).toBe(0b1010);
    });

    test('performs bitwise OR on different patterns', () => {
      expect(new U16(0b1010).or(new U16(0b0101)).value).toBe(0b1111);
      expect(new U16(0b1100).or(new U16(0b0011)).value).toBe(0b1111);
    });

    test('performs bitwise OR on same value', () => {
      expect(new U16(0b1010).or(new U16(0b1010)).value).toBe(0b1010);
    });

    test('performs bitwise OR with all bits set', () => {
      expect(new U16(0b1010).or(new U16(0xffff)).value).toBe(0xffff);
    });

    test('performs bitwise OR on large unsigned values', () => {
      expect(new U16(0x8000).or(new U16(0x0001)).value).toBe(0x8001);
    });
  });

  describe('and', () => {
    test('performs bitwise AND on two zeros', () => {
      expect(new U16(0).and(new U16(0)).value).toBe(0);
    });

    test('performs bitwise AND with zero', () => {
      expect(new U16(0b1010).and(new U16(0)).value).toBe(0);
      expect(new U16(0).and(new U16(0b1010)).value).toBe(0);
    });

    test('performs bitwise AND on different patterns', () => {
      expect(new U16(0b1010).and(new U16(0b0101)).value).toBe(0);
      expect(new U16(0b1100).and(new U16(0b1010)).value).toBe(0b1000);
    });

    test('performs bitwise AND on same value', () => {
      expect(new U16(0b1010).and(new U16(0b1010)).value).toBe(0b1010);
    });

    test('performs bitwise AND with all bits set', () => {
      expect(new U16(0b1010).and(new U16(0xffff)).value).toBe(0b1010);
    });

    test('performs bitwise AND on large unsigned values', () => {
      expect(new U16(0xffff).and(new U16(0xff00)).value).toBe(0xff00);
    });
  });

  describe('xor', () => {
    test('performs bitwise XOR on two zeros', () => {
      expect(new U16(0).xor(new U16(0)).value).toBe(0);
    });

    test('performs bitwise XOR with zero (identity)', () => {
      expect(new U16(0b1010).xor(new U16(0)).value).toBe(0b1010);
      expect(new U16(0).xor(new U16(0b1010)).value).toBe(0b1010);
    });

    test('performs bitwise XOR on different patterns', () => {
      expect(new U16(0b1010).xor(new U16(0b0101)).value).toBe(0b1111);
      expect(new U16(0b1100).xor(new U16(0b1010)).value).toBe(0b0110);
    });

    test('performs bitwise XOR on same value (returns zero)', () => {
      expect(new U16(0b1010).xor(new U16(0b1010)).value).toBe(0);
      expect(new U16(42).xor(new U16(42)).value).toBe(0);
    });

    test('performs bitwise XOR with all bits set', () => {
      expect(new U16(0b1010).xor(new U16(0xffff)).value).toBe(new U16(0b1010).not().value);
    });

    test('performs bitwise XOR on large unsigned values', () => {
      expect(new U16(0xffff).xor(new U16(0xffff)).value).toBe(0);
    });
  });

  describe('not', () => {
    test('performs bitwise NOT on zero', () => {
      expect(new U16(0).not().value).toBe(0xffff);
    });

    test('performs bitwise NOT on all bits set', () => {
      expect(new U16(0xffff).not().value).toBe(0);
    });

    test('performs bitwise NOT on positive numbers', () => {
      expect(new U16(1).not().value).toBe(0xfffe);
      expect(new U16(42).not().value).toBe(65493);
    });

    test('performs bitwise NOT on high bit set', () => {
      expect(new U16(0x8000).not().value).toBe(0x7fff);
    });

    test('double NOT returns original value', () => {
      expect(new U16(42).not().not().value).toBe(42);
      expect(new U16(0x1234).not().not().value).toBe(0x1234);
    });
  });

  describe('add', () => {
    test('adds two positive numbers', () => {
      expect(new U16(10).add(new U16(5)).value).toBe(15);
      expect(new U16(100).add(new U16(200)).value).toBe(300);
    });

    test('adds with zero', () => {
      expect(new U16(42).add(new U16(0)).value).toBe(42);
      expect(new U16(0).add(new U16(42)).value).toBe(42);
    });

    test('wraps on overflow', () => {
      expect(new U16(65535).add(new U16(1)).value).toBe(0);
      expect(new U16(65535).add(new U16(2)).value).toBe(1);
      expect(new U16(50000).add(new U16(20000)).value).toBe(4464);
    });
  });

  describe('subtract', () => {
    test('subtracts two numbers', () => {
      expect(new U16(10).sub(new U16(5)).value).toBe(5);
      expect(new U16(100).sub(new U16(30)).value).toBe(70);
    });

    test('subtracts with zero', () => {
      expect(new U16(42).sub(new U16(0)).value).toBe(42);
    });

    test('wraps on underflow', () => {
      expect(new U16(0).sub(new U16(1)).value).toBe(65535);
      expect(new U16(5).sub(new U16(10)).value).toBe(65531);
    });
  });

  describe('multiply', () => {
    test('multiplies two numbers', () => {
      expect(new U16(10).mul(new U16(5)).value).toBe(50);
      expect(new U16(7).mul(new U16(6)).value).toBe(42);
    });

    test('multiplies with zero', () => {
      expect(new U16(42).mul(new U16(0)).value).toBe(0);
      expect(new U16(0).mul(new U16(42)).value).toBe(0);
    });

    test('multiplies with one', () => {
      expect(new U16(42).mul(new U16(1)).value).toBe(42);
    });

    test('wraps on overflow', () => {
      expect(new U16(1000).mul(new U16(100)).value).toBe(34464);
      expect(new U16(256).mul(new U16(256)).value).toBe(0);
    });
  });

  describe('divide', () => {
    test('divides two numbers', () => {
      expect(new U16(10).div(new U16(3)).value).toBe(3);
      expect(new U16(20).div(new U16(4)).value).toBe(5);
      expect(new U16(100).div(new U16(7)).value).toBe(14);
    });

    test('divides by one', () => {
      expect(new U16(42).div(new U16(1)).value).toBe(42);
    });

    test('divides resulting in zero', () => {
      expect(new U16(2).div(new U16(3)).value).toBe(0);
    });

    test('throws on division by zero', () => {
      expect(() => new U16(10).div(new U16(0))).toThrow(RangeError);
      expect(() => new U16(10).div(new U16(0))).toThrow('Division by zero');
    });
  });

  describe('modulo', () => {
    test('computes modulo', () => {
      expect(new U16(10).mod(new U16(3)).value).toBe(1);
      expect(new U16(20).mod(new U16(7)).value).toBe(6);
      expect(new U16(100).mod(new U16(7)).value).toBe(2);
    });

    test('modulo by one', () => {
      expect(new U16(42).mod(new U16(1)).value).toBe(0);
    });

    test('modulo when dividend is smaller than divisor', () => {
      expect(new U16(2).mod(new U16(3)).value).toBe(2);
    });

    test('throws on modulo by zero', () => {
      expect(() => new U16(10).mod(new U16(0))).toThrow(RangeError);
      expect(() => new U16(10).mod(new U16(0))).toThrow('Division by zero');
    });
  });

  describe('shl', () => {
    test('shifts left by 0 (no change)', () => {
      expect(new U16(0b1010).shl(0).value).toBe(0b1010);
    });

    test('shifts left by 1', () => {
      expect(new U16(0b1010).shl(1).value).toBe(0b10100);
      expect(new U16(1).shl(1).value).toBe(2);
    });

    test('shifts left by multiple positions', () => {
      expect(new U16(1).shl(8).value).toBe(256);
      expect(new U16(0b1010).shl(4).value).toBe(0b10100000);
    });

    test('shifts left wraps at 16 bits', () => {
      expect(new U16(1).shl(15).value).toBe(0x8000);
      expect(new U16(1).shl(16).value).toBe(0);
    });

    test('shifts left with negative shift amount (clamped to 0)', () => {
      expect(new U16(0b1010).shl(-5).value).toBe(0b1010);
    });

    test('shifts left beyond 16 bits (clamped)', () => {
      expect(new U16(1).shl(100).value).toBe(0);
    });
  });

  describe('shr', () => {
    test('shifts right by 0 (no change)', () => {
      expect(new U16(0b1010).shr(0).value).toBe(0b1010);
    });

    test('shifts right by 1', () => {
      expect(new U16(0b1010).shr(1).value).toBe(0b101);
      expect(new U16(8).shr(1).value).toBe(4);
    });

    test('shifts right by multiple positions', () => {
      expect(new U16(256).shr(8).value).toBe(1);
      expect(new U16(0b10100000).shr(4).value).toBe(0b1010);
    });

    test('shifts right with zero-fill (logical shift)', () => {
      expect(new U16(0x8000).shr(1).value).toBe(0x4000);
      expect(new U16(0xffff).shr(1).value).toBe(0x7fff);
    });

    test('shifts right with negative shift amount (clamped to 0)', () => {
      expect(new U16(0b1010).shr(-5).value).toBe(0b1010);
    });

    test('shifts right beyond 16 bits (clamped)', () => {
      expect(new U16(42).shr(100).value).toBe(0);
      expect(new U16(0xffff).shr(100).value).toBe(0);
    });
  });

  describe('rotl', () => {
    test('rotates left by 0 (no change)', () => {
      expect(new U16(0b1010).rotl(0).value).toBe(0b1010);
    });

    test('rotates left by 1', () => {
      expect(new U16(0b1010).rotl(1).value).toBe(0b10100);
    });

    test('rotates left wraps bits around', () => {
      expect(new U16(0x8001).rotl(1).value).toBe(0x0003);
    });

    test('rotates left by 4', () => {
      expect(new U16(0x1234).rotl(4).value).toBe(0x2341);
    });

    test('rotates left by 16 (full rotation, modulo gives 0)', () => {
      const value = 0x1234;
      expect(new U16(value).rotl(16).value).toBe(value);
    });

    test('rotates left by negative amount (rotates right)', () => {
      const value = 0x1234;
      expect(new U16(value).rotl(-4).value).toBe(new U16(value).rotr(4).value);
    });

    test('rotates left with modulo behavior', () => {
      const value = 0x1234;
      expect(new U16(value).rotl(20).value).toBe(new U16(value).rotl(4).value);
    });
  });

  describe('rotr', () => {
    test('rotates right by 0 (no change)', () => {
      expect(new U16(0b1010).rotr(0).value).toBe(0b1010);
    });

    test('rotates right by 1', () => {
      expect(new U16(0b10100).rotr(1).value).toBe(0b1010);
    });

    test('rotates right wraps bits around', () => {
      expect(new U16(0x0003).rotr(1).value).toBe(0x8001);
    });

    test('rotates right by 4', () => {
      expect(new U16(0x1234).rotr(4).value).toBe(0x4123);
    });

    test('rotates right by 16 (full rotation, modulo gives 0)', () => {
      const value = 0x1234;
      expect(new U16(value).rotr(16).value).toBe(value);
    });

    test('rotates right by negative amount (rotates left)', () => {
      const value = 0x1234;
      expect(new U16(value).rotr(-4).value).toBe(new U16(value).rotl(4).value);
    });

    test('rotates right with modulo behavior', () => {
      const value = 0x1234;
      expect(new U16(value).rotr(20).value).toBe(new U16(value).rotr(4).value);
    });
  });

  describe('maj', () => {
    test('returns maj bit for each position', () => {
      const x = new U16(0b1110);
      const y = new U16(0b1010);
      const z = new U16(0b1100);
      expect(x.maj(y, z).value).toBe(0b1110);
    });

    test('maj with all zeros', () => {
      expect(new U16(0).maj(new U16(0), new U16(0)).value).toBe(0);
    });

    test('maj with all ones', () => {
      expect(new U16(0xffff).maj(new U16(0xffff), new U16(0xffff)).value).toBe(0xffff);
    });

    test('maj with two ones and one zero', () => {
      expect(new U16(0xffff).maj(new U16(0xffff), new U16(0)).value).toBe(0xffff);
      expect(new U16(0xffff).maj(new U16(0), new U16(0xffff)).value).toBe(0xffff);
      expect(new U16(0).maj(new U16(0xffff), new U16(0xffff)).value).toBe(0xffff);
    });

    test('maj with two zeros and one one', () => {
      expect(new U16(0).maj(new U16(0), new U16(0xffff)).value).toBe(0);
      expect(new U16(0).maj(new U16(0xffff), new U16(0)).value).toBe(0);
      expect(new U16(0xffff).maj(new U16(0), new U16(0)).value).toBe(0);
    });
  });

  describe('ch', () => {
    test('chs y where x is 1, z where x is 0', () => {
      const x = new U16(0b1100);
      const y = new U16(0b1010);
      const z = new U16(0b0101);
      expect(x.ch(y, z).value).toBe(0b1001);
    });

    test('ch with all zeros', () => {
      expect(new U16(0).ch(new U16(0), new U16(0)).value).toBe(0);
    });

    test('ch returns y when x is all ones', () => {
      const y = new U16(0b1010);
      expect(new U16(0xffff).ch(y, new U16(0)).value).toBe(y.value);
    });

    test('ch returns z when x is all zeros', () => {
      const z = new U16(0b1010);
      expect(new U16(0).ch(new U16(0), z).value).toBe(z.value);
    });

    test('ch with complex patterns', () => {
      const x = new U16(0xf0f0);
      const y = new U16(0xaaaa);
      const z = new U16(0x5555);
      expect(x.ch(y, z).value).toBe(0xa5a5);
    });
  });

  describe('cnt1', () => {
    test('counts zero ones in zero', () => {
      expect(new U16(0).cnt1()).toBe(0);
    });

    test('counts one in 1', () => {
      expect(new U16(1).cnt1()).toBe(1);
    });

    test('counts ones in powers of two', () => {
      expect(new U16(2).cnt1()).toBe(1);
      expect(new U16(4).cnt1()).toBe(1);
      expect(new U16(8).cnt1()).toBe(1);
      expect(new U16(16).cnt1()).toBe(1);
      expect(new U16(128).cnt1()).toBe(1);
      expect(new U16(1024).cnt1()).toBe(1);
      expect(new U16(0x8000).cnt1()).toBe(1);
    });

    test('counts ones in all bits set', () => {
      expect(new U16(0xffff).cnt1()).toBe(16);
    });

    test('counts ones in various patterns', () => {
      expect(new U16(0b1111).cnt1()).toBe(4);
      expect(new U16(0b10101010).cnt1()).toBe(4);
      expect(new U16(0b11111111).cnt1()).toBe(8);
    });

    test('counts ones in max 16-bit unsigned integer', () => {
      expect(new U16(65535).cnt1()).toBe(16);
    });

    test('counts ones in large values', () => {
      expect(new U16(0x8001).cnt1()).toBe(2);
      expect(new U16(0xff00).cnt1()).toBe(8);
      expect(new U16(0x00ff).cnt1()).toBe(8);
    });

    test('counts ones in mixed bit patterns', () => {
      expect(new U16(0x0f0f).cnt1()).toBe(8);
      expect(new U16(0x5555).cnt1()).toBe(8);
      expect(new U16(0xaaaa).cnt1()).toBe(8);
    });
  });

  describe('cnt0', () => {
    test('counts 16 zeros in zero', () => {
      expect(new U16(0).cnt0()).toBe(16);
    });

    test('counts zeros in 1', () => {
      expect(new U16(1).cnt0()).toBe(15);
    });

    test('counts zeros in powers of two', () => {
      expect(new U16(2).cnt0()).toBe(15);
      expect(new U16(4).cnt0()).toBe(15);
      expect(new U16(8).cnt0()).toBe(15);
      expect(new U16(16).cnt0()).toBe(15);
      expect(new U16(128).cnt0()).toBe(15);
      expect(new U16(1024).cnt0()).toBe(15);
      expect(new U16(0x8000).cnt0()).toBe(15);
    });

    test('counts zero zeros in all bits set', () => {
      expect(new U16(0xffff).cnt0()).toBe(0);
    });

    test('counts zeros in various patterns', () => {
      expect(new U16(0b1111).cnt0()).toBe(12);
      expect(new U16(0b10101010).cnt0()).toBe(12);
      expect(new U16(0b11111111).cnt0()).toBe(8);
    });

    test('counts zeros in max 16-bit unsigned integer', () => {
      expect(new U16(65535).cnt0()).toBe(0);
    });

    test('counts zeros in large values', () => {
      expect(new U16(0x8001).cnt0()).toBe(14);
      expect(new U16(0xff00).cnt0()).toBe(8);
      expect(new U16(0x00ff).cnt0()).toBe(8);
    });

    test('counts zeros in mixed bit patterns', () => {
      expect(new U16(0x0f0f).cnt0()).toBe(8);
      expect(new U16(0x5555).cnt0()).toBe(8);
      expect(new U16(0xaaaa).cnt0()).toBe(8);
    });
  });

  describe('cnt1 and cnt0 complement', () => {
    test('sum of ones and zeros equals 16', () => {
      const testValues = [0, 1, 42, 255, 256, 1000, 32768, 65535, 0x1234, 0xabcd, 0x8000, 0x7fff];

      for (const value of testValues) {
        const u16 = new U16(value);
        expect(u16.cnt1() + u16.cnt0()).toBe(16);
      }
    });
  });

  describe('toString', () => {
    test('converts to decimal string by default', () => {
      expect(new U16(42).toString()).toBe('42');
      expect(new U16(0).toString()).toBe('0');
      expect(new U16(65535).toString()).toBe('65535');
    });

    test('converts to binary string', () => {
      expect(new U16(10).toString(2)).toBe('1010');
      expect(new U16(255).toString(2)).toBe('11111111');
    });

    test('converts to hexadecimal string', () => {
      expect(new U16(255).toString(16)).toBe('ff');
      expect(new U16(0x1234).toString(16)).toBe('1234');
      expect(new U16(0xffff).toString(16)).toBe('ffff');
    });

    test('converts to octal string', () => {
      expect(new U16(64).toString(8)).toBe('100');
      expect(new U16(511).toString(8)).toBe('777');
    });

    test('converts large values to string', () => {
      expect(new U16(65535).toString(16)).toBe('ffff');
      expect(new U16(32768).toString(16)).toBe('8000');
    });

    test('handles various radix values', () => {
      expect(new U16(100).toString(36)).toBe('2s');
      expect(new U16(100).toString(10)).toBe('100');
    });
  });

  describe('valueOf', () => {
    test('returns the numeric value', () => {
      expect(new U16(42).valueOf()).toBe(42);
      expect(new U16(0).valueOf()).toBe(0);
      expect(new U16(65535).valueOf()).toBe(65535);
    });

    test('returns 16-bit wrapped values', () => {
      expect(new U16(65535).valueOf()).toBe(65535);
      expect(new U16(0x8000).valueOf()).toBe(32768);
    });

    test('allows numeric operations', () => {
      expect(new U16(10).valueOf() + 5).toBe(15);
      expect(new U16(10).valueOf() * 2).toBe(20);
    });
  });

  describe('Symbol.toPrimitive', () => {
    test('converts to number when hint is number', () => {
      const u16 = new U16(42);
      expect(Number(u16)).toBe(42);
      expect(u16.valueOf()).toBe(42);
    });

    test('converts to string when hint is string', () => {
      const u16 = new U16(42);
      expect(toString(u16)).toBe('42');
      expect(u16.toString()).toBe('42');
    });

    test('works with large unsigned values', () => {
      const u16 = new U16(65535);
      expect(Number(u16)).toBe(65535);
      expect(toString(u16)).toBe('65535');
    });
  });

  describe('integration tests', () => {
    test('chaining operations', () => {
      const result = new U16(0b1100).or(new U16(0b0011)).and(new U16(0b1010)).xor(new U16(0b0101));
      expect(result.value).toBe(0b1111);
    });

    test('complex bit manipulation', () => {
      const value = new U16(0xaaaa);
      const rotated = value.rotl(4);
      const shifted = rotated.shr(2);
      expect(shifted.cnt1()).toBe(7);
    });

    test('immutability - operations return new instances', () => {
      const original = new U16(42);
      const modified = original.or(new U16(8));
      expect(original.value).toBe(42);
      expect(modified.value).toBe(42);
    });

    test('working with cryptographic-style operations', () => {
      const x = new U16(0x1234);
      const y = new U16(0x5678);
      const z = new U16(0xabcd);

      const maj = x.maj(y, z);
      const ch = x.ch(y, z);

      expect(maj.value).not.toBe(0);
      expect(ch.value).not.toBe(0);
    });

    test('unsigned arithmetic wrapping', () => {
      expect(new U16(-1).value).toBe(65535);
      expect(new U16(65536).value).toBe(0);
      expect(new U16(65537).value).toBe(1);
    });
  });
});
