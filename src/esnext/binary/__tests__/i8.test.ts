import { toString } from '../../string/to-string.ts';

import { I8 } from '../i8.ts';

describe('I8', () => {
  describe('constructor', () => {
    test('creates I8 with zero', () => {
      expect(new I8(0).value).toBe(0);
    });

    test('creates I8 with positive integer', () => {
      expect(new I8(42).value).toBe(42);
    });

    test('creates I8 with negative integer', () => {
      expect(new I8(-42).value).toBe(-42);
    });

    test('truncates decimal values to 8-bit integer', () => {
      expect(new I8(42.7).value).toBe(42);
      expect(new I8(-42.7).value).toBe(-42);
    });

    test('wraps values outside 8-bit signed range', () => {
      expect(new I8(200).value).toBe(-56);
      expect(new I8(256).value).toBe(0);
      expect(new I8(300).value).toBe(44);
    });

    test('handles max 8-bit signed values', () => {
      expect(new I8(127).value).toBe(127);
      expect(new I8(-128).value).toBe(-128);
      expect(new I8(128).value).toBe(-128);
      expect(new I8(-129).value).toBe(127);
    });
  });

  describe('len', () => {
    test('returns the bit length of 8', () => {
      expect(new I8(0).len).toBe(8);
      expect(new I8(42).len).toBe(8);
      expect(new I8(-1).len).toBe(8);
    });
  });

  describe('or', () => {
    test('performs bitwise OR on two zeros', () => {
      expect(new I8(0).or(new I8(0)).value).toBe(0);
    });

    test('performs bitwise OR with identity (0)', () => {
      expect(new I8(42).or(new I8(0)).value).toBe(42);
    });

    test('performs bitwise OR on different patterns', () => {
      expect(new I8(0b1010).or(new I8(0b0101)).value).toBe(0b1111);
    });

    test('performs bitwise OR on same value', () => {
      expect(new I8(42).or(new I8(42)).value).toBe(42);
    });

    test('performs bitwise OR with all bits set', () => {
      expect(new I8(-1).or(new I8(42)).value).toBe(-1);
    });

    test('performs bitwise OR on negative numbers', () => {
      expect(new I8(-10).or(new I8(5)).value).toBe(-9);
    });
  });

  describe('and', () => {
    test('performs bitwise AND on two zeros', () => {
      expect(new I8(0).and(new I8(0)).value).toBe(0);
    });

    test('performs bitwise AND with zero', () => {
      expect(new I8(42).and(new I8(0)).value).toBe(0);
    });

    test('performs bitwise AND on different patterns', () => {
      expect(new I8(0b1010).and(new I8(0b0110)).value).toBe(0b0010);
    });

    test('performs bitwise AND on same value', () => {
      expect(new I8(42).and(new I8(42)).value).toBe(42);
    });

    test('performs bitwise AND with all bits set', () => {
      expect(new I8(42).and(new I8(-1)).value).toBe(42);
    });

    test('performs bitwise AND on negative numbers', () => {
      expect(new I8(-10).and(new I8(5)).value).toBe(4);
    });
  });

  describe('xor', () => {
    test('performs bitwise XOR on two zeros', () => {
      expect(new I8(0).xor(new I8(0)).value).toBe(0);
    });

    test('performs bitwise XOR with zero (identity)', () => {
      expect(new I8(42).xor(new I8(0)).value).toBe(42);
    });

    test('performs bitwise XOR on different patterns', () => {
      expect(new I8(0b1010).xor(new I8(0b0110)).value).toBe(0b1100);
    });

    test('performs bitwise XOR on same value (returns zero)', () => {
      expect(new I8(42).xor(new I8(42)).value).toBe(0);
    });

    test('performs bitwise XOR with all bits set', () => {
      expect(new I8(42).xor(new I8(-1)).value).toBe(-43);
    });

    test('performs bitwise XOR on negative numbers', () => {
      expect(new I8(-10).xor(new I8(5)).value).toBe(-13);
    });
  });

  describe('not', () => {
    test('performs bitwise NOT on zero', () => {
      expect(new I8(0).not().value).toBe(-1);
    });

    test('performs bitwise NOT on all bits set', () => {
      expect(new I8(-1).not().value).toBe(0);
    });

    test('performs bitwise NOT on positive numbers', () => {
      expect(new I8(1).not().value).toBe(-2);
      expect(new I8(42).not().value).toBe(-43);
    });

    test('performs bitwise NOT on negative numbers', () => {
      expect(new I8(-10).not().value).toBe(9);
    });

    test('double NOT returns original value', () => {
      expect(new I8(42).not().not().value).toBe(42);
    });
  });

  describe('add', () => {
    test('adds two positive numbers', () => {
      expect(new I8(10).add(new I8(20)).value).toBe(30);
    });

    test('adds with zero', () => {
      expect(new I8(42).add(new I8(0)).value).toBe(42);
    });

    test('adds two negative numbers', () => {
      expect(new I8(-10).add(new I8(-20)).value).toBe(-30);
    });

    test('adds positive and negative', () => {
      expect(new I8(30).add(new I8(-10)).value).toBe(20);
    });

    test('wraps on overflow', () => {
      expect(new I8(100).add(new I8(50)).value).toBe(-106);
      expect(new I8(127).add(new I8(1)).value).toBe(-128);
    });

    test('wraps on underflow', () => {
      expect(new I8(-100).add(new I8(-50)).value).toBe(106);
      expect(new I8(-128).add(new I8(-1)).value).toBe(127);
    });
  });

  describe('subtract', () => {
    test('subtracts two numbers', () => {
      expect(new I8(30).sub(new I8(10)).value).toBe(20);
    });

    test('subtracts with zero', () => {
      expect(new I8(42).sub(new I8(0)).value).toBe(42);
    });

    test('subtracts negative numbers', () => {
      expect(new I8(-10).sub(new I8(-5)).value).toBe(-5);
    });

    test('subtracts larger from smaller', () => {
      expect(new I8(10).sub(new I8(20)).value).toBe(-10);
    });

    test('wraps on overflow', () => {
      expect(new I8(-100).sub(new I8(50)).value).toBe(106);
    });

    test('wraps on underflow', () => {
      expect(new I8(100).sub(new I8(-50)).value).toBe(-106);
    });
  });

  describe('multiply', () => {
    test('multiplies two numbers', () => {
      expect(new I8(5).mul(new I8(3)).value).toBe(15);
    });

    test('multiplies with zero', () => {
      expect(new I8(42).mul(new I8(0)).value).toBe(0);
    });

    test('multiplies with one', () => {
      expect(new I8(42).mul(new I8(1)).value).toBe(42);
    });

    test('multiplies negative numbers', () => {
      expect(new I8(-5).mul(new I8(3)).value).toBe(-15);
      expect(new I8(-5).mul(new I8(-3)).value).toBe(15);
    });

    test('wraps on overflow', () => {
      expect(new I8(10).mul(new I8(20)).value).toBe(-56);
      expect(new I8(16).mul(new I8(16)).value).toBe(0);
    });
  });

  describe('divide', () => {
    test('divides two numbers', () => {
      expect(new I8(20).div(new I8(3)).value).toBe(6);
    });

    test('divides by one', () => {
      expect(new I8(42).div(new I8(1)).value).toBe(42);
    });

    test('divides resulting in zero', () => {
      expect(new I8(2).div(new I8(3)).value).toBe(0);
    });

    test('divides negative numbers', () => {
      expect(new I8(-20).div(new I8(3)).value).toBe(-6);
      expect(new I8(20).div(new I8(-3)).value).toBe(-6);
      expect(new I8(-20).div(new I8(-3)).value).toBe(6);
    });

    test('throws on division by zero', () => {
      expect(() => new I8(42).div(new I8(0))).toThrow(RangeError);
      expect(() => new I8(42).div(new I8(0))).toThrow('Division by zero');
    });
  });

  describe('modulo', () => {
    test('computes modulo', () => {
      expect(new I8(10).mod(new I8(3)).value).toBe(1);
    });

    test('modulo by one', () => {
      expect(new I8(42).mod(new I8(1)).value).toBe(0);
    });

    test('modulo when dividend is smaller than divisor', () => {
      expect(new I8(2).mod(new I8(3)).value).toBe(2);
    });

    test('modulo with negative numbers', () => {
      expect(new I8(-10).mod(new I8(3)).value).toBe(-1);
      expect(new I8(10).mod(new I8(-3)).value).toBe(1);
    });

    test('modulo with same values', () => {
      expect(new I8(42).mod(new I8(42)).value).toBe(0);
    });

    test('throws on modulo by zero', () => {
      expect(() => new I8(42).mod(new I8(0))).toThrow(RangeError);
      expect(() => new I8(42).mod(new I8(0))).toThrow('Division by zero');
    });
  });

  describe('shl', () => {
    test('shifts left by 0 (no change)', () => {
      expect(new I8(42).shl(0).value).toBe(42);
    });

    test('shifts left by 1', () => {
      expect(new I8(1).shl(1).value).toBe(2);
      expect(new I8(21).shl(1).value).toBe(42);
    });

    test('shifts left by multiple positions', () => {
      expect(new I8(1).shl(3).value).toBe(8);
      expect(new I8(5).shl(2).value).toBe(20);
    });

    test('shifts left wraps at 8 bits', () => {
      expect(new I8(64).shl(2).value).toBe(0);
      expect(new I8(127).shl(1).value).toBe(-2);
    });

    test('shifts left with negative shift amount (clamped to 0)', () => {
      expect(new I8(42).shl(-1).value).toBe(42);
    });

    test('shifts left beyond 8 bits (clamped)', () => {
      expect(new I8(42).shl(100).value).toBe(0);
    });
  });

  describe('shr', () => {
    test('shifts right by 0 (no change)', () => {
      expect(new I8(42).shr(0).value).toBe(42);
    });

    test('shifts right by 1', () => {
      expect(new I8(2).shr(1).value).toBe(1);
      expect(new I8(42).shr(1).value).toBe(21);
    });

    test('shifts right by multiple positions', () => {
      expect(new I8(8).shr(3).value).toBe(1);
      expect(new I8(20).shr(2).value).toBe(5);
    });

    test('shifts right is arithmetic (sign-extending)', () => {
      expect(new I8(-8).shr(1).value).toBe(-4);
      expect(new I8(-1).shr(1).value).toBe(-1);
    });

    test('shifts right with negative shift amount (clamped to 0)', () => {
      expect(new I8(42).shr(-1).value).toBe(42);
    });

    test('shifts right beyond 8 bits (clamped)', () => {
      expect(new I8(42).shr(100).value).toBe(0);
      expect(new I8(-42).shr(100).value).toBe(-1);
    });
  });

  describe('rotl', () => {
    test('rotates left by 0 (no change)', () => {
      expect(new I8(0b10101010).rotl(0).value).toBe(-86);
    });

    test('rotates left by 1', () => {
      expect(new I8(0b10000000).rotl(1).value).toBe(1);
    });

    test('rotates left wraps bits around', () => {
      expect(new I8(0b11000000).rotl(1).value).toBe(-127);
    });

    test('rotates left by 4', () => {
      expect(new I8(0b00001111).rotl(4).value).toBe(-16);
    });

    test('rotates left by 8 (full rotation, modulo gives 0)', () => {
      expect(new I8(0b10101010).rotl(8).value).toBe(-86);
    });

    test('rotates left by negative amount (rotates right)', () => {
      expect(new I8(0b10000001).rotl(-1).value).toBe(-64);
    });

    test('rotates left with modulo behavior', () => {
      expect(new I8(0b10101010).rotl(9).value).toBe(new I8(0b10101010).rotl(1).value);
    });
  });

  describe('rotr', () => {
    test('rotates right by 0 (no change)', () => {
      expect(new I8(0b10101010).rotr(0).value).toBe(-86);
    });

    test('rotates right by 1', () => {
      expect(new I8(1).rotr(1).value).toBe(-128);
    });

    test('rotates right wraps bits around', () => {
      expect(new I8(0b10000001).rotr(1).value).toBe(-64);
    });

    test('rotates right by 4', () => {
      expect(new I8(0b11110000).rotr(4).value).toBe(0b00001111);
    });

    test('rotates right by 8 (full rotation, modulo gives 0)', () => {
      expect(new I8(0b10101010).rotr(8).value).toBe(-86);
    });

    test('rotates right by negative amount (rotates left)', () => {
      expect(new I8(0b11000000).rotr(-1).value).toBe(-127);
    });

    test('rotates right with modulo behavior', () => {
      expect(new I8(0b10101010).rotr(9).value).toBe(new I8(0b10101010).rotr(1).value);
    });
  });

  describe('maj', () => {
    test('returns maj bit for each position', () => {
      expect(new I8(0b1010).maj(new I8(0b1100), new I8(0b1001)).value).toBe(0b1000);
    });

    test('maj with all zeros', () => {
      expect(new I8(0).maj(new I8(0), new I8(0)).value).toBe(0);
    });

    test('maj with all ones', () => {
      expect(new I8(-1).maj(new I8(-1), new I8(-1)).value).toBe(-1);
    });

    test('maj with two ones and one zero', () => {
      expect(new I8(-1).maj(new I8(-1), new I8(0)).value).toBe(-1);
    });

    test('maj with two zeros and one one', () => {
      expect(new I8(0).maj(new I8(0), new I8(-1)).value).toBe(0);
    });
  });

  describe('ch', () => {
    test('chs y where x is 1, z where x is 0', () => {
      expect(new I8(0b1010).ch(new I8(0b1111), new I8(0b0000)).value).toBe(0b1010);
    });

    test('ch with all zeros', () => {
      expect(new I8(0).ch(new I8(-1), new I8(0)).value).toBe(0);
    });

    test('ch returns y when x is all ones', () => {
      expect(new I8(-1).ch(new I8(42), new I8(84)).value).toBe(42);
    });

    test('ch returns z when x is all zeros', () => {
      expect(new I8(0).ch(new I8(42), new I8(84)).value).toBe(84);
    });

    test('ch with complex patterns', () => {
      expect(new I8(0b11001100).ch(new I8(0b11110000), new I8(0b00001111)).value).toBe(-61);
    });
  });

  describe('cnt1', () => {
    test('counts zero ones in zero', () => {
      expect(new I8(0).cnt1()).toBe(0);
    });

    test('counts one in 1', () => {
      expect(new I8(1).cnt1()).toBe(1);
    });

    test('counts ones in powers of two', () => {
      expect(new I8(2).cnt1()).toBe(1);
      expect(new I8(4).cnt1()).toBe(1);
      expect(new I8(8).cnt1()).toBe(1);
    });

    test('counts ones in all bits set', () => {
      expect(new I8(-1).cnt1()).toBe(8);
    });

    test('counts ones in various patterns', () => {
      expect(new I8(0b10101010).cnt1()).toBe(4);
      expect(new I8(0b11001100).cnt1()).toBe(4);
      expect(new I8(0b11110000).cnt1()).toBe(4);
    });

    test('counts ones in negative numbers', () => {
      expect(new I8(-128).cnt1()).toBe(1);
      expect(new I8(-2).cnt1()).toBe(7);
    });
  });

  describe('cnt0', () => {
    test('counts 8 zeros in zero', () => {
      expect(new I8(0).cnt0()).toBe(8);
    });

    test('counts zeros in 1', () => {
      expect(new I8(1).cnt0()).toBe(7);
    });

    test('counts zeros in powers of two', () => {
      expect(new I8(2).cnt0()).toBe(7);
      expect(new I8(4).cnt0()).toBe(7);
    });

    test('counts zero zeros in all bits set', () => {
      expect(new I8(-1).cnt0()).toBe(0);
    });

    test('counts zeros in various patterns', () => {
      expect(new I8(0b10101010).cnt0()).toBe(4);
      expect(new I8(0b11001100).cnt0()).toBe(4);
    });

    test('sum of ones and zeros equals 8', () => {
      const val = new I8(42);
      expect(val.cnt1() + val.cnt0()).toBe(8);
    });
  });

  describe('toString', () => {
    test('converts to decimal string by default', () => {
      expect(new I8(42).toString()).toBe('42');
      expect(new I8(-42).toString()).toBe('-42');
    });

    test('converts to binary string', () => {
      expect(new I8(10).toString(2)).toBe('1010');
      expect(new I8(-1).toString(2)).toBe('-1');
    });

    test('converts to hexadecimal string', () => {
      expect(new I8(42).toString(16)).toBe('2a');
      expect(new I8(-1).toString(16)).toBe('-1');
    });

    test('converts to octal string', () => {
      expect(new I8(42).toString(8)).toBe('52');
    });

    test('handles various radix values', () => {
      expect(new I8(100).toString(36)).toBe('2s');
    });
  });

  describe('valueOf', () => {
    test('returns the numeric value', () => {
      expect(new I8(42).valueOf()).toBe(42);
      expect(new I8(-42).valueOf()).toBe(-42);
    });

    test('allows numeric operations', () => {
      expect(new I8(42).valueOf() + 8).toBe(50);
    });
  });

  describe('Symbol.toPrimitive', () => {
    test('converts to number when hint is number', () => {
      expect(Number(new I8(42))).toBe(42);
    });

    test('converts to string when hint is string', () => {
      expect(toString(new I8(42))).toBe('42');
    });

    test('works with large numbers', () => {
      expect(Number(new I8(127))).toBe(127);
      expect(Number(new I8(-128))).toBe(-128);
    });
  });

  describe('chaining and immutability', () => {
    test('chaining operations', () => {
      const result = new I8(10).add(new I8(5)).mul(new I8(2)).sub(new I8(10));
      expect(result.value).toBe(20);
    });

    test('complex bit manipulation', () => {
      const result = new I8(0b1010).or(new I8(0b0101)).and(new I8(0b1100)).xor(new I8(0b0011));
      expect(result.value).toBe(0b1111);
    });

    test('immutability - operations return new instances', () => {
      const original = new I8(42);
      const modified = original.add(new I8(10));
      expect(original.value).toBe(42);
      expect(modified.value).toBe(52);
    });

    test('working with cryptographic-style operations', () => {
      const x = new I8(0b10101010);
      const y = new I8(0b11001100);
      const z = new I8(0b11110000);
      const result = x.ch(y, z).xor(x.rotr(2));
      expect(result).toBeInstanceOf(I8);
    });

    test('signed arithmetic wrapping', () => {
      expect(new I8(127).add(new I8(1)).value).toBe(-128);
      expect(new I8(-128).sub(new I8(1)).value).toBe(127);
      expect(new I8(16).mul(new I8(16)).value).toBe(0);
    });
  });
});
