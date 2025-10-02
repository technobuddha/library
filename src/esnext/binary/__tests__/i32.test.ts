import { toString } from '../../string/to-string.ts';

import { I32 } from '../i32.ts';

describe('I32', () => {
  describe('normalize', () => {
    test('normalizes positive integers', () => {
      expect(I32.normalize(42)).toBe(42);
      expect(I32.normalize(0)).toBe(0);
      expect(I32.normalize(2147483647)).toBe(2147483647);
    });

    test('normalizes negative integers', () => {
      expect(I32.normalize(-42)).toBe(-42);
      expect(I32.normalize(-2147483648)).toBe(-2147483648);
    });

    test('truncates decimal values', () => {
      expect(I32.normalize(3.7)).toBe(3);
      expect(I32.normalize(-3.7)).toBe(-3);
      expect(I32.normalize(42.99999)).toBe(42);
    });

    test('wraps values outside 32-bit range', () => {
      expect(I32.normalize(2147483648)).toBe(-2147483648);
      expect(I32.normalize(-2147483649)).toBe(2147483647);
    });

    test('normalizes BigInt values', () => {
      expect(I32.normalize(42n)).toBe(42);
      expect(I32.normalize(-42n)).toBe(-42);
      expect(I32.normalize(2147483648n)).toBe(-2147483648);
    });
  });

  describe('len', () => {
    test('returns the bit length of 32', () => {
      expect(new I32(0).len).toBe(32);
      expect(new I32(42).len).toBe(32);
      expect(new I32(-1).len).toBe(32);
    });
  });

  describe('constructor', () => {
    test('creates I32 with zero', () => {
      const i32 = new I32(0);
      expect(i32.value).toBe(0);
    });

    test('creates I32 with positive integer', () => {
      const i32 = new I32(42);
      expect(i32.value).toBe(42);
    });

    test('creates I32 with negative integer', () => {
      const i32 = new I32(-42);
      expect(i32.value).toBe(-42);
    });

    test('truncates decimal values to 32-bit integer', () => {
      expect(new I32(3.7).value).toBe(3);
      expect(new I32(-3.7).value).toBe(-3);
    });

    test('wraps values outside 32-bit range', () => {
      expect(new I32(2147483648).value).toBe(-2147483648);
      expect(new I32(-2147483649).value).toBe(2147483647);
    });

    test('handles max and min 32-bit values', () => {
      expect(new I32(2147483647).value).toBe(2147483647);
      expect(new I32(-2147483648).value).toBe(-2147483648);
    });

    test('accepts BigInt values', () => {
      expect(new I32(42n).value).toBe(42);
      expect(new I32(-42n).value).toBe(-42);
    });
  });

  describe('or', () => {
    test('performs bitwise OR on two zeros', () => {
      expect(new I32(0).or(new I32(0)).value).toBe(0);
    });

    test('performs bitwise OR with identity (0)', () => {
      expect(new I32(0b1010).or(new I32(0)).value).toBe(0b1010);
      expect(new I32(0).or(new I32(0b1010)).value).toBe(0b1010);
    });

    test('performs bitwise OR on different patterns', () => {
      expect(new I32(0b1010).or(new I32(0b0101)).value).toBe(0b1111);
      expect(new I32(0b1100).or(new I32(0b0011)).value).toBe(0b1111);
    });

    test('performs bitwise OR on same value', () => {
      expect(new I32(0b1010).or(new I32(0b1010)).value).toBe(0b1010);
    });

    test('performs bitwise OR with all bits set', () => {
      expect(new I32(0b1010).or(new I32(-1)).value).toBe(-1);
    });

    test('performs bitwise OR on negative numbers', () => {
      expect(new I32(-1).or(new I32(-2)).value).toBe(-1);
    });

    test('accepts numeric values directly', () => {
      expect(new I32(0b1010).or(0b0101).value).toBe(0b1111);
      expect(new I32(0b1100).or(0b0011).value).toBe(0b1111);
    });
  });

  describe('and', () => {
    test('performs bitwise AND on two zeros', () => {
      expect(new I32(0).and(new I32(0)).value).toBe(0);
    });

    test('performs bitwise AND with zero', () => {
      expect(new I32(0b1010).and(new I32(0)).value).toBe(0);
      expect(new I32(0).and(new I32(0b1010)).value).toBe(0);
    });

    test('performs bitwise AND on different patterns', () => {
      expect(new I32(0b1010).and(new I32(0b0101)).value).toBe(0);
      expect(new I32(0b1100).and(new I32(0b1010)).value).toBe(0b1000);
    });

    test('performs bitwise AND on same value', () => {
      expect(new I32(0b1010).and(new I32(0b1010)).value).toBe(0b1010);
    });

    test('performs bitwise AND with all bits set', () => {
      expect(new I32(0b1010).and(new I32(-1)).value).toBe(0b1010);
    });

    test('performs bitwise AND on negative numbers', () => {
      expect(new I32(-1).and(new I32(-2)).value).toBe(-2);
    });

    test('accepts numeric values directly', () => {
      expect(new I32(0b1100).and(0b1010).value).toBe(0b1000);
      expect(new I32(15).and(7).value).toBe(7);
    });
  });

  describe('xor', () => {
    test('performs bitwise XOR on two zeros', () => {
      expect(new I32(0).xor(new I32(0)).value).toBe(0);
    });

    test('performs bitwise XOR with zero (identity)', () => {
      expect(new I32(0b1010).xor(new I32(0)).value).toBe(0b1010);
      expect(new I32(0).xor(new I32(0b1010)).value).toBe(0b1010);
    });

    test('performs bitwise XOR on different patterns', () => {
      expect(new I32(0b1010).xor(new I32(0b0101)).value).toBe(0b1111);
      expect(new I32(0b1100).xor(new I32(0b1010)).value).toBe(0b0110);
    });

    test('performs bitwise XOR on same value (returns zero)', () => {
      expect(new I32(0b1010).xor(new I32(0b1010)).value).toBe(0);
      expect(new I32(42).xor(new I32(42)).value).toBe(0);
    });

    test('performs bitwise XOR with all bits set', () => {
      expect(new I32(0b1010).xor(new I32(-1)).value).toBe(new I32(0b1010).not().value);
    });

    test('performs bitwise XOR on negative numbers', () => {
      expect(new I32(-1).xor(new I32(-1)).value).toBe(0);
    });

    test('accepts numeric values directly', () => {
      expect(new I32(0b1100).xor(0b1010).value).toBe(0b0110);
      expect(new I32(42).xor(42).value).toBe(0);
    });
  });

  describe('not', () => {
    test('performs bitwise NOT on zero', () => {
      expect(new I32(0).not().value).toBe(-1);
    });

    test('performs bitwise NOT on -1', () => {
      expect(new I32(-1).not().value).toBe(0);
    });

    test('performs bitwise NOT on positive numbers', () => {
      expect(new I32(1).not().value).toBe(-2);
      expect(new I32(42).not().value).toBe(-43);
    });

    test('performs bitwise NOT on negative numbers', () => {
      expect(new I32(-2).not().value).toBe(1);
      expect(new I32(-43).not().value).toBe(42);
    });

    test('double NOT returns original value', () => {
      expect(new I32(42).not().not().value).toBe(42);
      expect(new I32(-42).not().not().value).toBe(-42);
    });
  });

  describe('add', () => {
    test('adds two positive numbers', () => {
      expect(new I32(10).add(new I32(5)).value).toBe(15);
      expect(new I32(100).add(new I32(200)).value).toBe(300);
    });

    test('adds positive and negative numbers', () => {
      expect(new I32(10).add(new I32(-5)).value).toBe(5);
      expect(new I32(-10).add(new I32(5)).value).toBe(-5);
    });

    test('adds two negative numbers', () => {
      expect(new I32(-10).add(new I32(-5)).value).toBe(-15);
    });

    test('adds with zero', () => {
      expect(new I32(42).add(new I32(0)).value).toBe(42);
      expect(new I32(0).add(new I32(42)).value).toBe(42);
    });

    test('wraps on overflow', () => {
      expect(new I32(2147483647).add(new I32(1)).value).toBe(-2147483648);
      expect(new I32(2147483647).add(new I32(2)).value).toBe(-2147483647);
    });

    test('wraps on underflow', () => {
      expect(new I32(-2147483648).add(new I32(-1)).value).toBe(2147483647);
    });

    test('accepts numeric values directly', () => {
      expect(new I32(10).add(5).value).toBe(15);
      expect(new I32(-5).add(3).value).toBe(-2);
    });
  });

  describe('subtract', () => {
    test('subtracts two positive numbers', () => {
      expect(new I32(10).sub(new I32(5)).value).toBe(5);
      expect(new I32(100).sub(new I32(30)).value).toBe(70);
    });

    test('subtracts resulting in negative', () => {
      expect(new I32(5).sub(new I32(10)).value).toBe(-5);
    });

    test('subtracts negative numbers', () => {
      expect(new I32(10).sub(new I32(-5)).value).toBe(15);
      expect(new I32(-10).sub(new I32(-5)).value).toBe(-5);
    });

    test('subtracts with zero', () => {
      expect(new I32(42).sub(new I32(0)).value).toBe(42);
      expect(new I32(0).sub(new I32(42)).value).toBe(-42);
    });

    test('wraps on underflow', () => {
      expect(new I32(-2147483648).sub(new I32(1)).value).toBe(2147483647);
    });

    test('wraps on overflow', () => {
      expect(new I32(2147483647).sub(new I32(-1)).value).toBe(-2147483648);
    });

    test('accepts numeric values directly', () => {
      expect(new I32(10).sub(5).value).toBe(5);
      expect(new I32(5).sub(10).value).toBe(-5);
    });
  });

  describe('multiply', () => {
    test('multiplies two positive numbers', () => {
      expect(new I32(10).mul(new I32(5)).value).toBe(50);
      expect(new I32(7).mul(new I32(6)).value).toBe(42);
    });

    test('multiplies with negative numbers', () => {
      expect(new I32(-3).mul(new I32(4)).value).toBe(-12);
      expect(new I32(3).mul(new I32(-4)).value).toBe(-12);
      expect(new I32(-3).mul(new I32(-4)).value).toBe(12);
    });

    test('multiplies with zero', () => {
      expect(new I32(42).mul(new I32(0)).value).toBe(0);
      expect(new I32(0).mul(new I32(42)).value).toBe(0);
    });

    test('multiplies with one', () => {
      expect(new I32(42).mul(new I32(1)).value).toBe(42);
      expect(new I32(-42).mul(new I32(1)).value).toBe(-42);
    });

    test('wraps on overflow', () => {
      expect(new I32(100000).mul(new I32(100000)).value).toBe(1410065408);
      expect(new I32(65536).mul(new I32(65536)).value).toBe(0);
    });

    test('accepts numeric values directly', () => {
      expect(new I32(10).mul(5).value).toBe(50);
      expect(new I32(-3).mul(4).value).toBe(-12);
    });
  });

  describe('divide', () => {
    test('divides two positive numbers', () => {
      expect(new I32(10).div(new I32(3)).value).toBe(3);
      expect(new I32(20).div(new I32(4)).value).toBe(5);
    });

    test('divides with negative numbers', () => {
      expect(new I32(-10).div(new I32(3)).value).toBe(-3);
      expect(new I32(10).div(new I32(-3)).value).toBe(-3);
      expect(new I32(-10).div(new I32(-3)).value).toBe(3);
    });

    test('divides by one', () => {
      expect(new I32(42).div(new I32(1)).value).toBe(42);
      expect(new I32(-42).div(new I32(1)).value).toBe(-42);
    });

    test('divides resulting in zero', () => {
      expect(new I32(2).div(new I32(3)).value).toBe(0);
      expect(new I32(-2).div(new I32(3)).value).toBe(0);
    });

    test('throws on division by zero', () => {
      expect(() => new I32(10).div(new I32(0))).toThrow(RangeError);
      expect(() => new I32(10).div(new I32(0))).toThrow('Division by zero');
    });

    test('accepts numeric values directly', () => {
      expect(new I32(10).div(3).value).toBe(3);
      expect(new I32(-10).div(3).value).toBe(-3);
    });

    test('throws on division by zero with numeric parameter', () => {
      expect(() => new I32(10).div(0)).toThrow(RangeError);
    });
  });

  describe('modulo', () => {
    test('computes modulo of positive numbers', () => {
      expect(new I32(10).mod(new I32(3)).value).toBe(1);
      expect(new I32(20).mod(new I32(7)).value).toBe(6);
    });

    test('computes modulo with negative dividend', () => {
      expect(new I32(-10).mod(new I32(3)).value).toBe(-1);
      expect(new I32(-20).mod(new I32(7)).value).toBe(-6);
    });

    test('computes modulo with negative divisor', () => {
      expect(new I32(10).mod(new I32(-3)).value).toBe(1);
      expect(new I32(-10).mod(new I32(-3)).value).toBe(-1);
    });

    test('modulo by one', () => {
      expect(new I32(42).mod(new I32(1)).value).toBe(0);
      expect(new I32(-42).mod(new I32(1)).value).toBe(0);
    });

    test('modulo when dividend is smaller than divisor', () => {
      expect(new I32(2).mod(new I32(3)).value).toBe(2);
      expect(new I32(-2).mod(new I32(3)).value).toBe(-2);
    });

    test('throws on modulo by zero', () => {
      expect(() => new I32(10).mod(new I32(0))).toThrow(RangeError);
      expect(() => new I32(10).mod(new I32(0))).toThrow('Division by zero');
    });

    test('accepts numeric values directly', () => {
      expect(new I32(10).mod(3).value).toBe(1);
      expect(new I32(-10).mod(3).value).toBe(-1);
    });

    test('throws on modulo by zero with numeric parameter', () => {
      expect(() => new I32(10).mod(0)).toThrow(RangeError);
    });
  });

  describe('shl', () => {
    test('shifts left by 0 (no change)', () => {
      expect(new I32(0b1010).shl(0).value).toBe(0b1010);
    });

    test('shifts left by 1', () => {
      expect(new I32(0b1010).shl(1).value).toBe(0b10100);
      expect(new I32(1).shl(1).value).toBe(2);
    });

    test('shifts left by multiple positions', () => {
      expect(new I32(1).shl(8).value).toBe(256);
      expect(new I32(0b1010).shl(4).value).toBe(0b10100000);
    });

    test('shifts left clamps to 32 bits', () => {
      expect(new I32(1).shl(31).value).toBe(-2147483648);
      expect(new I32(1).shl(32).value).toBe(1);
    });

    test('shifts left with negative shift amount (clamped to 0)', () => {
      expect(new I32(0b1010).shl(-5).value).toBe(0b1010);
    });

    test('shifts left beyond 32 bits (clamped)', () => {
      expect(new I32(1).shl(100).value).toBe(1);
    });
  });

  describe('shr', () => {
    test('shifts right by 0 (no change)', () => {
      expect(new I32(0b1010).shr(0).value).toBe(0b1010);
    });

    test('shifts right by 1', () => {
      expect(new I32(0b1010).shr(1).value).toBe(0b101);
      expect(new I32(8).shr(1).value).toBe(4);
    });

    test('shifts right by multiple positions', () => {
      expect(new I32(256).shr(8).value).toBe(1);
      expect(new I32(0b10100000).shr(4).value).toBe(0b1010);
    });

    test('shifts right preserves sign (arithmetic shift)', () => {
      expect(new I32(-8).shr(1).value).toBe(-4);
      expect(new I32(-16).shr(2).value).toBe(-4);
    });

    test('shifts right with negative shift amount (clamped to 0)', () => {
      expect(new I32(0b1010).shr(-5).value).toBe(0b1010);
    });

    test('shifts right beyond 32 bits (clamped)', () => {
      expect(new I32(42).shr(100).value).toBe(42);
      expect(new I32(-42).shr(100).value).toBe(-42);
    });
  });

  describe('rotl', () => {
    test('rotates left by 0 (no change)', () => {
      expect(new I32(0b1010).rotl(0).value).toBe(0b1010);
    });

    test('rotates left by 1', () => {
      expect(new I32(0b1010).rotl(1).value).toBe(0b10100);
    });

    test('rotates left wraps bits around', () => {
      expect(new I32(0x80000001).rotl(1).value).toBe(0x00000003);
    });

    test('rotates left by 4', () => {
      expect(new I32(0x12345678).rotl(4).value).toBe(0x23456781);
    });

    test('rotates left by 32 (full rotation, modulo gives 0)', () => {
      const value = 0x12345678;
      expect(new I32(value).rotl(32).value).toBe(value);
    });

    test('rotates left by negative amount (rotates right)', () => {
      const value = 0x12345678;
      expect(new I32(value).rotl(-4).value).toBe(new I32(value).rotr(4).value);
    });

    test('rotates left with modulo behavior', () => {
      const value = 0x12345678;
      expect(new I32(value).rotl(36).value).toBe(new I32(value).rotl(4).value);
    });
  });

  describe('rotr', () => {
    test('rotates right by 0 (no change)', () => {
      expect(new I32(0b1010).rotr(0).value).toBe(0b1010);
    });

    test('rotates right by 1', () => {
      expect(new I32(0b10100).rotr(1).value).toBe(0b1010);
    });

    test('rotates right wraps bits around', () => {
      expect(new I32(0x00000003).rotr(1).value).toBe(-2147483647);
    });

    test('rotates right by 4', () => {
      expect(new I32(0x12345678).rotr(4).value).toBe(-2128394905);
    });

    test('rotates right by 32 (full rotation, modulo gives 0)', () => {
      const value = 0x12345678;
      expect(new I32(value).rotr(32).value).toBe(value);
    });

    test('rotates right by negative amount (rotates left)', () => {
      const value = 0x12345678;
      expect(new I32(value).rotr(-4).value).toBe(new I32(value).rotl(4).value);
    });

    test('rotates right with modulo behavior', () => {
      const value = 0x12345678;
      expect(new I32(value).rotr(36).value).toBe(new I32(value).rotr(4).value);
    });
  });

  describe('maj', () => {
    test('returns maj bit for each position', () => {
      const x = new I32(0b1110);
      const y = new I32(0b1010);
      const z = new I32(0b1100);
      expect(x.maj(y, z).value).toBe(0b1110);
    });

    test('maj with all zeros', () => {
      expect(new I32(0).maj(new I32(0), new I32(0)).value).toBe(0);
    });

    test('maj with all ones', () => {
      expect(new I32(-1).maj(new I32(-1), new I32(-1)).value).toBe(-1);
    });

    test('maj with two ones and one zero', () => {
      expect(new I32(-1).maj(new I32(-1), new I32(0)).value).toBe(-1);
      expect(new I32(-1).maj(new I32(0), new I32(-1)).value).toBe(-1);
      expect(new I32(0).maj(new I32(-1), new I32(-1)).value).toBe(-1);
    });

    test('maj with two zeros and one one', () => {
      expect(new I32(0).maj(new I32(0), new I32(-1)).value).toBe(0);
      expect(new I32(0).maj(new I32(-1), new I32(0)).value).toBe(0);
      expect(new I32(-1).maj(new I32(0), new I32(0)).value).toBe(0);
    });
  });

  describe('ch', () => {
    test('chs y where x is 1, z where x is 0', () => {
      const x = new I32(0b1100);
      const y = new I32(0b1010);
      const z = new I32(0b0101);
      expect(x.ch(y, z).value).toBe(0b1001);
    });

    test('ch with all zeros', () => {
      expect(new I32(0).ch(new I32(0), new I32(0)).value).toBe(0);
    });

    test('ch returns y when x is all ones', () => {
      const y = new I32(0b1010);
      expect(new I32(-1).ch(y, new I32(0)).value).toBe(y.value);
    });

    test('ch returns z when x is all zeros', () => {
      const z = new I32(0b1010);
      expect(new I32(0).ch(new I32(0), z).value).toBe(z.value);
    });

    test('ch with complex patterns', () => {
      const x = new I32(0xf0f0f0f0);
      const y = new I32(0xaaaaaaaa);
      const z = new I32(0x55555555);
      expect(x.ch(y, z).value).toBe(-1515870811);
    });
  });

  describe('cnt1', () => {
    test('counts zero ones in zero', () => {
      expect(new I32(0).cnt1()).toBe(0);
    });

    test('counts one in 1', () => {
      expect(new I32(1).cnt1()).toBe(1);
    });

    test('counts ones in powers of two', () => {
      expect(new I32(2).cnt1()).toBe(1);
      expect(new I32(4).cnt1()).toBe(1);
      expect(new I32(8).cnt1()).toBe(1);
      expect(new I32(16).cnt1()).toBe(1);
      expect(new I32(128).cnt1()).toBe(1);
      expect(new I32(1024).cnt1()).toBe(1);
    });

    test('counts ones in all bits set', () => {
      expect(new I32(-1).cnt1()).toBe(32);
    });

    test('counts ones in various patterns', () => {
      expect(new I32(0b1111).cnt1()).toBe(4);
      expect(new I32(0b10101010).cnt1()).toBe(4);
      expect(new I32(0b11111111).cnt1()).toBe(8);
      expect(new I32(0b1010101010101010).cnt1()).toBe(8);
    });

    test('counts ones in max 32-bit signed integer', () => {
      expect(new I32(2147483647).cnt1()).toBe(31);
    });

    test('counts ones in min 32-bit signed integer', () => {
      expect(new I32(-2147483648).cnt1()).toBe(1);
    });

    test('counts ones in negative numbers', () => {
      expect(new I32(-2).cnt1()).toBe(31);
      expect(new I32(-3).cnt1()).toBe(31);
      expect(new I32(-128).cnt1()).toBe(25);
    });

    test('counts ones in mixed bit patterns', () => {
      expect(new I32(0x0f0f0f0f).cnt1()).toBe(16);
      expect(new I32(0x55555555).cnt1()).toBe(16);
      expect(new I32(0xaaaaaaaa).cnt1()).toBe(16);
      expect(new I32(0xffff0000).cnt1()).toBe(16);
      expect(new I32(0x0000ffff).cnt1()).toBe(16);
    });
  });

  describe('cnt0', () => {
    test('counts 32 zeros in zero', () => {
      expect(new I32(0).cnt0()).toBe(32);
    });

    test('counts zeros in 1', () => {
      expect(new I32(1).cnt0()).toBe(31);
    });

    test('counts zeros in powers of two', () => {
      expect(new I32(2).cnt0()).toBe(31);
      expect(new I32(4).cnt0()).toBe(31);
      expect(new I32(8).cnt0()).toBe(31);
      expect(new I32(16).cnt0()).toBe(31);
      expect(new I32(128).cnt0()).toBe(31);
      expect(new I32(1024).cnt0()).toBe(31);
    });

    test('counts zero zeros in all bits set', () => {
      expect(new I32(-1).cnt0()).toBe(0);
    });

    test('counts zeros in various patterns', () => {
      expect(new I32(0b1111).cnt0()).toBe(28);
      expect(new I32(0b10101010).cnt0()).toBe(28);
      expect(new I32(0b11111111).cnt0()).toBe(24);
      expect(new I32(0b1010101010101010).cnt0()).toBe(24);
    });

    test('counts zeros in max 32-bit signed integer', () => {
      expect(new I32(2147483647).cnt0()).toBe(1);
    });

    test('counts zeros in min 32-bit signed integer', () => {
      expect(new I32(-2147483648).cnt0()).toBe(31);
    });

    test('counts zeros in negative numbers', () => {
      expect(new I32(-2).cnt0()).toBe(1);
      expect(new I32(-3).cnt0()).toBe(1);
      expect(new I32(-128).cnt0()).toBe(7);
    });

    test('counts zeros in mixed bit patterns', () => {
      expect(new I32(0x0f0f0f0f).cnt0()).toBe(16);
      expect(new I32(0x55555555).cnt0()).toBe(16);
      expect(new I32(0xaaaaaaaa).cnt0()).toBe(16);
      expect(new I32(0xffff0000).cnt0()).toBe(16);
      expect(new I32(0x0000ffff).cnt0()).toBe(16);
    });
  });

  describe('cnt1 and cnt0 complement', () => {
    test('sum of ones and zeros equals 32', () => {
      const testValues = [
        0, 1, -1, 42, -42, 255, -255, 2147483647, -2147483648, 0x12345678, 0xabcdef01,
      ];

      for (const value of testValues) {
        const i32 = new I32(value);
        expect(i32.cnt1() + i32.cnt0()).toBe(32);
      }
    });
  });

  describe('toString', () => {
    test('converts to decimal string by default', () => {
      expect(new I32(42).toString()).toBe('42');
      expect(new I32(-42).toString()).toBe('-42');
      expect(new I32(0).toString()).toBe('0');
    });

    test('converts to binary string', () => {
      expect(new I32(10).toString(2)).toBe('1010');
      expect(new I32(255).toString(2)).toBe('11111111');
    });

    test('converts to hexadecimal string', () => {
      expect(new I32(255).toString(16)).toBe('ff');
      expect(new I32(0x12345678).toString(16)).toBe('12345678');
    });

    test('converts to octal string', () => {
      expect(new I32(64).toString(8)).toBe('100');
      expect(new I32(511).toString(8)).toBe('777');
    });

    test('converts negative numbers to string', () => {
      expect(new I32(-1).toString(16)).toBe('-1');
      expect(new I32(-255).toString(16)).toBe('-ff');
    });

    test('handles various radix values', () => {
      expect(new I32(100).toString(36)).toBe('2s');
      expect(new I32(100).toString(10)).toBe('100');
    });
  });

  describe('valueOf', () => {
    test('returns the numeric value', () => {
      expect(new I32(42).valueOf()).toBe(42);
      expect(new I32(-42).valueOf()).toBe(-42);
      expect(new I32(0).valueOf()).toBe(0);
    });

    test('returns 32-bit wrapped values', () => {
      expect(new I32(2147483647).valueOf()).toBe(2147483647);
      expect(new I32(-2147483648).valueOf()).toBe(-2147483648);
    });

    test('allows numeric operations', () => {
      expect(new I32(10).valueOf() + 5).toBe(15);
      expect(new I32(10).valueOf() * 2).toBe(20);
    });
  });

  describe('Symbol.toPrimitive', () => {
    test('converts to number when hint is number', () => {
      const i32 = new I32(42);
      expect(Number(i32)).toBe(42);
      expect(i32.valueOf()).toBe(42);
    });

    test('converts to string when hint is string', () => {
      const i32 = new I32(42);
      expect(toString(i32)).toBe('42');
      expect(i32.toString()).toBe('42');
    });

    test('works with negative numbers', () => {
      const i32 = new I32(-42);
      expect(Number(i32)).toBe(-42);
      expect(toString(i32)).toBe('-42');
    });
  });

  describe('integration tests', () => {
    test('chaining operations', () => {
      const result = new I32(0b1100).or(new I32(0b0011)).and(new I32(0b1010)).xor(new I32(0b0101));
      expect(result.value).toBe(0b1111);
    });

    test('complex bit manipulation', () => {
      const value = new I32(0xaaaaaaaa);
      const rotated = value.rotl(8);
      const shifted = rotated.shr(4);
      expect(shifted.cnt1()).toBe(18);
    });

    test('immutability - operations return new instances', () => {
      const original = new I32(42);
      const modified = original.or(new I32(8));
      expect(original.value).toBe(42);
      expect(modified.value).toBe(42);
    });

    test('working with cryptographic-style operations', () => {
      const x = new I32(0x6a09e667);
      const y = new I32(0xbb67ae85);
      const z = new I32(0x3c6ef372);

      const maj = x.maj(y, z);
      const ch = x.ch(y, z);

      expect(maj.value).not.toBe(0);
      expect(ch.value).not.toBe(0);
    });
  });

  describe('eq', () => {
    test('returns true for equal values', () => {
      expect(new I32(42).eq(42)).toBeTrue();
      expect(new I32(42).eq(new I32(42))).toBeTrue();
      expect(new I32(-42).eq(-42)).toBeTrue();
      expect(new I32(0).eq(0)).toBeTrue();
    });

    test('returns false for unequal values', () => {
      expect(new I32(42).eq(43)).toBeFalse();
      expect(new I32(42).eq(new I32(43))).toBeFalse();
      expect(new I32(-42).eq(42)).toBeFalse();
    });

    test('works with boundary values', () => {
      expect(new I32(2147483647).eq(2147483647)).toBeTrue();
      expect(new I32(-2147483648).eq(-2147483648)).toBeTrue();
    });
  });

  describe('ne', () => {
    test('returns true for unequal values', () => {
      expect(new I32(42).ne(43)).toBeTrue();
      expect(new I32(42).ne(new I32(43))).toBeTrue();
      expect(new I32(-42).ne(42)).toBeTrue();
    });

    test('returns false for equal values', () => {
      expect(new I32(42).ne(42)).toBeFalse();
      expect(new I32(42).ne(new I32(42))).toBeFalse();
      expect(new I32(-42).ne(-42)).toBeFalse();
    });
  });

  describe('lt', () => {
    test('returns true when less than', () => {
      expect(new I32(10).lt(20)).toBeTrue();
      expect(new I32(10).lt(new I32(20))).toBeTrue();
      expect(new I32(-10).lt(0)).toBeTrue();
      expect(new I32(-20).lt(-10)).toBeTrue();
    });

    test('returns false when equal', () => {
      expect(new I32(42).lt(42)).toBeFalse();
      expect(new I32(42).lt(new I32(42))).toBeFalse();
      expect(new I32(-42).lt(-42)).toBeFalse();
    });

    test('returns false when greater than', () => {
      expect(new I32(50).lt(40)).toBeFalse();
      expect(new I32(50).lt(new I32(40))).toBeFalse();
      expect(new I32(0).lt(-10)).toBeFalse();
    });

    test('works with boundary values', () => {
      expect(new I32(-2147483648).lt(2147483647)).toBeTrue();
      expect(new I32(2147483647).lt(-2147483648)).toBeFalse();
    });
  });

  describe('le', () => {
    test('returns true when less than', () => {
      expect(new I32(10).le(20)).toBeTrue();
      expect(new I32(10).le(new I32(20))).toBeTrue();
      expect(new I32(-10).le(0)).toBeTrue();
    });

    test('returns true when equal', () => {
      expect(new I32(42).le(42)).toBeTrue();
      expect(new I32(42).le(new I32(42))).toBeTrue();
      expect(new I32(-42).le(-42)).toBeTrue();
    });

    test('returns false when greater than', () => {
      expect(new I32(50).le(40)).toBeFalse();
      expect(new I32(50).le(new I32(40))).toBeFalse();
      expect(new I32(0).le(-10)).toBeFalse();
    });
  });

  describe('gt', () => {
    test('returns true when greater than', () => {
      expect(new I32(50).gt(40)).toBeTrue();
      expect(new I32(50).gt(new I32(40))).toBeTrue();
      expect(new I32(0).gt(-10)).toBeTrue();
      expect(new I32(-10).gt(-20)).toBeTrue();
    });

    test('returns false when equal', () => {
      expect(new I32(42).gt(42)).toBeFalse();
      expect(new I32(42).gt(new I32(42))).toBeFalse();
      expect(new I32(-42).gt(-42)).toBeFalse();
    });

    test('returns false when less than', () => {
      expect(new I32(10).gt(20)).toBeFalse();
      expect(new I32(10).gt(new I32(20))).toBeFalse();
      expect(new I32(-10).gt(0)).toBeFalse();
    });

    test('works with boundary values', () => {
      expect(new I32(2147483647).gt(-2147483648)).toBeTrue();
      expect(new I32(-2147483648).gt(2147483647)).toBeFalse();
    });
  });

  describe('ge', () => {
    test('returns true when greater than', () => {
      expect(new I32(50).ge(40)).toBeTrue();
      expect(new I32(50).ge(new I32(40))).toBeTrue();
      expect(new I32(0).ge(-10)).toBeTrue();
    });

    test('returns true when equal', () => {
      expect(new I32(42).ge(42)).toBeTrue();
      expect(new I32(42).ge(new I32(42))).toBeTrue();
      expect(new I32(-42).ge(-42)).toBeTrue();
    });

    test('returns false when less than', () => {
      expect(new I32(10).ge(20)).toBeFalse();
      expect(new I32(10).ge(new I32(20))).toBeFalse();
      expect(new I32(-10).ge(0)).toBeFalse();
    });
  });
});
