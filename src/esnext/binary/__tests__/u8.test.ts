import { toString } from '../../string/to-string.ts';

import { U8 } from '../u8.ts';

describe('U8', () => {
  describe('constructor', () => {
    test('creates U8 with zero', () => {
      expect(new U8(0).value).toBe(0);
    });

    test('creates U8 with positive integer', () => {
      expect(new U8(42).value).toBe(42);
    });

    test('wraps negative integers to unsigned range', () => {
      expect(new U8(-1).value).toBe(255);
      expect(new U8(-50).value).toBe(206);
    });

    test('truncates decimal values to 8-bit integer', () => {
      expect(new U8(42.7).value).toBe(42);
    });

    test('wraps values outside 8-bit unsigned range', () => {
      expect(new U8(300).value).toBe(44);
      expect(new U8(256).value).toBe(0);
      expect(new U8(512).value).toBe(0);
    });

    test('handles max 8-bit unsigned value', () => {
      expect(new U8(255).value).toBe(255);
      expect(new U8(256).value).toBe(0);
    });
  });

  describe('len', () => {
    test('returns the bit length of 8', () => {
      expect(new U8(0).len).toBe(8);
      expect(new U8(42).len).toBe(8);
      expect(new U8(255).len).toBe(8);
    });
  });

  describe('or', () => {
    test('performs bitwise OR on two zeros', () => {
      expect(new U8(0).or(new U8(0)).value).toBe(0);
    });

    test('performs bitwise OR with identity (0)', () => {
      expect(new U8(42).or(new U8(0)).value).toBe(42);
    });

    test('performs bitwise OR on different patterns', () => {
      expect(new U8(0b1010).or(new U8(0b0101)).value).toBe(0b1111);
    });

    test('performs bitwise OR on same value', () => {
      expect(new U8(42).or(new U8(42)).value).toBe(42);
    });

    test('performs bitwise OR with all bits set', () => {
      expect(new U8(255).or(new U8(42)).value).toBe(255);
    });

    test('performs bitwise OR on large unsigned values', () => {
      expect(new U8(200).or(new U8(100)).value).toBe(236);
    });
  });

  describe('and', () => {
    test('performs bitwise AND on two zeros', () => {
      expect(new U8(0).and(new U8(0)).value).toBe(0);
    });

    test('performs bitwise AND with zero', () => {
      expect(new U8(42).and(new U8(0)).value).toBe(0);
    });

    test('performs bitwise AND on different patterns', () => {
      expect(new U8(0b1010).and(new U8(0b0110)).value).toBe(0b0010);
    });

    test('performs bitwise AND on same value', () => {
      expect(new U8(42).and(new U8(42)).value).toBe(42);
    });

    test('performs bitwise AND with all bits set', () => {
      expect(new U8(42).and(new U8(255)).value).toBe(42);
    });

    test('performs bitwise AND on large unsigned values', () => {
      expect(new U8(200).and(new U8(100)).value).toBe(64);
    });
  });

  describe('xor', () => {
    test('performs bitwise XOR on two zeros', () => {
      expect(new U8(0).xor(new U8(0)).value).toBe(0);
    });

    test('performs bitwise XOR with zero (identity)', () => {
      expect(new U8(42).xor(new U8(0)).value).toBe(42);
    });

    test('performs bitwise XOR on different patterns', () => {
      expect(new U8(0b1010).xor(new U8(0b0110)).value).toBe(0b1100);
    });

    test('performs bitwise XOR on same value (returns zero)', () => {
      expect(new U8(42).xor(new U8(42)).value).toBe(0);
    });

    test('performs bitwise XOR with all bits set', () => {
      expect(new U8(42).xor(new U8(255)).value).toBe(213);
    });

    test('performs bitwise XOR on large unsigned values', () => {
      expect(new U8(200).xor(new U8(100)).value).toBe(172);
    });
  });

  describe('not', () => {
    test('performs bitwise NOT on zero', () => {
      expect(new U8(0).not().value).toBe(255);
    });

    test('performs bitwise NOT on all bits set', () => {
      expect(new U8(255).not().value).toBe(0);
    });

    test('performs bitwise NOT on positive numbers', () => {
      expect(new U8(1).not().value).toBe(254);
      expect(new U8(42).not().value).toBe(213);
    });

    test('performs bitwise NOT on high bit set', () => {
      expect(new U8(128).not().value).toBe(127);
    });

    test('double NOT returns original value', () => {
      expect(new U8(42).not().not().value).toBe(42);
    });
  });

  describe('add', () => {
    test('adds two positive numbers', () => {
      expect(new U8(10).add(new U8(20)).value).toBe(30);
    });

    test('adds with zero', () => {
      expect(new U8(42).add(new U8(0)).value).toBe(42);
    });

    test('wraps on overflow', () => {
      expect(new U8(200).add(new U8(100)).value).toBe(44);
      expect(new U8(255).add(new U8(1)).value).toBe(0);
    });
  });

  describe('subtract', () => {
    test('subtracts two numbers', () => {
      expect(new U8(30).sub(new U8(10)).value).toBe(20);
    });

    test('subtracts with zero', () => {
      expect(new U8(42).sub(new U8(0)).value).toBe(42);
    });

    test('wraps on underflow', () => {
      expect(new U8(10).sub(new U8(20)).value).toBe(246);
      expect(new U8(0).sub(new U8(1)).value).toBe(255);
    });
  });

  describe('multiply', () => {
    test('multiplies two numbers', () => {
      expect(new U8(5).mul(new U8(3)).value).toBe(15);
    });

    test('multiplies with zero', () => {
      expect(new U8(42).mul(new U8(0)).value).toBe(0);
    });

    test('multiplies with one', () => {
      expect(new U8(42).mul(new U8(1)).value).toBe(42);
    });

    test('wraps on overflow', () => {
      expect(new U8(20).mul(new U8(20)).value).toBe(144);
      expect(new U8(16).mul(new U8(16)).value).toBe(0);
    });
  });

  describe('divide', () => {
    test('divides two numbers', () => {
      expect(new U8(20).div(new U8(3)).value).toBe(6);
    });

    test('divides by one', () => {
      expect(new U8(42).div(new U8(1)).value).toBe(42);
    });

    test('divides resulting in zero', () => {
      expect(new U8(2).div(new U8(3)).value).toBe(0);
    });

    test('throws on division by zero', () => {
      expect(() => new U8(42).div(new U8(0))).toThrow(RangeError);
      expect(() => new U8(42).div(new U8(0))).toThrow('Division by zero');
    });
  });

  describe('modulo', () => {
    test('computes modulo', () => {
      expect(new U8(10).mod(new U8(3)).value).toBe(1);
    });

    test('modulo by one', () => {
      expect(new U8(42).mod(new U8(1)).value).toBe(0);
    });

    test('modulo when dividend is smaller than divisor', () => {
      expect(new U8(2).mod(new U8(3)).value).toBe(2);
    });

    test('throws on modulo by zero', () => {
      expect(() => new U8(42).mod(new U8(0))).toThrow(RangeError);
      expect(() => new U8(42).mod(new U8(0))).toThrow('Division by zero');
    });
  });

  describe('shl', () => {
    test('shifts left by 0 (no change)', () => {
      expect(new U8(42).shl(0).value).toBe(42);
    });

    test('shifts left by 1', () => {
      expect(new U8(1).shl(1).value).toBe(2);
      expect(new U8(21).shl(1).value).toBe(42);
    });

    test('shifts left by multiple positions', () => {
      expect(new U8(1).shl(3).value).toBe(8);
      expect(new U8(5).shl(2).value).toBe(20);
    });

    test('shifts left wraps at 8 bits', () => {
      expect(new U8(64).shl(2).value).toBe(0);
      expect(new U8(128).shl(1).value).toBe(0);
    });

    test('shifts left with negative shift amount (clamped to 0)', () => {
      expect(new U8(42).shl(-1).value).toBe(42);
    });

    test('shifts left beyond 8 bits (clamped)', () => {
      expect(new U8(42).shl(100).value).toBe(0);
    });
  });

  describe('shr', () => {
    test('shifts right by 0 (no change)', () => {
      expect(new U8(42).shr(0).value).toBe(42);
    });

    test('shifts right by 1', () => {
      expect(new U8(2).shr(1).value).toBe(1);
      expect(new U8(42).shr(1).value).toBe(21);
    });

    test('shifts right by multiple positions', () => {
      expect(new U8(8).shr(3).value).toBe(1);
      expect(new U8(20).shr(2).value).toBe(5);
    });

    test('shifts right with zero-fill (logical shift)', () => {
      expect(new U8(255).shr(1).value).toBe(127);
      expect(new U8(128).shr(1).value).toBe(64);
    });

    test('shifts right with negative shift amount (clamped to 0)', () => {
      expect(new U8(42).shr(-1).value).toBe(42);
    });

    test('shifts right beyond 8 bits (clamped)', () => {
      expect(new U8(42).shr(100).value).toBe(0);
    });
  });

  describe('rotl', () => {
    test('rotates left by 0 (no change)', () => {
      expect(new U8(0b10101010).rotl(0).value).toBe(0b10101010);
    });

    test('rotates left by 1', () => {
      expect(new U8(0b10000000).rotl(1).value).toBe(1);
    });

    test('rotates left wraps bits around', () => {
      expect(new U8(0b11000000).rotl(1).value).toBe(0b10000001);
    });

    test('rotates left by 4', () => {
      expect(new U8(0b00001111).rotl(4).value).toBe(0b11110000);
    });

    test('rotates left by 8 (full rotation, modulo gives 0)', () => {
      expect(new U8(0b10101010).rotl(8).value).toBe(0b10101010);
    });

    test('rotates left by negative amount (rotates right)', () => {
      expect(new U8(0b10000001).rotl(-1).value).toBe(0b11000000);
    });

    test('rotates left with modulo behavior', () => {
      expect(new U8(0b10101010).rotl(9).value).toBe(new U8(0b10101010).rotl(1).value);
    });
  });

  describe('rotr', () => {
    test('rotates right by 0 (no change)', () => {
      expect(new U8(0b10101010).rotr(0).value).toBe(0b10101010);
    });

    test('rotates right by 1', () => {
      expect(new U8(1).rotr(1).value).toBe(0b10000000);
    });

    test('rotates right wraps bits around', () => {
      expect(new U8(0b10000001).rotr(1).value).toBe(0b11000000);
    });

    test('rotates right by 4', () => {
      expect(new U8(0b11110000).rotr(4).value).toBe(0b00001111);
    });

    test('rotates right by 8 (full rotation, modulo gives 0)', () => {
      expect(new U8(0b10101010).rotr(8).value).toBe(0b10101010);
    });

    test('rotates right by negative amount (rotates left)', () => {
      expect(new U8(0b11000000).rotr(-1).value).toBe(0b10000001);
    });

    test('rotates right with modulo behavior', () => {
      expect(new U8(0b10101010).rotr(9).value).toBe(new U8(0b10101010).rotr(1).value);
    });
  });

  describe('maj', () => {
    test('returns maj bit for each position', () => {
      expect(new U8(0b1010).maj(new U8(0b1100), new U8(0b1001)).value).toBe(0b1000);
    });

    test('maj with all zeros', () => {
      expect(new U8(0).maj(new U8(0), new U8(0)).value).toBe(0);
    });

    test('maj with all ones', () => {
      expect(new U8(255).maj(new U8(255), new U8(255)).value).toBe(255);
    });

    test('maj with two ones and one zero', () => {
      expect(new U8(255).maj(new U8(255), new U8(0)).value).toBe(255);
    });

    test('maj with two zeros and one one', () => {
      expect(new U8(0).maj(new U8(0), new U8(255)).value).toBe(0);
    });
  });

  describe('ch', () => {
    test('chs y where x is 1, z where x is 0', () => {
      expect(new U8(0b1010).ch(new U8(0b1111), new U8(0b0000)).value).toBe(0b1010);
    });

    test('ch with all zeros', () => {
      expect(new U8(0).ch(new U8(255), new U8(0)).value).toBe(0);
    });

    test('ch returns y when x is all ones', () => {
      expect(new U8(255).ch(new U8(42), new U8(84)).value).toBe(42);
    });

    test('ch returns z when x is all zeros', () => {
      expect(new U8(0).ch(new U8(42), new U8(84)).value).toBe(84);
    });

    test('ch with complex patterns', () => {
      expect(new U8(0b11001100).ch(new U8(0b11110000), new U8(0b00001111)).value).toBe(0b11000011);
    });
  });

  describe('cnt1', () => {
    test('counts zero ones in zero', () => {
      expect(new U8(0).cnt1()).toBe(0);
    });

    test('counts one in 1', () => {
      expect(new U8(1).cnt1()).toBe(1);
    });

    test('counts ones in powers of two', () => {
      expect(new U8(2).cnt1()).toBe(1);
      expect(new U8(4).cnt1()).toBe(1);
      expect(new U8(8).cnt1()).toBe(1);
    });

    test('counts ones in all bits set', () => {
      expect(new U8(255).cnt1()).toBe(8);
    });

    test('counts ones in various patterns', () => {
      expect(new U8(0b10101010).cnt1()).toBe(4);
      expect(new U8(0b11001100).cnt1()).toBe(4);
      expect(new U8(0b11110000).cnt1()).toBe(4);
    });

    test('counts ones in large values', () => {
      expect(new U8(200).cnt1()).toBe(3);
      expect(new U8(128).cnt1()).toBe(1);
    });
  });

  describe('cnt0', () => {
    test('counts 8 zeros in zero', () => {
      expect(new U8(0).cnt0()).toBe(8);
    });

    test('counts zeros in 1', () => {
      expect(new U8(1).cnt0()).toBe(7);
    });

    test('counts zeros in powers of two', () => {
      expect(new U8(2).cnt0()).toBe(7);
      expect(new U8(4).cnt0()).toBe(7);
    });

    test('counts zero zeros in all bits set', () => {
      expect(new U8(255).cnt0()).toBe(0);
    });

    test('counts zeros in various patterns', () => {
      expect(new U8(0b10101010).cnt0()).toBe(4);
      expect(new U8(0b11001100).cnt0()).toBe(4);
    });

    test('sum of ones and zeros equals 8', () => {
      const val = new U8(42);
      expect(val.cnt1() + val.cnt0()).toBe(8);
    });
  });

  describe('toString', () => {
    test('converts to decimal string by default', () => {
      expect(new U8(42).toString()).toBe('42');
      expect(new U8(255).toString()).toBe('255');
    });

    test('converts to binary string', () => {
      expect(new U8(10).toString(2)).toBe('1010');
      expect(new U8(255).toString(2)).toBe('11111111');
    });

    test('converts to hexadecimal string', () => {
      expect(new U8(42).toString(16)).toBe('2a');
      expect(new U8(255).toString(16)).toBe('ff');
    });

    test('converts to octal string', () => {
      expect(new U8(42).toString(8)).toBe('52');
    });

    test('handles various radix values', () => {
      expect(new U8(100).toString(36)).toBe('2s');
    });
  });

  describe('valueOf', () => {
    test('returns the numeric value', () => {
      expect(new U8(42).valueOf()).toBe(42);
      expect(new U8(255).valueOf()).toBe(255);
    });

    test('allows numeric operations', () => {
      expect(new U8(42).valueOf() + 8).toBe(50);
    });
  });

  describe('Symbol.toPrimitive', () => {
    test('converts to number when hint is number', () => {
      expect(Number(new U8(42))).toBe(42);
    });

    test('converts to string when hint is string', () => {
      expect(toString(new U8(42))).toBe('42');
    });

    test('works with large unsigned values', () => {
      expect(Number(new U8(255))).toBe(255);
    });
  });

  describe('chaining and immutability', () => {
    test('chaining operations', () => {
      const result = new U8(10).add(new U8(5)).mul(new U8(2)).sub(new U8(10));
      expect(result.value).toBe(20);
    });

    test('complex bit manipulation', () => {
      const result = new U8(0b1010).or(new U8(0b0101)).and(new U8(0b1100)).xor(new U8(0b0011));
      expect(result.value).toBe(0b1111);
    });

    test('immutability - operations return new instances', () => {
      const original = new U8(42);
      const modified = original.add(new U8(10));
      expect(original.value).toBe(42);
      expect(modified.value).toBe(52);
    });

    test('working with cryptographic-style operations', () => {
      const x = new U8(0b10101010);
      const y = new U8(0b11001100);
      const z = new U8(0b11110000);
      const result = x.ch(y, z).xor(x.rotr(2));
      expect(result).toBeInstanceOf(U8);
    });

    test('unsigned arithmetic wrapping', () => {
      expect(new U8(255).add(new U8(1)).value).toBe(0);
      expect(new U8(0).sub(new U8(1)).value).toBe(255);
      expect(new U8(16).mul(new U8(16)).value).toBe(0);
    });
  });

  describe('eq', () => {
    test('returns true for equal values', () => {
      expect(new U8(42).eq(42)).toBeTrue();
      expect(new U8(42).eq(new U8(42))).toBeTrue();
      expect(new U8(255).eq(255)).toBeTrue();
    });

    test('returns false for unequal values', () => {
      expect(new U8(42).eq(43)).toBeFalse();
      expect(new U8(42).eq(new U8(43))).toBeFalse();
      expect(new U8(100).eq(200)).toBeFalse();
    });

    test('accepts numeric values', () => {
      expect(new U8(42).eq(42)).toBeTrue();
      expect(new U8(100).eq(100.5)).toBeFalse();
    });
  });

  describe('ne', () => {
    test('returns true for unequal values', () => {
      expect(new U8(42).ne(43)).toBeTrue();
      expect(new U8(42).ne(new U8(43))).toBeTrue();
      expect(new U8(100).ne(200)).toBeTrue();
    });

    test('returns false for equal values', () => {
      expect(new U8(42).ne(42)).toBeFalse();
      expect(new U8(42).ne(new U8(42))).toBeFalse();
      expect(new U8(255).ne(255)).toBeFalse();
    });
  });

  describe('lt', () => {
    test('returns true when less than', () => {
      expect(new U8(10).lt(20)).toBeTrue();
      expect(new U8(10).lt(new U8(20))).toBeTrue();
      expect(new U8(0).lt(255)).toBeTrue();
    });

    test('returns false when equal', () => {
      expect(new U8(42).lt(42)).toBeFalse();
      expect(new U8(42).lt(new U8(42))).toBeFalse();
    });

    test('returns false when greater than', () => {
      expect(new U8(50).lt(40)).toBeFalse();
      expect(new U8(50).lt(new U8(40))).toBeFalse();
      expect(new U8(255).lt(0)).toBeFalse();
    });
  });

  describe('le', () => {
    test('returns true when less than', () => {
      expect(new U8(10).le(20)).toBeTrue();
      expect(new U8(10).le(new U8(20))).toBeTrue();
    });

    test('returns true when equal', () => {
      expect(new U8(42).le(42)).toBeTrue();
      expect(new U8(42).le(new U8(42))).toBeTrue();
      expect(new U8(255).le(255)).toBeTrue();
    });

    test('returns false when greater than', () => {
      expect(new U8(50).le(40)).toBeFalse();
      expect(new U8(50).le(new U8(40))).toBeFalse();
    });
  });

  describe('gt', () => {
    test('returns true when greater than', () => {
      expect(new U8(50).gt(40)).toBeTrue();
      expect(new U8(50).gt(new U8(40))).toBeTrue();
      expect(new U8(255).gt(0)).toBeTrue();
    });

    test('returns false when equal', () => {
      expect(new U8(42).gt(42)).toBeFalse();
      expect(new U8(42).gt(new U8(42))).toBeFalse();
    });

    test('returns false when less than', () => {
      expect(new U8(10).gt(20)).toBeFalse();
      expect(new U8(10).gt(new U8(20))).toBeFalse();
      expect(new U8(0).gt(255)).toBeFalse();
    });
  });

  describe('ge', () => {
    test('returns true when greater than', () => {
      expect(new U8(50).ge(40)).toBeTrue();
      expect(new U8(50).ge(new U8(40))).toBeTrue();
    });

    test('returns true when equal', () => {
      expect(new U8(42).ge(42)).toBeTrue();
      expect(new U8(42).ge(new U8(42))).toBeTrue();
      expect(new U8(255).ge(255)).toBeTrue();
    });

    test('returns false when less than', () => {
      expect(new U8(10).ge(20)).toBeFalse();
      expect(new U8(10).ge(new U8(20))).toBeFalse();
    });
  });
});
