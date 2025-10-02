import { toString } from '../../string/to-string.ts';

import { U32 } from '../u32.ts';

describe('U32', () => {
  describe('constructor', () => {
    test('creates U32 with zero', () => {
      const u32 = new U32(0);
      expect(u32.value).toBe(0);
    });

    test('creates U32 with positive integer', () => {
      const u32 = new U32(42);
      expect(u32.value).toBe(42);
    });

    test('creates U32 with negative integer (converts to unsigned)', () => {
      const u32 = new U32(-1);
      expect(u32.value).toBe(4294967295);
    });

    test('truncates decimal values to 32-bit unsigned integer', () => {
      expect(new U32(3.7).value).toBe(3);
      expect(new U32(-3.7).value).toBe(4294967293);
    });

    test('wraps values outside 32-bit range', () => {
      expect(new U32(4294967296).value).toBe(0);
      expect(new U32(4294967297).value).toBe(1);
    });

    test('handles max 32-bit unsigned value', () => {
      expect(new U32(4294967295).value).toBe(4294967295);
      expect(new U32(0xffffffff).value).toBe(4294967295);
    });
  });

  describe('len', () => {
    test('returns the bit length of 32', () => {
      expect(new U32(0).len).toBe(32);
      expect(new U32(42).len).toBe(32);
      expect(new U32(4294967295).len).toBe(32);
    });
  });

  describe('or', () => {
    test('performs bitwise OR on two zeros', () => {
      expect(new U32(0).or(new U32(0)).value).toBe(0);
    });

    test('performs bitwise OR with identity (0)', () => {
      expect(new U32(0b1010).or(new U32(0)).value).toBe(0b1010);
      expect(new U32(0).or(new U32(0b1010)).value).toBe(0b1010);
    });

    test('performs bitwise OR on different patterns', () => {
      expect(new U32(0b1010).or(new U32(0b0101)).value).toBe(0b1111);
      expect(new U32(0b1100).or(new U32(0b0011)).value).toBe(0b1111);
    });

    test('performs bitwise OR on same value', () => {
      expect(new U32(0b1010).or(new U32(0b1010)).value).toBe(0b1010);
    });

    test('performs bitwise OR with all bits set', () => {
      expect(new U32(0b1010).or(new U32(0xffffffff)).value).toBe(0xffffffff);
    });

    test('performs bitwise OR on large numbers', () => {
      expect(new U32(0xffff0000).or(new U32(0x0000ffff)).value).toBe(0xffffffff);
    });
  });

  describe('and', () => {
    test('performs bitwise AND on two zeros', () => {
      expect(new U32(0).and(new U32(0)).value).toBe(0);
    });

    test('performs bitwise AND with zero', () => {
      expect(new U32(0b1010).and(new U32(0)).value).toBe(0);
      expect(new U32(0).and(new U32(0b1010)).value).toBe(0);
    });

    test('performs bitwise AND on different patterns', () => {
      expect(new U32(0b1010).and(new U32(0b0101)).value).toBe(0);
      expect(new U32(0b1100).and(new U32(0b1010)).value).toBe(0b1000);
    });

    test('performs bitwise AND on same value', () => {
      expect(new U32(0b1010).and(new U32(0b1010)).value).toBe(0b1010);
    });

    test('performs bitwise AND with all bits set', () => {
      expect(new U32(0b1010).and(new U32(0xffffffff)).value).toBe(0b1010);
    });

    test('performs bitwise AND on large numbers', () => {
      expect(new U32(0xffff0000).and(new U32(0x0000ffff)).value).toBe(0);
    });
  });

  describe('xor', () => {
    test('performs bitwise XOR on two zeros', () => {
      expect(new U32(0).xor(new U32(0)).value).toBe(0);
    });

    test('performs bitwise XOR with zero (identity)', () => {
      expect(new U32(0b1010).xor(new U32(0)).value).toBe(0b1010);
      expect(new U32(0).xor(new U32(0b1010)).value).toBe(0b1010);
    });

    test('performs bitwise XOR on different patterns', () => {
      expect(new U32(0b1010).xor(new U32(0b0101)).value).toBe(0b1111);
      expect(new U32(0b1100).xor(new U32(0b1010)).value).toBe(0b0110);
    });

    test('performs bitwise XOR on same value (returns zero)', () => {
      expect(new U32(0b1010).xor(new U32(0b1010)).value).toBe(0);
      expect(new U32(42).xor(new U32(42)).value).toBe(0);
    });

    test('performs bitwise XOR with all bits set', () => {
      expect(new U32(0b1010).xor(new U32(0xffffffff)).value).toBe(new U32(0b1010).not().value);
    });

    test('performs bitwise XOR on large numbers', () => {
      expect(new U32(0xffffffff).xor(new U32(0xffffffff)).value).toBe(0);
    });
  });

  describe('not', () => {
    test('performs bitwise NOT on zero', () => {
      expect(new U32(0).not().value).toBe(0xffffffff);
    });

    test('performs bitwise NOT on all bits set', () => {
      expect(new U32(0xffffffff).not().value).toBe(0);
    });

    test('performs bitwise NOT on positive numbers', () => {
      expect(new U32(1).not().value).toBe(4294967294);
      expect(new U32(42).not().value).toBe(4294967253);
    });

    test('double NOT returns original value', () => {
      expect(new U32(42).not().not().value).toBe(42);
      expect(new U32(0xabcdef12).not().not().value).toBe(0xabcdef12);
    });
  });

  describe('add', () => {
    test('adds two positive numbers', () => {
      expect(new U32(10).add(new U32(5)).value).toBe(15);
      expect(new U32(100).add(new U32(200)).value).toBe(300);
    });

    test('adds with zero', () => {
      expect(new U32(42).add(new U32(0)).value).toBe(42);
      expect(new U32(0).add(new U32(42)).value).toBe(42);
    });

    test('wraps on overflow', () => {
      expect(new U32(4294967295).add(new U32(1)).value).toBe(0);
      expect(new U32(4294967295).add(new U32(2)).value).toBe(1);
      expect(new U32(3000000000).add(new U32(2000000000)).value).toBe(705032704);
    });
  });

  describe('subtract', () => {
    test('subtracts two numbers', () => {
      expect(new U32(10).sub(new U32(5)).value).toBe(5);
      expect(new U32(100).sub(new U32(30)).value).toBe(70);
    });

    test('subtracts with zero', () => {
      expect(new U32(42).sub(new U32(0)).value).toBe(42);
    });

    test('wraps on underflow', () => {
      expect(new U32(0).sub(new U32(1)).value).toBe(4294967295);
      expect(new U32(5).sub(new U32(10)).value).toBe(4294967291);
    });
  });

  describe('multiply', () => {
    test('multiplies two numbers', () => {
      expect(new U32(10).mul(new U32(5)).value).toBe(50);
      expect(new U32(7).mul(new U32(6)).value).toBe(42);
    });

    test('multiplies with zero', () => {
      expect(new U32(42).mul(new U32(0)).value).toBe(0);
      expect(new U32(0).mul(new U32(42)).value).toBe(0);
    });

    test('multiplies with one', () => {
      expect(new U32(42).mul(new U32(1)).value).toBe(42);
    });

    test('wraps on overflow', () => {
      expect(new U32(100000).mul(new U32(100000)).value).toBe(1410065408);
      expect(new U32(65536).mul(new U32(65536)).value).toBe(0);
    });
  });

  describe('divide', () => {
    test('divides two numbers', () => {
      expect(new U32(10).div(new U32(3)).value).toBe(3);
      expect(new U32(20).div(new U32(4)).value).toBe(5);
      expect(new U32(100).div(new U32(7)).value).toBe(14);
    });

    test('divides by one', () => {
      expect(new U32(42).div(new U32(1)).value).toBe(42);
    });

    test('divides resulting in zero', () => {
      expect(new U32(2).div(new U32(3)).value).toBe(0);
    });

    test('throws on division by zero', () => {
      expect(() => new U32(10).div(new U32(0))).toThrow(RangeError);
      expect(() => new U32(10).div(new U32(0))).toThrow('Division by zero');
    });
  });

  describe('modulo', () => {
    test('computes modulo', () => {
      expect(new U32(10).mod(new U32(3)).value).toBe(1);
      expect(new U32(20).mod(new U32(7)).value).toBe(6);
      expect(new U32(100).mod(new U32(7)).value).toBe(2);
    });

    test('modulo by one', () => {
      expect(new U32(42).mod(new U32(1)).value).toBe(0);
    });

    test('modulo when dividend is smaller than divisor', () => {
      expect(new U32(2).mod(new U32(3)).value).toBe(2);
    });

    test('throws on modulo by zero', () => {
      expect(() => new U32(10).mod(new U32(0))).toThrow(RangeError);
      expect(() => new U32(10).mod(new U32(0))).toThrow('Division by zero');
    });
  });

  describe('shl', () => {
    test('shifts left by 0 (no change)', () => {
      expect(new U32(0b1010).shl(0).value).toBe(0b1010);
    });

    test('shifts left by 1', () => {
      expect(new U32(0b1010).shl(1).value).toBe(0b10100);
      expect(new U32(1).shl(1).value).toBe(2);
    });

    test('shifts left by multiple positions', () => {
      expect(new U32(1).shl(8).value).toBe(256);
      expect(new U32(0b1010).shl(4).value).toBe(0b10100000);
    });

    test('shifts left clamps to 32 bits', () => {
      expect(new U32(1).shl(31).value).toBe(2147483648);
      expect(new U32(1).shl(32).value).toBe(1);
    });

    test('shifts left with negative shift amount (clamped to 0)', () => {
      expect(new U32(0b1010).shl(-5).value).toBe(0b1010);
    });

    test('shifts left beyond 32 bits (clamped)', () => {
      expect(new U32(1).shl(100).value).toBe(1);
    });
  });

  describe('shr', () => {
    test('shifts right by 0 (no change)', () => {
      expect(new U32(0b1010).shr(0).value).toBe(0b1010);
    });

    test('shifts right by 1', () => {
      expect(new U32(0b1010).shr(1).value).toBe(0b101);
      expect(new U32(8).shr(1).value).toBe(4);
    });

    test('shifts right by multiple positions', () => {
      expect(new U32(256).shr(8).value).toBe(1);
      expect(new U32(0b10100000).shr(4).value).toBe(0b1010);
    });

    test('shifts right is logical (zero-fill)', () => {
      expect(new U32(0xffffffff).shr(1).value).toBe(0x7fffffff);
      expect(new U32(0x80000000).shr(1).value).toBe(0x40000000);
    });

    test('shifts right with negative shift amount (clamped to 0)', () => {
      expect(new U32(0b1010).shr(-5).value).toBe(0b1010);
    });

    test('shifts right beyond 32 bits (clamped)', () => {
      expect(new U32(42).shr(100).value).toBe(42);
      expect(new U32(0xffffffff).shr(100).value).toBe(0xffffffff);
    });
  });

  describe('rotl', () => {
    test('rotates left by 0 (no change)', () => {
      expect(new U32(0b1010).rotl(0).value).toBe(0b1010);
    });

    test('rotates left by 1', () => {
      expect(new U32(0b1010).rotl(1).value).toBe(0b10100);
    });

    test('rotates left wraps bits around', () => {
      expect(new U32(0x80000001).rotl(1).value).toBe(0x00000003);
    });

    test('rotates left by 4', () => {
      expect(new U32(0x12345678).rotl(4).value).toBe(0x23456781);
    });

    test('rotates left by 32 (full rotation, modulo gives 0)', () => {
      const value = 0x12345678;
      expect(new U32(value).rotl(32).value).toBe(value);
    });

    test('rotates left by negative amount (rotates right)', () => {
      const value = 0x12345678;
      expect(new U32(value).rotl(-4).value).toBe(new U32(value).rotr(4).value);
    });

    test('rotates left with modulo behavior', () => {
      const value = 0x12345678;
      expect(new U32(value).rotl(36).value).toBe(new U32(value).rotl(4).value);
    });
  });

  describe('rotr', () => {
    test('rotates right by 0 (no change)', () => {
      expect(new U32(0b1010).rotr(0).value).toBe(0b1010);
    });

    test('rotates right by 1', () => {
      expect(new U32(0b10100).rotr(1).value).toBe(0b1010);
    });

    test('rotates right wraps bits around', () => {
      expect(new U32(0x00000003).rotr(1).value).toBe(0x80000001);
    });

    test('rotates right by 4', () => {
      expect(new U32(0x12345678).rotr(4).value).toBe(0x81234567);
    });

    test('rotates right by 32 (full rotation, modulo gives 0)', () => {
      const value = 0x12345678;
      expect(new U32(value).rotr(32).value).toBe(value);
    });

    test('rotates right by negative amount (rotates left)', () => {
      const value = 0x12345678;
      expect(new U32(value).rotr(-4).value).toBe(new U32(value).rotl(4).value);
    });

    test('rotates right with modulo behavior', () => {
      const value = 0x12345678;
      expect(new U32(value).rotr(36).value).toBe(new U32(value).rotr(4).value);
    });
  });

  describe('maj', () => {
    test('returns maj bit for each position', () => {
      const x = new U32(0b1110);
      const y = new U32(0b1010);
      const z = new U32(0b1100);
      expect(x.maj(y, z).value).toBe(0b1110);
    });

    test('maj with all zeros', () => {
      expect(new U32(0).maj(new U32(0), new U32(0)).value).toBe(0);
    });

    test('maj with all ones', () => {
      expect(new U32(0xffffffff).maj(new U32(0xffffffff), new U32(0xffffffff)).value).toBe(
        0xffffffff,
      );
    });

    test('maj with two ones and one zero', () => {
      expect(new U32(0xffffffff).maj(new U32(0xffffffff), new U32(0)).value).toBe(0xffffffff);
      expect(new U32(0xffffffff).maj(new U32(0), new U32(0xffffffff)).value).toBe(0xffffffff);
      expect(new U32(0).maj(new U32(0xffffffff), new U32(0xffffffff)).value).toBe(0xffffffff);
    });

    test('maj with two zeros and one one', () => {
      expect(new U32(0).maj(new U32(0), new U32(0xffffffff)).value).toBe(0);
      expect(new U32(0).maj(new U32(0xffffffff), new U32(0)).value).toBe(0);
      expect(new U32(0xffffffff).maj(new U32(0), new U32(0)).value).toBe(0);
    });
  });

  describe('ch', () => {
    test('chs y where x is 1, z where x is 0', () => {
      const x = new U32(0b1100);
      const y = new U32(0b1010);
      const z = new U32(0b0101);
      expect(x.ch(y, z).value).toBe(0b1001);
    });

    test('ch with all zeros', () => {
      expect(new U32(0).ch(new U32(0), new U32(0)).value).toBe(0);
    });

    test('ch returns y when x is all ones', () => {
      const y = new U32(0b1010);
      expect(new U32(0xffffffff).ch(y, new U32(0)).value).toBe(y.value);
    });

    test('ch returns z when x is all zeros', () => {
      const z = new U32(0b1010);
      expect(new U32(0).ch(new U32(0), z).value).toBe(z.value);
    });

    test('ch with complex patterns', () => {
      const x = new U32(0xf0f0f0f0);
      const y = new U32(0xaaaaaaaa);
      const z = new U32(0x55555555);
      expect(x.ch(y, z).value).toBe(2779096485);
    });
  });

  describe('cnt1', () => {
    test('counts zero ones in zero', () => {
      expect(new U32(0).cnt1()).toBe(0);
    });

    test('counts one in 1', () => {
      expect(new U32(1).cnt1()).toBe(1);
    });

    test('counts ones in powers of two', () => {
      expect(new U32(2).cnt1()).toBe(1);
      expect(new U32(4).cnt1()).toBe(1);
      expect(new U32(8).cnt1()).toBe(1);
      expect(new U32(16).cnt1()).toBe(1);
      expect(new U32(128).cnt1()).toBe(1);
      expect(new U32(1024).cnt1()).toBe(1);
    });

    test('counts ones in all bits set', () => {
      expect(new U32(0xffffffff).cnt1()).toBe(32);
    });

    test('counts ones in various patterns', () => {
      expect(new U32(0b1111).cnt1()).toBe(4);
      expect(new U32(0b10101010).cnt1()).toBe(4);
      expect(new U32(0b11111111).cnt1()).toBe(8);
      expect(new U32(0b1010101010101010).cnt1()).toBe(8);
    });

    test('counts ones in max 32-bit unsigned integer', () => {
      expect(new U32(4294967295).cnt1()).toBe(32);
    });

    test('counts ones in large numbers', () => {
      expect(new U32(0x80000000).cnt1()).toBe(1);
      expect(new U32(0xffff0000).cnt1()).toBe(16);
    });

    test('counts ones in mixed bit patterns', () => {
      expect(new U32(0x0f0f0f0f).cnt1()).toBe(16);
      expect(new U32(0x55555555).cnt1()).toBe(16);
      expect(new U32(0xaaaaaaaa).cnt1()).toBe(16);
      expect(new U32(0xffff0000).cnt1()).toBe(16);
      expect(new U32(0x0000ffff).cnt1()).toBe(16);
    });
  });

  describe('cnt0', () => {
    test('counts 32 zeros in zero', () => {
      expect(new U32(0).cnt0()).toBe(32);
    });

    test('counts zeros in 1', () => {
      expect(new U32(1).cnt0()).toBe(31);
    });

    test('counts zeros in powers of two', () => {
      expect(new U32(2).cnt0()).toBe(31);
      expect(new U32(4).cnt0()).toBe(31);
      expect(new U32(8).cnt0()).toBe(31);
      expect(new U32(16).cnt0()).toBe(31);
      expect(new U32(128).cnt0()).toBe(31);
      expect(new U32(1024).cnt0()).toBe(31);
    });

    test('counts zero zeros in all bits set', () => {
      expect(new U32(0xffffffff).cnt0()).toBe(0);
    });

    test('counts zeros in various patterns', () => {
      expect(new U32(0b1111).cnt0()).toBe(28);
      expect(new U32(0b10101010).cnt0()).toBe(28);
      expect(new U32(0b11111111).cnt0()).toBe(24);
      expect(new U32(0b1010101010101010).cnt0()).toBe(24);
    });

    test('counts zeros in max 32-bit unsigned integer', () => {
      expect(new U32(4294967295).cnt0()).toBe(0);
    });

    test('counts zeros in large numbers', () => {
      expect(new U32(0x80000000).cnt0()).toBe(31);
      expect(new U32(0xffff0000).cnt0()).toBe(16);
    });

    test('counts zeros in mixed bit patterns', () => {
      expect(new U32(0x0f0f0f0f).cnt0()).toBe(16);
      expect(new U32(0x55555555).cnt0()).toBe(16);
      expect(new U32(0xaaaaaaaa).cnt0()).toBe(16);
      expect(new U32(0xffff0000).cnt0()).toBe(16);
      expect(new U32(0x0000ffff).cnt0()).toBe(16);
    });
  });

  describe('cnt1 and cnt0 complement', () => {
    test('sum of ones and zeros equals 32', () => {
      const testValues = [
        0, 1, 42, 255, 4294967295, 0x12345678, 0xabcdef01, 0x80000000, 0x7fffffff, 0xffff0000,
        0x0000ffff,
      ];

      for (const value of testValues) {
        const u32 = new U32(value);
        expect(u32.cnt1() + u32.cnt0()).toBe(32);
      }
    });
  });

  describe('toString', () => {
    test('converts to decimal string by default', () => {
      expect(new U32(42).toString()).toBe('42');
      expect(new U32(0).toString()).toBe('0');
      expect(new U32(4294967295).toString()).toBe('4294967295');
    });

    test('converts to binary string', () => {
      expect(new U32(10).toString(2)).toBe('1010');
      expect(new U32(255).toString(2)).toBe('11111111');
    });

    test('converts to hexadecimal string', () => {
      expect(new U32(255).toString(16)).toBe('ff');
      expect(new U32(0x12345678).toString(16)).toBe('12345678');
      expect(new U32(4294967295).toString(16)).toBe('ffffffff');
    });

    test('converts to octal string', () => {
      expect(new U32(64).toString(8)).toBe('100');
      expect(new U32(511).toString(8)).toBe('777');
    });

    test('handles various radix values', () => {
      expect(new U32(100).toString(36)).toBe('2s');
      expect(new U32(100).toString(10)).toBe('100');
    });
  });

  describe('valueOf', () => {
    test('returns the numeric value', () => {
      expect(new U32(42).valueOf()).toBe(42);
      expect(new U32(0).valueOf()).toBe(0);
      expect(new U32(4294967295).valueOf()).toBe(4294967295);
    });

    test('allows numeric operations', () => {
      expect(new U32(10).valueOf() + 5).toBe(15);
      expect(new U32(10).valueOf() * 2).toBe(20);
    });
  });

  describe('Symbol.toPrimitive', () => {
    test('converts to number when hint is number', () => {
      const u32 = new U32(42);
      expect(Number(u32)).toBe(42);
      expect(u32.valueOf()).toBe(42);
    });

    test('converts to string when hint is string', () => {
      const u32 = new U32(42);
      expect(toString(u32)).toBe('42');
      expect(u32.toString()).toBe('42');
    });

    test('works with large numbers', () => {
      const u32 = new U32(4294967295);
      expect(Number(u32)).toBe(4294967295);
      expect(toString(u32)).toBe('4294967295');
    });
  });

  describe('integration tests', () => {
    test('chaining operations', () => {
      const result = new U32(0b1100).or(new U32(0b0011)).and(new U32(0b1010)).xor(new U32(0b0101));
      expect(result.value).toBe(0b1111);
    });

    test('complex bit manipulation', () => {
      const value = new U32(0xaaaaaaaa);
      const rotated = value.rotl(8);
      const shifted = rotated.shr(4);
      expect(shifted.cnt1()).toBe(14);
    });

    test('immutability - operations return new instances', () => {
      const original = new U32(42);
      const modified = original.or(new U32(8));
      expect(original.value).toBe(42);
      expect(modified.value).toBe(42);
    });

    test('working with cryptographic-style operations', () => {
      const x = new U32(0x6a09e667);
      const y = new U32(0xbb67ae85);
      const z = new U32(0x3c6ef372);

      const maj = x.maj(y, z);
      const ch = x.ch(y, z);

      expect(maj.value).not.toBe(0);
      expect(ch.value).not.toBe(0);
    });

    test('unsigned behavior with large values', () => {
      const a = new U32(0xffffffff);
      const b = new U32(1);

      expect(a.shr(1).value).toBe(0x7fffffff);
      expect(b.not().value).toBe(0xfffffffe);
    });
  });

  describe('fromBytes', () => {
    test('creates U32 from byte array', () => {
      const bytes = new Uint8Array([0x12, 0x34, 0x56, 0x78]);
      expect(U32.fromBytes(bytes).value).toBe(0x12345678);
    });

    test('creates U32 from bytes at offset 0', () => {
      const bytes = new Uint8Array([0xab, 0xcd, 0xef, 0x01, 0x12, 0x34, 0x56, 0x78]);
      expect(U32.fromBytes(bytes, 0).value).toBe(0xabcdef01);
    });

    test('creates U32 from bytes at offset 1', () => {
      const bytes = new Uint8Array([0xab, 0xcd, 0xef, 0x01, 0x12, 0x34, 0x56, 0x78]);
      expect(U32.fromBytes(bytes, 1).value).toBe(0x12345678);
    });

    test('creates U32 from all zeros', () => {
      const bytes = new Uint8Array([0, 0, 0, 0]);
      expect(U32.fromBytes(bytes).value).toBe(0);
    });

    test('creates U32 from all ones', () => {
      const bytes = new Uint8Array([0xff, 0xff, 0xff, 0xff]);
      expect(U32.fromBytes(bytes).value).toBe(0xffffffff);
    });

    test('handles missing bytes with default 0', () => {
      const bytes = new Uint8Array([0x12, 0x34]);
      expect(U32.fromBytes(bytes).value).toBe(0x12340000);
    });

    test('creates U32 from big-endian byte order', () => {
      const bytes = new Uint8Array([0x01, 0x02, 0x03, 0x04]);
      expect(U32.fromBytes(bytes).value).toBe(0x01020304);
    });

    test('handles empty byte array with default 0', () => {
      const bytes = new Uint8Array([]);
      expect(U32.fromBytes(bytes).value).toBe(0);
    });

    test('handles partial byte array at various positions', () => {
      const bytes = new Uint8Array([0x12]);
      expect(U32.fromBytes(bytes).value).toBe(0x12000000);
      const bytes2 = new Uint8Array([0x12, 0x34, 0x56]);
      expect(U32.fromBytes(bytes2).value).toBe(0x12345600);
    });
  });

  describe('toBytes', () => {
    test('converts U32 to byte array', () => {
      expect(new U32(0x12345678).toBytes()).toEqual([0x12, 0x34, 0x56, 0x78]);
    });

    test('converts zero to bytes', () => {
      expect(new U32(0).toBytes()).toEqual([0, 0, 0, 0]);
    });

    test('converts max value to bytes', () => {
      expect(new U32(0xffffffff).toBytes()).toEqual([0xff, 0xff, 0xff, 0xff]);
    });

    test('converts to big-endian byte order', () => {
      expect(new U32(0x01020304).toBytes()).toEqual([0x01, 0x02, 0x03, 0x04]);
    });

    test('converts decimal to bytes', () => {
      expect(new U32(305419896).toBytes()).toEqual([0x12, 0x34, 0x56, 0x78]);
    });

    test('roundtrip with fromBytes', () => {
      const original = new U32(0xabcdef01);
      const bytes = original.toBytes();
      const reconstructed = U32.fromBytes(new Uint8Array(bytes));
      expect(reconstructed.value).toBe(original.value);
    });
  });

  describe('gamma0', () => {
    test('computes SHA-256 γ₀ function', () => {
      const x = new U32(0x12345678);
      const result = x.gamma0();
      expect(result).toBeInstanceOf(U32);
      expect(result.value).not.toBe(x.value);
    });

    test('gamma0 on zero', () => {
      const result = new U32(0).gamma0();
      expect(result.value).toBe(0);
    });

    test('gamma0 on all ones', () => {
      const result = new U32(0xffffffff).gamma0();
      // gamma0 = ROTR⁷(x) ⊕ ROTR¹⁸(x) ⊕ SHR³(x)
      // With all ones, shifts/rotations create different patterns that XOR together
      expect(result.value).toBe(536870911); // 0x1fffffff
    });

    test('gamma0 produces consistent results', () => {
      const x = new U32(0xabcdef01);
      const result1 = x.gamma0();
      const result2 = x.gamma0();
      expect(result1.value).toBe(result2.value);
    });

    test('gamma0 is a pure function', () => {
      const x = new U32(0x6a09e667);
      const original = x.value;
      x.gamma0();
      expect(x.value).toBe(original);
    });
  });

  describe('gamma1', () => {
    test('computes SHA-256 γ₁ function', () => {
      const x = new U32(0x12345678);
      const result = x.gamma1();
      expect(result).toBeInstanceOf(U32);
      expect(result.value).not.toBe(x.value);
    });

    test('gamma1 on zero', () => {
      const result = new U32(0).gamma1();
      expect(result.value).toBe(0);
    });

    test('gamma1 on all ones', () => {
      const result = new U32(0xffffffff).gamma1();
      // gamma1 = ROTR¹⁷(x) ⊕ ROTR¹⁹(x) ⊕ SHR¹⁰(x)
      // With all ones, shifts/rotations create different patterns that XOR together
      expect(result.value).toBe(4194303); // 0x3fffff
    });

    test('gamma1 produces consistent results', () => {
      const x = new U32(0xabcdef01);
      const result1 = x.gamma1();
      const result2 = x.gamma1();
      expect(result1.value).toBe(result2.value);
    });

    test('gamma1 is a pure function', () => {
      const x = new U32(0xbb67ae85);
      const original = x.value;
      x.gamma1();
      expect(x.value).toBe(original);
    });
  });

  describe('sigma0', () => {
    test('computes SHA-256 σ₀ function', () => {
      const x = new U32(0x12345678);
      const result = x.sigma0();
      expect(result).toBeInstanceOf(U32);
      expect(result.value).not.toBe(x.value);
    });

    test('sigma0 on zero', () => {
      const result = new U32(0).sigma0();
      expect(result.value).toBe(0);
    });

    test('sigma0 on all ones', () => {
      const result = new U32(0xffffffff).sigma0();
      expect(result.value).toBe(0xffffffff);
    });

    test('sigma0 produces consistent results', () => {
      const x = new U32(0xabcdef01);
      const result1 = x.sigma0();
      const result2 = x.sigma0();
      expect(result1.value).toBe(result2.value);
    });

    test('sigma0 is a pure function', () => {
      const x = new U32(0x3c6ef372);
      const original = x.value;
      x.sigma0();
      expect(x.value).toBe(original);
    });

    test('sigma0 implements ROTR²(x) ⊕ ROTR¹³(x) ⊕ ROTR²²(x)', () => {
      const x = new U32(0x6a09e667);
      const expected = x.rotr(2).xor(x.rotr(13)).xor(x.rotr(22));
      expect(x.sigma0().value).toBe(expected.value);
    });
  });

  describe('sigma1', () => {
    test('computes SHA-256 σ₁ function', () => {
      const x = new U32(0x12345678);
      const result = x.sigma1();
      expect(result).toBeInstanceOf(U32);
      expect(result.value).not.toBe(x.value);
    });

    test('sigma1 on zero', () => {
      const result = new U32(0).sigma1();
      expect(result.value).toBe(0);
    });

    test('sigma1 on all ones', () => {
      const result = new U32(0xffffffff).sigma1();
      expect(result.value).toBe(0xffffffff);
    });

    test('sigma1 produces consistent results', () => {
      const x = new U32(0xabcdef01);
      const result1 = x.sigma1();
      const result2 = x.sigma1();
      expect(result1.value).toBe(result2.value);
    });

    test('sigma1 is a pure function', () => {
      const x = new U32(0xa54ff53a);
      const original = x.value;
      x.sigma1();
      expect(x.value).toBe(original);
    });

    test('sigma1 implements ROTR⁶(x) ⊕ ROTR¹¹(x) ⊕ ROTR²⁵(x)', () => {
      const x = new U32(0xbb67ae85);
      const expected = x.rotr(6).xor(x.rotr(11)).xor(x.rotr(25));
      expect(x.sigma1().value).toBe(expected.value);
    });
  });

  describe('cryptographic functions integration', () => {
    test('all cryptographic functions work together', () => {
      const x = new U32(0x6a09e667);
      const g0 = x.gamma0();
      const g1 = x.gamma1();
      const s0 = x.sigma0();
      const s1 = x.sigma1();

      expect(g0).toBeInstanceOf(U32);
      expect(g1).toBeInstanceOf(U32);
      expect(s0).toBeInstanceOf(U32);
      expect(s1).toBeInstanceOf(U32);

      expect(g0.value).not.toBe(g1.value);
      expect(s0.value).not.toBe(s1.value);
    });

    test('functions work with SHA-256 initial hash values', () => {
      const h0 = new U32(0x6a09e667);
      const h1 = new U32(0xbb67ae85);
      const h2 = new U32(0x3c6ef372);
      const h3 = new U32(0xa54ff53a);

      expect(h0.sigma0()).toBeInstanceOf(U32);
      expect(h1.sigma1()).toBeInstanceOf(U32);
      expect(h2.maj(h0, h1)).toBeInstanceOf(U32);
      expect(h3.ch(h0, h1)).toBeInstanceOf(U32);
    });
  });
});
