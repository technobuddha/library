import { toString } from '../../string/to-string.ts';

import { I16 } from '../i16.ts';

describe('I16', () => {
  describe('constructor', () => {
    test('creates I16 with zero', () => {
      const i16 = new I16(0);
      expect(i16.value).toBe(0);
    });

    test('creates I16 with positive integer', () => {
      const i16 = new I16(42);
      expect(i16.value).toBe(42);
    });

    test('creates I16 with negative integer', () => {
      const i16 = new I16(-42);
      expect(i16.value).toBe(-42);
    });

    test('truncates decimal values to 16-bit integer', () => {
      expect(new I16(3.7).value).toBe(3);
      expect(new I16(-3.7).value).toBe(-3);
    });

    test('wraps values outside 16-bit range', () => {
      expect(new I16(32768).value).toBe(-32768);
      expect(new I16(-32769).value).toBe(32767);
    });

    test('handles max and min 16-bit values', () => {
      expect(new I16(32767).value).toBe(32767);
      expect(new I16(-32768).value).toBe(-32768);
    });
  });

  describe('len', () => {
    test('returns the bit length of 16', () => {
      expect(new I16(0).len).toBe(16);
      expect(new I16(42).len).toBe(16);
      expect(new I16(-1).len).toBe(16);
    });
  });

  describe('or', () => {
    test('performs bitwise OR on two zeros', () => {
      expect(new I16(0).or(new I16(0)).value).toBe(0);
    });

    test('performs bitwise OR with identity (0)', () => {
      expect(new I16(0b1010).or(new I16(0)).value).toBe(0b1010);
      expect(new I16(0).or(new I16(0b1010)).value).toBe(0b1010);
    });

    test('performs bitwise OR on different patterns', () => {
      expect(new I16(0b1010).or(new I16(0b0101)).value).toBe(0b1111);
      expect(new I16(0b1100).or(new I16(0b0011)).value).toBe(0b1111);
    });

    test('performs bitwise OR on same value', () => {
      expect(new I16(0b1010).or(new I16(0b1010)).value).toBe(0b1010);
    });

    test('performs bitwise OR with all bits set', () => {
      expect(new I16(0b1010).or(new I16(-1)).value).toBe(-1);
    });

    test('performs bitwise OR on negative numbers', () => {
      expect(new I16(-1).or(new I16(-2)).value).toBe(-1);
    });
  });

  describe('and', () => {
    test('performs bitwise AND on two zeros', () => {
      expect(new I16(0).and(new I16(0)).value).toBe(0);
    });

    test('performs bitwise AND with zero', () => {
      expect(new I16(0b1010).and(new I16(0)).value).toBe(0);
      expect(new I16(0).and(new I16(0b1010)).value).toBe(0);
    });

    test('performs bitwise AND on different patterns', () => {
      expect(new I16(0b1010).and(new I16(0b0101)).value).toBe(0);
      expect(new I16(0b1100).and(new I16(0b1010)).value).toBe(0b1000);
    });

    test('performs bitwise AND on same value', () => {
      expect(new I16(0b1010).and(new I16(0b1010)).value).toBe(0b1010);
    });

    test('performs bitwise AND with all bits set', () => {
      expect(new I16(0b1010).and(new I16(-1)).value).toBe(0b1010);
    });

    test('performs bitwise AND on negative numbers', () => {
      expect(new I16(-1).and(new I16(-2)).value).toBe(-2);
    });
  });

  describe('xor', () => {
    test('performs bitwise XOR on two zeros', () => {
      expect(new I16(0).xor(new I16(0)).value).toBe(0);
    });

    test('performs bitwise XOR with zero (identity)', () => {
      expect(new I16(0b1010).xor(new I16(0)).value).toBe(0b1010);
      expect(new I16(0).xor(new I16(0b1010)).value).toBe(0b1010);
    });

    test('performs bitwise XOR on different patterns', () => {
      expect(new I16(0b1010).xor(new I16(0b0101)).value).toBe(0b1111);
      expect(new I16(0b1100).xor(new I16(0b1010)).value).toBe(0b0110);
    });

    test('performs bitwise XOR on same value (returns zero)', () => {
      expect(new I16(0b1010).xor(new I16(0b1010)).value).toBe(0);
      expect(new I16(42).xor(new I16(42)).value).toBe(0);
    });

    test('performs bitwise XOR with all bits set', () => {
      expect(new I16(0b1010).xor(new I16(-1)).value).toBe(new I16(0b1010).not().value);
    });

    test('performs bitwise XOR on negative numbers', () => {
      expect(new I16(-1).xor(new I16(-1)).value).toBe(0);
    });
  });

  describe('not', () => {
    test('performs bitwise NOT on zero', () => {
      expect(new I16(0).not().value).toBe(-1);
    });

    test('performs bitwise NOT on -1', () => {
      expect(new I16(-1).not().value).toBe(0);
    });

    test('performs bitwise NOT on positive numbers', () => {
      expect(new I16(1).not().value).toBe(-2);
      expect(new I16(42).not().value).toBe(-43);
    });

    test('performs bitwise NOT on negative numbers', () => {
      expect(new I16(-2).not().value).toBe(1);
      expect(new I16(-43).not().value).toBe(42);
    });

    test('double NOT returns original value', () => {
      expect(new I16(42).not().not().value).toBe(42);
      expect(new I16(-42).not().not().value).toBe(-42);
    });
  });

  describe('add', () => {
    test('adds two positive numbers', () => {
      expect(new I16(10).add(new I16(5)).value).toBe(15);
      expect(new I16(100).add(new I16(200)).value).toBe(300);
    });

    test('adds positive and negative numbers', () => {
      expect(new I16(10).add(new I16(-5)).value).toBe(5);
      expect(new I16(-10).add(new I16(5)).value).toBe(-5);
    });

    test('adds two negative numbers', () => {
      expect(new I16(-10).add(new I16(-5)).value).toBe(-15);
    });

    test('adds with zero', () => {
      expect(new I16(42).add(new I16(0)).value).toBe(42);
      expect(new I16(0).add(new I16(42)).value).toBe(42);
    });

    test('wraps on overflow', () => {
      expect(new I16(32767).add(new I16(1)).value).toBe(-32768);
      expect(new I16(32767).add(new I16(2)).value).toBe(-32767);
    });

    test('wraps on underflow', () => {
      expect(new I16(-32768).add(new I16(-1)).value).toBe(32767);
    });
  });

  describe('subtract', () => {
    test('subtracts two positive numbers', () => {
      expect(new I16(10).sub(new I16(5)).value).toBe(5);
      expect(new I16(100).sub(new I16(30)).value).toBe(70);
    });

    test('subtracts resulting in negative', () => {
      expect(new I16(5).sub(new I16(10)).value).toBe(-5);
    });

    test('subtracts negative numbers', () => {
      expect(new I16(10).sub(new I16(-5)).value).toBe(15);
      expect(new I16(-10).sub(new I16(-5)).value).toBe(-5);
    });

    test('subtracts with zero', () => {
      expect(new I16(42).sub(new I16(0)).value).toBe(42);
      expect(new I16(0).sub(new I16(42)).value).toBe(-42);
    });

    test('wraps on underflow', () => {
      expect(new I16(-32768).sub(new I16(1)).value).toBe(32767);
    });

    test('wraps on overflow', () => {
      expect(new I16(32767).sub(new I16(-1)).value).toBe(-32768);
    });
  });

  describe('multiply', () => {
    test('multiplies two positive numbers', () => {
      expect(new I16(10).mul(new I16(5)).value).toBe(50);
      expect(new I16(7).mul(new I16(6)).value).toBe(42);
    });

    test('multiplies with negative numbers', () => {
      expect(new I16(-3).mul(new I16(4)).value).toBe(-12);
      expect(new I16(3).mul(new I16(-4)).value).toBe(-12);
      expect(new I16(-3).mul(new I16(-4)).value).toBe(12);
    });

    test('multiplies with zero', () => {
      expect(new I16(42).mul(new I16(0)).value).toBe(0);
      expect(new I16(0).mul(new I16(42)).value).toBe(0);
    });

    test('multiplies with one', () => {
      expect(new I16(42).mul(new I16(1)).value).toBe(42);
      expect(new I16(-42).mul(new I16(1)).value).toBe(-42);
    });

    test('wraps on overflow', () => {
      expect(new I16(1000).mul(new I16(100)).value).toBe(-31072);
      expect(new I16(256).mul(new I16(256)).value).toBe(0);
    });
  });

  describe('divide', () => {
    test('divides two positive numbers', () => {
      expect(new I16(10).div(new I16(3)).value).toBe(3);
      expect(new I16(20).div(new I16(4)).value).toBe(5);
    });

    test('divides with negative numbers', () => {
      expect(new I16(-10).div(new I16(3)).value).toBe(-3);
      expect(new I16(10).div(new I16(-3)).value).toBe(-3);
      expect(new I16(-10).div(new I16(-3)).value).toBe(3);
    });

    test('divides by one', () => {
      expect(new I16(42).div(new I16(1)).value).toBe(42);
      expect(new I16(-42).div(new I16(1)).value).toBe(-42);
    });

    test('divides resulting in zero', () => {
      expect(new I16(2).div(new I16(3)).value).toBe(0);
      expect(new I16(-2).div(new I16(3)).value).toBe(0);
    });

    test('throws on division by zero', () => {
      expect(() => new I16(10).div(new I16(0))).toThrow(RangeError);
      expect(() => new I16(10).div(new I16(0))).toThrow('Division by zero');
    });
  });

  describe('modulo', () => {
    test('computes modulo of positive numbers', () => {
      expect(new I16(10).mod(new I16(3)).value).toBe(1);
      expect(new I16(20).mod(new I16(7)).value).toBe(6);
    });

    test('computes modulo with negative dividend', () => {
      expect(new I16(-10).mod(new I16(3)).value).toBe(-1);
      expect(new I16(-20).mod(new I16(7)).value).toBe(-6);
    });

    test('computes modulo with negative divisor', () => {
      expect(new I16(10).mod(new I16(-3)).value).toBe(1);
      expect(new I16(-10).mod(new I16(-3)).value).toBe(-1);
    });

    test('modulo by one', () => {
      expect(new I16(42).mod(new I16(1)).value).toBe(0);
      expect(new I16(-42).mod(new I16(1)).value).toBe(0);
    });

    test('modulo when dividend is smaller than divisor', () => {
      expect(new I16(2).mod(new I16(3)).value).toBe(2);
      expect(new I16(-2).mod(new I16(3)).value).toBe(-2);
    });

    test('throws on modulo by zero', () => {
      expect(() => new I16(10).mod(new I16(0))).toThrow(RangeError);
      expect(() => new I16(10).mod(new I16(0))).toThrow('Division by zero');
    });
  });

  describe('shl', () => {
    test('shifts left by 0 (no change)', () => {
      expect(new I16(0b1010).shl(0).value).toBe(0b1010);
    });

    test('shifts left by 1', () => {
      expect(new I16(0b1010).shl(1).value).toBe(0b10100);
      expect(new I16(1).shl(1).value).toBe(2);
    });

    test('shifts left by multiple positions', () => {
      expect(new I16(1).shl(8).value).toBe(256);
      expect(new I16(0b1010).shl(4).value).toBe(0b10100000);
    });

    test('shifts left clamps to 16 bits', () => {
      expect(new I16(1).shl(15).value).toBe(-32768);
      expect(new I16(1).shl(16).value).toBe(0);
    });

    test('shifts left with negative shift amount (clamped to 0)', () => {
      expect(new I16(0b1010).shl(-5).value).toBe(0b1010);
    });

    test('shifts left beyond 16 bits (clamped)', () => {
      expect(new I16(1).shl(100).value).toBe(0);
    });
  });

  describe('shr', () => {
    test('shifts right by 0 (no change)', () => {
      expect(new I16(0b1010).shr(0).value).toBe(0b1010);
    });

    test('shifts right by 1', () => {
      expect(new I16(0b1010).shr(1).value).toBe(0b101);
      expect(new I16(8).shr(1).value).toBe(4);
    });

    test('shifts right by multiple positions', () => {
      expect(new I16(256).shr(8).value).toBe(1);
      expect(new I16(0b10100000).shr(4).value).toBe(0b1010);
    });

    test('shifts right preserves sign (arithmetic shift)', () => {
      expect(new I16(-8).shr(1).value).toBe(-4);
      expect(new I16(-16).shr(2).value).toBe(-4);
    });

    test('shifts right with negative shift amount (clamped to 0)', () => {
      expect(new I16(0b1010).shr(-5).value).toBe(0b1010);
    });

    test('shifts right beyond 16 bits (clamped)', () => {
      expect(new I16(42).shr(100).value).toBe(0);
      expect(new I16(-42).shr(100).value).toBe(-1);
    });
  });

  describe('rotl', () => {
    test('rotates left by 0 (no change)', () => {
      expect(new I16(0b1010).rotl(0).value).toBe(0b1010);
    });

    test('rotates left by 1', () => {
      expect(new I16(0b1010).rotl(1).value).toBe(0b10100);
    });

    test('rotates left wraps bits around', () => {
      expect(new I16(0x8001).rotl(1).value).toBe(0x0003);
    });

    test('rotates left by 4', () => {
      expect(new I16(0x1234).rotl(4).value).toBe(0x2341);
    });

    test('rotates left by 16 (full rotation, modulo gives 0)', () => {
      const value = 0x1234;
      expect(new I16(value).rotl(16).value).toBe(value);
    });

    test('rotates left by negative amount (rotates right)', () => {
      const value = 0x1234;
      expect(new I16(value).rotl(-4).value).toBe(new I16(value).rotr(4).value);
    });

    test('rotates left with modulo behavior', () => {
      const value = 0x1234;
      expect(new I16(value).rotl(20).value).toBe(new I16(value).rotl(4).value);
    });
  });

  describe('rotr', () => {
    test('rotates right by 0 (no change)', () => {
      expect(new I16(0b1010).rotr(0).value).toBe(0b1010);
    });

    test('rotates right by 1', () => {
      expect(new I16(0b10100).rotr(1).value).toBe(0b1010);
    });

    test('rotates right wraps bits around', () => {
      expect(new I16(0x0003).rotr(1).value).toBe(-32767);
    });

    test('rotates right by 4', () => {
      expect(new I16(0x1234).rotr(4).value).toBe(0x4123);
    });

    test('rotates right by 16 (full rotation, modulo gives 0)', () => {
      const value = 0x1234;
      expect(new I16(value).rotr(16).value).toBe(value);
    });

    test('rotates right by negative amount (rotates left)', () => {
      const value = 0x1234;
      expect(new I16(value).rotr(-4).value).toBe(new I16(value).rotl(4).value);
    });

    test('rotates right with modulo behavior', () => {
      const value = 0x1234;
      expect(new I16(value).rotr(20).value).toBe(new I16(value).rotr(4).value);
    });
  });

  describe('maj', () => {
    test('returns maj bit for each position', () => {
      const x = new I16(0b1110);
      const y = new I16(0b1010);
      const z = new I16(0b1100);
      expect(x.maj(y, z).value).toBe(0b1110);
    });

    test('maj with all zeros', () => {
      expect(new I16(0).maj(new I16(0), new I16(0)).value).toBe(0);
    });

    test('maj with all ones', () => {
      expect(new I16(-1).maj(new I16(-1), new I16(-1)).value).toBe(-1);
    });

    test('maj with two ones and one zero', () => {
      expect(new I16(-1).maj(new I16(-1), new I16(0)).value).toBe(-1);
      expect(new I16(-1).maj(new I16(0), new I16(-1)).value).toBe(-1);
      expect(new I16(0).maj(new I16(-1), new I16(-1)).value).toBe(-1);
    });

    test('maj with two zeros and one one', () => {
      expect(new I16(0).maj(new I16(0), new I16(-1)).value).toBe(0);
      expect(new I16(0).maj(new I16(-1), new I16(0)).value).toBe(0);
      expect(new I16(-1).maj(new I16(0), new I16(0)).value).toBe(0);
    });
  });

  describe('ch', () => {
    test('chs y where x is 1, z where x is 0', () => {
      const x = new I16(0b1100);
      const y = new I16(0b1010);
      const z = new I16(0b0101);
      expect(x.ch(y, z).value).toBe(0b1001);
    });

    test('ch with all zeros', () => {
      expect(new I16(0).ch(new I16(0), new I16(0)).value).toBe(0);
    });

    test('ch returns y when x is all ones', () => {
      const y = new I16(0b1010);
      expect(new I16(-1).ch(y, new I16(0)).value).toBe(y.value);
    });

    test('ch returns z when x is all zeros', () => {
      const z = new I16(0b1010);
      expect(new I16(0).ch(new I16(0), z).value).toBe(z.value);
    });

    test('ch with complex patterns', () => {
      const x = new I16(0xf0f0);
      const y = new I16(0xaaaa);
      const z = new I16(0x5555);
      expect(x.ch(y, z).value).toBe(-23131);
    });
  });

  describe('cnt1', () => {
    test('counts zero ones in zero', () => {
      expect(new I16(0).cnt1()).toBe(0);
    });

    test('counts one in 1', () => {
      expect(new I16(1).cnt1()).toBe(1);
    });

    test('counts ones in powers of two', () => {
      expect(new I16(2).cnt1()).toBe(1);
      expect(new I16(4).cnt1()).toBe(1);
      expect(new I16(8).cnt1()).toBe(1);
      expect(new I16(16).cnt1()).toBe(1);
      expect(new I16(128).cnt1()).toBe(1);
      expect(new I16(1024).cnt1()).toBe(1);
    });

    test('counts ones in all bits set', () => {
      expect(new I16(-1).cnt1()).toBe(16);
    });

    test('counts ones in various patterns', () => {
      expect(new I16(0b1111).cnt1()).toBe(4);
      expect(new I16(0b10101010).cnt1()).toBe(4);
      expect(new I16(0b11111111).cnt1()).toBe(8);
    });

    test('counts ones in max 16-bit signed integer', () => {
      expect(new I16(32767).cnt1()).toBe(15);
    });

    test('counts ones in min 16-bit signed integer', () => {
      expect(new I16(-32768).cnt1()).toBe(1);
    });

    test('counts ones in negative numbers', () => {
      expect(new I16(-2).cnt1()).toBe(15);
      expect(new I16(-3).cnt1()).toBe(15);
      expect(new I16(-128).cnt1()).toBe(9);
    });

    test('counts ones in mixed bit patterns', () => {
      expect(new I16(0x0f0f).cnt1()).toBe(8);
      expect(new I16(0x5555).cnt1()).toBe(8);
      expect(new I16(0xff00).cnt1()).toBe(8);
      expect(new I16(0x00ff).cnt1()).toBe(8);
    });
  });

  describe('cnt0', () => {
    test('counts 16 zeros in zero', () => {
      expect(new I16(0).cnt0()).toBe(16);
    });

    test('counts zeros in 1', () => {
      expect(new I16(1).cnt0()).toBe(15);
    });

    test('counts zeros in powers of two', () => {
      expect(new I16(2).cnt0()).toBe(15);
      expect(new I16(4).cnt0()).toBe(15);
      expect(new I16(8).cnt0()).toBe(15);
      expect(new I16(16).cnt0()).toBe(15);
      expect(new I16(128).cnt0()).toBe(15);
      expect(new I16(1024).cnt0()).toBe(15);
    });

    test('counts zero zeros in all bits set', () => {
      expect(new I16(-1).cnt0()).toBe(0);
    });

    test('counts zeros in various patterns', () => {
      expect(new I16(0b1111).cnt0()).toBe(12);
      expect(new I16(0b10101010).cnt0()).toBe(12);
      expect(new I16(0b11111111).cnt0()).toBe(8);
    });

    test('counts zeros in max 16-bit signed integer', () => {
      expect(new I16(32767).cnt0()).toBe(1);
    });

    test('counts zeros in min 16-bit signed integer', () => {
      expect(new I16(-32768).cnt0()).toBe(15);
    });

    test('counts zeros in negative numbers', () => {
      expect(new I16(-2).cnt0()).toBe(1);
      expect(new I16(-3).cnt0()).toBe(1);
      expect(new I16(-128).cnt0()).toBe(7);
    });

    test('counts zeros in mixed bit patterns', () => {
      expect(new I16(0x0f0f).cnt0()).toBe(8);
      expect(new I16(0x5555).cnt0()).toBe(8);
      expect(new I16(0xff00).cnt0()).toBe(8);
      expect(new I16(0x00ff).cnt0()).toBe(8);
    });
  });

  describe('cnt1 and cnt0 complement', () => {
    test('sum of ones and zeros equals 16', () => {
      const testValues = [0, 1, -1, 42, -42, 255, -255, 32767, -32768, 0x1234, 0xabcd];

      for (const value of testValues) {
        const i16 = new I16(value);
        expect(i16.cnt1() + i16.cnt0()).toBe(16);
      }
    });
  });

  describe('toString', () => {
    test('converts to decimal string by default', () => {
      expect(new I16(42).toString()).toBe('42');
      expect(new I16(-42).toString()).toBe('-42');
      expect(new I16(0).toString()).toBe('0');
    });

    test('converts to binary string', () => {
      expect(new I16(10).toString(2)).toBe('1010');
      expect(new I16(255).toString(2)).toBe('11111111');
    });

    test('converts to hexadecimal string', () => {
      expect(new I16(255).toString(16)).toBe('ff');
      expect(new I16(0x1234).toString(16)).toBe('1234');
    });

    test('converts to octal string', () => {
      expect(new I16(64).toString(8)).toBe('100');
      expect(new I16(511).toString(8)).toBe('777');
    });

    test('converts negative numbers to string', () => {
      expect(new I16(-1).toString(16)).toBe('-1');
      expect(new I16(-255).toString(16)).toBe('-ff');
    });

    test('handles various radix values', () => {
      expect(new I16(100).toString(36)).toBe('2s');
      expect(new I16(100).toString(10)).toBe('100');
    });
  });

  describe('valueOf', () => {
    test('returns the numeric value', () => {
      expect(new I16(42).valueOf()).toBe(42);
      expect(new I16(-42).valueOf()).toBe(-42);
      expect(new I16(0).valueOf()).toBe(0);
    });

    test('returns 16-bit wrapped values', () => {
      expect(new I16(32767).valueOf()).toBe(32767);
      expect(new I16(-32768).valueOf()).toBe(-32768);
    });

    test('allows numeric operations', () => {
      expect(new I16(10).valueOf() + 5).toBe(15);
      expect(new I16(10).valueOf() * 2).toBe(20);
    });
  });

  describe('Symbol.toPrimitive', () => {
    test('converts to number when hint is number', () => {
      const i16 = new I16(42);
      expect(Number(i16)).toBe(42);
      expect(i16.valueOf()).toBe(42);
    });

    test('converts to string when hint is string', () => {
      const i16 = new I16(42);
      expect(toString(i16)).toBe('42');
      expect(i16.toString()).toBe('42');
    });

    test('works with negative numbers', () => {
      const i16 = new I16(-42);
      expect(Number(i16)).toBe(-42);
      expect(toString(i16)).toBe('-42');
    });
  });

  describe('integration tests', () => {
    test('chaining operations', () => {
      const result = new I16(0b1100).or(new I16(0b0011)).and(new I16(0b1010)).xor(new I16(0b0101));
      expect(result.value).toBe(0b1111);
    });

    test('complex bit manipulation', () => {
      const value = new I16(0xaaaa);
      const rotated = value.rotl(4);
      const shifted = rotated.shr(2);
      expect(shifted.cnt1()).toBe(9);
    });

    test('immutability - operations return new instances', () => {
      const original = new I16(42);
      const modified = original.or(new I16(8));
      expect(original.value).toBe(42);
      expect(modified.value).toBe(42);
    });

    test('working with cryptographic-style operations', () => {
      const x = new I16(0x1234);
      const y = new I16(0x5678);
      const z = new I16(0xabcd);

      const maj = x.maj(y, z);
      const ch = x.ch(y, z);

      expect(maj.value).not.toBe(0);
      expect(ch.value).not.toBe(0);
    });
  });
});
