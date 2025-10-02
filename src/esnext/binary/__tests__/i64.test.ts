import { toString } from '../../string/to-string.ts';

import { I64 } from '../i64.ts';

describe('I64', () => {
  describe('constructor', () => {
    test('creates I64 with zero', () => {
      expect(new I64(0n).value).toBe(0n);
    });

    test('creates I64 with positive integer', () => {
      expect(new I64(42n).value).toBe(42n);
    });

    test('creates I64 with negative integer', () => {
      expect(new I64(-42n).value).toBe(-42n);
    });

    test('creates I64 from number', () => {
      expect(new I64(42).value).toBe(42n);
      expect(new I64(-42).value).toBe(-42n);
    });

    test('truncates decimal values', () => {
      expect(new I64(42.7).value).toBe(42n);
      expect(new I64(-42.7).value).toBe(-42n);
    });

    test('wraps values outside 64-bit signed range', () => {
      const maxPlus1 = 9223372036854775808n; // 2^63
      expect(new I64(maxPlus1).value).toBe(-9223372036854775808n);
    });

    test('handles max 64-bit signed values', () => {
      expect(new I64(9223372036854775807n).value).toBe(9223372036854775807n);
      expect(new I64(-9223372036854775808n).value).toBe(-9223372036854775808n);
    });
  });

  describe('len', () => {
    test('returns the bit length of 64', () => {
      expect(new I64(0n).len).toBe(64);
      expect(new I64(42n).len).toBe(64);
      expect(new I64(-1n).len).toBe(64);
    });
  });

  describe('or', () => {
    test('performs bitwise OR on two zeros', () => {
      expect(new I64(0n).or(new I64(0n)).value).toBe(0n);
    });

    test('performs bitwise OR with identity (0)', () => {
      expect(new I64(42n).or(new I64(0n)).value).toBe(42n);
    });

    test('performs bitwise OR on different patterns', () => {
      expect(new I64(0b1010n).or(new I64(0b0101n)).value).toBe(0b1111n);
    });

    test('performs bitwise OR on same value', () => {
      expect(new I64(42n).or(new I64(42n)).value).toBe(42n);
    });

    test('performs bitwise OR with all bits set', () => {
      expect(new I64(-1n).or(new I64(42n)).value).toBe(-1n);
    });

    test('performs bitwise OR on negative numbers', () => {
      expect(new I64(-10n).or(new I64(5n)).value).toBe(-9n);
    });
  });

  describe('and', () => {
    test('performs bitwise AND on two zeros', () => {
      expect(new I64(0n).and(new I64(0n)).value).toBe(0n);
    });

    test('performs bitwise AND with zero', () => {
      expect(new I64(42n).and(new I64(0n)).value).toBe(0n);
    });

    test('performs bitwise AND on different patterns', () => {
      expect(new I64(0b1010n).and(new I64(0b0110n)).value).toBe(0b0010n);
    });

    test('performs bitwise AND on same value', () => {
      expect(new I64(42n).and(new I64(42n)).value).toBe(42n);
    });

    test('performs bitwise AND with all bits set', () => {
      expect(new I64(42n).and(new I64(-1n)).value).toBe(42n);
    });

    test('performs bitwise AND on negative numbers', () => {
      expect(new I64(-10n).and(new I64(5n)).value).toBe(4n);
    });
  });

  describe('xor', () => {
    test('performs bitwise XOR on two zeros', () => {
      expect(new I64(0n).xor(new I64(0n)).value).toBe(0n);
    });

    test('performs bitwise XOR with zero (identity)', () => {
      expect(new I64(42n).xor(new I64(0n)).value).toBe(42n);
    });

    test('performs bitwise XOR on different patterns', () => {
      expect(new I64(0b1010n).xor(new I64(0b0110n)).value).toBe(0b1100n);
    });

    test('performs bitwise XOR on same value (returns zero)', () => {
      expect(new I64(42n).xor(new I64(42n)).value).toBe(0n);
    });

    test('performs bitwise XOR with all bits set', () => {
      expect(new I64(42n).xor(new I64(-1n)).value).toBe(-43n);
    });

    test('performs bitwise XOR on negative numbers', () => {
      expect(new I64(-10n).xor(new I64(5n)).value).toBe(-13n);
    });
  });

  describe('not', () => {
    test('performs bitwise NOT on zero', () => {
      expect(new I64(0n).not().value).toBe(-1n);
    });

    test('performs bitwise NOT on all bits set', () => {
      expect(new I64(-1n).not().value).toBe(0n);
    });

    test('performs bitwise NOT on positive numbers', () => {
      expect(new I64(1n).not().value).toBe(-2n);
      expect(new I64(42n).not().value).toBe(-43n);
    });

    test('performs bitwise NOT on negative numbers', () => {
      expect(new I64(-10n).not().value).toBe(9n);
    });

    test('double NOT returns original value', () => {
      expect(new I64(42n).not().not().value).toBe(42n);
    });
  });

  describe('add', () => {
    test('adds two positive numbers', () => {
      expect(new I64(10n).add(new I64(20n)).value).toBe(30n);
    });

    test('adds with zero', () => {
      expect(new I64(42n).add(new I64(0n)).value).toBe(42n);
    });

    test('adds two negative numbers', () => {
      expect(new I64(-10n).add(new I64(-20n)).value).toBe(-30n);
    });

    test('adds positive and negative', () => {
      expect(new I64(30n).add(new I64(-10n)).value).toBe(20n);
    });

    test('wraps on overflow', () => {
      const max = 9223372036854775807n;
      expect(new I64(max).add(new I64(1n)).value).toBe(-9223372036854775808n);
    });

    test('wraps on underflow', () => {
      const min = -9223372036854775808n;
      expect(new I64(min).add(new I64(-1n)).value).toBe(9223372036854775807n);
    });
  });

  describe('subtract', () => {
    test('subtracts two numbers', () => {
      expect(new I64(30n).sub(new I64(10n)).value).toBe(20n);
    });

    test('subtracts with zero', () => {
      expect(new I64(42n).sub(new I64(0n)).value).toBe(42n);
    });

    test('subtracts negative numbers', () => {
      expect(new I64(-10n).sub(new I64(-5n)).value).toBe(-5n);
    });

    test('subtracts larger from smaller', () => {
      expect(new I64(10n).sub(new I64(20n)).value).toBe(-10n);
    });

    test('wraps on overflow', () => {
      const min = -9223372036854775808n;
      expect(new I64(min).sub(new I64(1n)).value).toBe(9223372036854775807n);
    });

    test('wraps on underflow', () => {
      const max = 9223372036854775807n;
      expect(new I64(max).sub(new I64(-1n)).value).toBe(-9223372036854775808n);
    });
  });

  describe('multiply', () => {
    test('multiplies two numbers', () => {
      expect(new I64(5n).mul(new I64(3n)).value).toBe(15n);
    });

    test('multiplies with zero', () => {
      expect(new I64(42n).mul(new I64(0n)).value).toBe(0n);
    });

    test('multiplies with one', () => {
      expect(new I64(42n).mul(new I64(1n)).value).toBe(42n);
    });

    test('multiplies negative numbers', () => {
      expect(new I64(-5n).mul(new I64(3n)).value).toBe(-15n);
      expect(new I64(-5n).mul(new I64(-3n)).value).toBe(15n);
    });

    test('wraps on overflow', () => {
      const large = 1000000000n;
      expect(new I64(large).mul(new I64(large)).value).toBe(1000000000000000000n);
    });
  });

  describe('divide', () => {
    test('divides two numbers', () => {
      expect(new I64(20n).div(new I64(3n)).value).toBe(6n);
    });

    test('divides by one', () => {
      expect(new I64(42n).div(new I64(1n)).value).toBe(42n);
    });

    test('divides resulting in zero', () => {
      expect(new I64(2n).div(new I64(3n)).value).toBe(0n);
    });

    test('divides negative numbers', () => {
      expect(new I64(-20n).div(new I64(3n)).value).toBe(-6n);
      expect(new I64(20n).div(new I64(-3n)).value).toBe(-6n);
      expect(new I64(-20n).div(new I64(-3n)).value).toBe(6n);
    });

    test('throws on division by zero', () => {
      expect(() => new I64(42n).div(new I64(0n))).toThrow(RangeError);
      expect(() => new I64(42n).div(new I64(0n))).toThrow('Division by zero');
    });
  });

  describe('modulo', () => {
    test('computes modulo', () => {
      expect(new I64(10n).mod(new I64(3n)).value).toBe(1n);
    });

    test('modulo by one', () => {
      expect(new I64(42n).mod(new I64(1n)).value).toBe(0n);
    });

    test('modulo when dividend is smaller than divisor', () => {
      expect(new I64(2n).mod(new I64(3n)).value).toBe(2n);
    });

    test('modulo with negative numbers', () => {
      expect(new I64(-10n).mod(new I64(3n)).value).toBe(-1n);
      expect(new I64(10n).mod(new I64(-3n)).value).toBe(1n);
    });

    test('modulo with same values', () => {
      expect(new I64(42n).mod(new I64(42n)).value).toBe(0n);
    });

    test('throws on modulo by zero', () => {
      expect(() => new I64(42n).mod(new I64(0n))).toThrow(RangeError);
      expect(() => new I64(42n).mod(new I64(0n))).toThrow('Division by zero');
    });
  });

  describe('shl', () => {
    test('shifts left by 0 (no change)', () => {
      expect(new I64(42n).shl(0).value).toBe(42n);
    });

    test('shifts left by 1', () => {
      expect(new I64(1n).shl(1).value).toBe(2n);
      expect(new I64(21n).shl(1).value).toBe(42n);
    });

    test('shifts left by multiple positions', () => {
      expect(new I64(1n).shl(10).value).toBe(1024n);
      expect(new I64(5n).shl(2).value).toBe(20n);
    });

    test('shifts left wraps at 64 bits', () => {
      expect(new I64(1n).shl(63).value).toBe(-9223372036854775808n);
    });

    test('shifts left with negative shift amount (clamped to 0)', () => {
      expect(new I64(42n).shl(-1).value).toBe(42n);
    });

    test('shifts left beyond 64 bits (clamped)', () => {
      expect(new I64(42n).shl(100).value).toBe(0n);
    });
  });

  describe('shr', () => {
    test('shifts right by 0 (no change)', () => {
      expect(new I64(42n).shr(0).value).toBe(42n);
    });

    test('shifts right by 1', () => {
      expect(new I64(2n).shr(1).value).toBe(1n);
      expect(new I64(42n).shr(1).value).toBe(21n);
    });

    test('shifts right by multiple positions', () => {
      expect(new I64(1024n).shr(10).value).toBe(1n);
      expect(new I64(20n).shr(2).value).toBe(5n);
    });

    test('shifts right is arithmetic (sign-extending)', () => {
      expect(new I64(-8n).shr(1).value).toBe(-4n);
      expect(new I64(-1n).shr(1).value).toBe(-1n);
    });

    test('shifts right with negative shift amount (clamped to 0)', () => {
      expect(new I64(42n).shr(-1).value).toBe(42n);
    });

    test('shifts right beyond 64 bits (clamped)', () => {
      expect(new I64(42n).shr(100).value).toBe(0n);
      expect(new I64(-42n).shr(100).value).toBe(-1n);
    });
  });

  describe('rotl', () => {
    test('rotates left by 0 (no change)', () => {
      expect(new I64(42n).rotl(0).value).toBe(42n);
    });

    test('rotates left by 1', () => {
      expect(new I64(1n).rotl(1).value).toBe(2n);
    });

    test('rotates left wraps bits around', () => {
      const highBit = 1n << 63n;
      expect(new I64(highBit).rotl(1).value).toBe(1n);
    });

    test('rotates left by multiple positions', () => {
      expect(new I64(1n).rotl(10).value).toBe(1024n);
    });

    test('rotates left by 64 (full rotation)', () => {
      expect(new I64(42n).rotl(64).value).toBe(42n);
    });

    test('rotates left by negative amount (rotates right)', () => {
      expect(new I64(2n).rotl(-1).value).toBe(1n);
    });
  });

  describe('rotr', () => {
    test('rotates right by 0 (no change)', () => {
      expect(new I64(42n).rotr(0).value).toBe(42n);
    });

    test('rotates right by 1', () => {
      expect(new I64(2n).rotr(1).value).toBe(1n);
    });

    test('rotates right wraps bits around', () => {
      expect(new I64(1n).rotr(1).value).toBe(-9223372036854775808n);
    });

    test('rotates right by multiple positions', () => {
      expect(new I64(1024n).rotr(10).value).toBe(1n);
    });

    test('rotates right by 64 (full rotation)', () => {
      expect(new I64(42n).rotr(64).value).toBe(42n);
    });

    test('rotates right by negative amount (rotates left)', () => {
      expect(new I64(1n).rotr(-1).value).toBe(2n);
    });

    test('rotates right with negative values', () => {
      expect(new I64(-1n).rotr(1).value).toBe(-1n);
      expect(new I64(-2n).rotr(1).value).toBe(9223372036854775807n);
    });
  });

  describe('maj', () => {
    test('returns maj bit for each position', () => {
      expect(new I64(0b1010n).maj(new I64(0b1100n), new I64(0b1001n)).value).toBe(0b1000n);
    });

    test('maj with all zeros', () => {
      expect(new I64(0n).maj(new I64(0n), new I64(0n)).value).toBe(0n);
    });

    test('maj with all ones', () => {
      expect(new I64(-1n).maj(new I64(-1n), new I64(-1n)).value).toBe(-1n);
    });

    test('maj with two ones and one zero', () => {
      expect(new I64(-1n).maj(new I64(-1n), new I64(0n)).value).toBe(-1n);
    });

    test('maj with two zeros and one one', () => {
      expect(new I64(0n).maj(new I64(0n), new I64(-1n)).value).toBe(0n);
    });
  });

  describe('ch', () => {
    test('chs y where x is 1, z where x is 0', () => {
      expect(new I64(0b1010n).ch(new I64(0b1111n), new I64(0b0000n)).value).toBe(0b1010n);
    });

    test('ch with all zeros', () => {
      expect(new I64(0n).ch(new I64(-1n), new I64(0n)).value).toBe(0n);
    });

    test('ch returns y when x is all ones', () => {
      expect(new I64(-1n).ch(new I64(42n), new I64(84n)).value).toBe(42n);
    });

    test('ch returns z when x is all zeros', () => {
      expect(new I64(0n).ch(new I64(42n), new I64(84n)).value).toBe(84n);
    });
  });

  describe('cnt1', () => {
    test('counts zero ones in zero', () => {
      expect(new I64(0n).cnt1()).toBe(0);
    });

    test('counts one in 1', () => {
      expect(new I64(1n).cnt1()).toBe(1);
    });

    test('counts ones in powers of two', () => {
      expect(new I64(2n).cnt1()).toBe(1);
      expect(new I64(4n).cnt1()).toBe(1);
      expect(new I64(8n).cnt1()).toBe(1);
    });

    test('counts ones in all bits set', () => {
      expect(new I64(-1n).cnt1()).toBe(64);
    });

    test('counts ones in various patterns', () => {
      expect(new I64(0b10101010n).cnt1()).toBe(4);
      expect(new I64(0b11001100n).cnt1()).toBe(4);
    });

    test('counts ones in negative numbers', () => {
      expect(new I64(-2n).cnt1()).toBe(63);
    });
  });

  describe('cnt0', () => {
    test('counts 64 zeros in zero', () => {
      expect(new I64(0n).cnt0()).toBe(64);
    });

    test('counts zeros in 1', () => {
      expect(new I64(1n).cnt0()).toBe(63);
    });

    test('counts zeros in powers of two', () => {
      expect(new I64(2n).cnt0()).toBe(63);
      expect(new I64(4n).cnt0()).toBe(63);
    });

    test('counts zero zeros in all bits set', () => {
      expect(new I64(-1n).cnt0()).toBe(0);
    });

    test('sum of ones and zeros equals 64', () => {
      const val = new I64(42n);
      expect(val.cnt1() + val.cnt0()).toBe(64);
    });
  });

  describe('toString', () => {
    test('converts to decimal string by default', () => {
      expect(new I64(42n).toString()).toBe('42');
      expect(new I64(-42n).toString()).toBe('-42');
    });

    test('converts to binary string', () => {
      expect(new I64(10n).toString(2)).toBe('1010');
      expect(new I64(-1n).toString(2)).toBe('-1');
    });

    test('converts to hexadecimal string', () => {
      expect(new I64(42n).toString(16)).toBe('2a');
      expect(new I64(-1n).toString(16)).toBe('-1');
    });

    test('converts to octal string', () => {
      expect(new I64(42n).toString(8)).toBe('52');
    });

    test('handles various radix values', () => {
      expect(new I64(100n).toString(36)).toBe('2s');
    });
  });

  describe('valueOf', () => {
    test('returns the numeric value', () => {
      expect(new I64(42n).valueOf()).toBe(42n);
      expect(new I64(-42n).valueOf()).toBe(-42n);
    });

    test('allows numeric operations', () => {
      expect(new I64(42n).valueOf() + 8n).toBe(50n);
    });
  });

  describe('Symbol.toPrimitive', () => {
    test('converts to bigint when hint is number', () => {
      const val = new I64(42n);
      expect(Number(val)).toBe(Number(42n));
      expect(val.valueOf()).toBe(42n);
    });

    test('converts to string when hint is string', () => {
      expect(toString(new I64(42n))).toBe('42');
    });

    test('works with signed values', () => {
      const max = new I64(9223372036854775807n);
      const min = new I64(-9223372036854775808n);
      expect(max.valueOf()).toBe(9223372036854775807n);
      expect(min.valueOf()).toBe(-9223372036854775808n);
    });
  });

  describe('chaining and immutability', () => {
    test('chaining operations', () => {
      const result = new I64(10n).add(new I64(5n)).mul(new I64(2n)).sub(new I64(10n));
      expect(result.value).toBe(20n);
    });

    test('complex bit manipulation', () => {
      const result = new I64(0b1010n)
        .or(new I64(0b0101n))
        .and(new I64(0b1100n))
        .xor(new I64(0b0011n));
      expect(result.value).toBe(0b1111n);
    });

    test('immutability - operations return new instances', () => {
      const original = new I64(42n);
      const modified = original.add(new I64(10n));
      expect(original.value).toBe(42n);
      expect(modified.value).toBe(52n);
    });

    test('working with cryptographic-style operations', () => {
      const x = new I64(0b10101010n);
      const y = new I64(0b11001100n);
      const z = new I64(0b11110000n);
      const result = x.ch(y, z).xor(x.rotr(2));
      expect(result).toBeInstanceOf(I64);
    });

    test('signed arithmetic wrapping', () => {
      const max = 9223372036854775807n;
      const min = -9223372036854775808n;
      expect(new I64(max).add(new I64(1n)).value).toBe(min);
      expect(new I64(min).sub(new I64(1n)).value).toBe(max);
    });
  });
});
