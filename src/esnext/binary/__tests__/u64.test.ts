import { toString } from '../../string/to-string.ts';

import { U64 } from '../u64.ts';

describe('U64', () => {
  describe('constructor', () => {
    test('creates U64 with zero', () => {
      expect(new U64(0n).value).toBe(0n);
    });

    test('creates U64 with positive integer', () => {
      expect(new U64(42n).value).toBe(42n);
    });

    test('wraps negative integers to unsigned range', () => {
      expect(new U64(-1n).value).toBe(18446744073709551615n);
      expect(new U64(-50n).value).toBe(18446744073709551566n);
    });

    test('creates U64 from number', () => {
      expect(new U64(42).value).toBe(42n);
    });

    test('truncates decimal values', () => {
      expect(new U64(42.7).value).toBe(42n);
    });

    test('wraps values outside 64-bit unsigned range', () => {
      const max = 18446744073709551615n;
      expect(new U64(max + 1n).value).toBe(0n);
      expect(new U64(max + 100n).value).toBe(99n);
    });

    test('handles max 64-bit unsigned value', () => {
      expect(new U64(18446744073709551615n).value).toBe(18446744073709551615n);
    });
  });

  describe('len', () => {
    test('returns the bit length of 64', () => {
      expect(new U64(0n).len).toBe(64);
      expect(new U64(42n).len).toBe(64);
      expect(new U64(18446744073709551615n).len).toBe(64);
    });
  });

  describe('or', () => {
    test('performs bitwise OR on two zeros', () => {
      expect(new U64(0n).or(new U64(0n)).value).toBe(0n);
    });

    test('performs bitwise OR with identity (0)', () => {
      expect(new U64(42n).or(new U64(0n)).value).toBe(42n);
    });

    test('performs bitwise OR on different patterns', () => {
      expect(new U64(0b1010n).or(new U64(0b0101n)).value).toBe(0b1111n);
    });

    test('performs bitwise OR on same value', () => {
      expect(new U64(42n).or(new U64(42n)).value).toBe(42n);
    });

    test('performs bitwise OR with all bits set', () => {
      const max = 18446744073709551615n;
      expect(new U64(max).or(new U64(42n)).value).toBe(max);
    });

    test('performs bitwise OR on large unsigned values', () => {
      expect(new U64(1000000000000n).or(new U64(5000000000000n)).value).toBe(5415815172096n);
    });
  });

  describe('and', () => {
    test('performs bitwise AND on two zeros', () => {
      expect(new U64(0n).and(new U64(0n)).value).toBe(0n);
    });

    test('performs bitwise AND with zero', () => {
      expect(new U64(42n).and(new U64(0n)).value).toBe(0n);
    });

    test('performs bitwise AND on different patterns', () => {
      expect(new U64(0b1010n).and(new U64(0b0110n)).value).toBe(0b0010n);
    });

    test('performs bitwise AND on same value', () => {
      expect(new U64(42n).and(new U64(42n)).value).toBe(42n);
    });

    test('performs bitwise AND with all bits set', () => {
      const max = 18446744073709551615n;
      expect(new U64(42n).and(new U64(max)).value).toBe(42n);
    });

    test('performs bitwise AND on large unsigned values', () => {
      expect(new U64(1000000000000n).and(new U64(5000000000000n)).value).toBe(584184827904n);
    });
  });

  describe('xor', () => {
    test('performs bitwise XOR on two zeros', () => {
      expect(new U64(0n).xor(new U64(0n)).value).toBe(0n);
    });

    test('performs bitwise XOR with zero (identity)', () => {
      expect(new U64(42n).xor(new U64(0n)).value).toBe(42n);
    });

    test('performs bitwise XOR on different patterns', () => {
      expect(new U64(0b1010n).xor(new U64(0b0110n)).value).toBe(0b1100n);
    });

    test('performs bitwise XOR on same value (returns zero)', () => {
      expect(new U64(42n).xor(new U64(42n)).value).toBe(0n);
    });

    test('performs bitwise XOR with all bits set', () => {
      const max = 18446744073709551615n;
      expect(new U64(42n).xor(new U64(max)).value).toBe(18446744073709551573n);
    });

    test('performs bitwise XOR on large unsigned values', () => {
      expect(new U64(1000000000000n).xor(new U64(5000000000000n)).value).toBe(4831630344192n);
    });
  });

  describe('not', () => {
    test('performs bitwise NOT on zero', () => {
      expect(new U64(0n).not().value).toBe(18446744073709551615n);
    });

    test('performs bitwise NOT on all bits set', () => {
      expect(new U64(18446744073709551615n).not().value).toBe(0n);
    });

    test('performs bitwise NOT on positive numbers', () => {
      expect(new U64(1n).not().value).toBe(18446744073709551614n);
      expect(new U64(42n).not().value).toBe(18446744073709551573n);
    });

    test('double NOT returns original value', () => {
      expect(new U64(42n).not().not().value).toBe(42n);
    });
  });

  describe('add', () => {
    test('adds two positive numbers', () => {
      expect(new U64(10n).add(new U64(20n)).value).toBe(30n);
    });

    test('adds with zero', () => {
      expect(new U64(42n).add(new U64(0n)).value).toBe(42n);
    });

    test('wraps on overflow', () => {
      const max = 18446744073709551615n;
      expect(new U64(max).add(new U64(1n)).value).toBe(0n);
      expect(new U64(max).add(new U64(100n)).value).toBe(99n);
    });
  });

  describe('subtract', () => {
    test('subtracts two numbers', () => {
      expect(new U64(30n).sub(new U64(10n)).value).toBe(20n);
    });

    test('subtracts with zero', () => {
      expect(new U64(42n).sub(new U64(0n)).value).toBe(42n);
    });

    test('wraps on underflow', () => {
      expect(new U64(10n).sub(new U64(20n)).value).toBe(18446744073709551606n);
      expect(new U64(0n).sub(new U64(1n)).value).toBe(18446744073709551615n);
    });
  });

  describe('multiply', () => {
    test('multiplies two numbers', () => {
      expect(new U64(5n).mul(new U64(3n)).value).toBe(15n);
    });

    test('multiplies with zero', () => {
      expect(new U64(42n).mul(new U64(0n)).value).toBe(0n);
    });

    test('multiplies with one', () => {
      expect(new U64(42n).mul(new U64(1n)).value).toBe(42n);
    });

    test('wraps on overflow', () => {
      const large = 10000000000n;
      expect(new U64(large).mul(new U64(large)).value).toBe(7766279631452241920n);
    });
  });

  describe('divide', () => {
    test('divides two numbers', () => {
      expect(new U64(20n).div(new U64(3n)).value).toBe(6n);
    });

    test('divides by one', () => {
      expect(new U64(42n).div(new U64(1n)).value).toBe(42n);
    });

    test('divides resulting in zero', () => {
      expect(new U64(2n).div(new U64(3n)).value).toBe(0n);
    });

    test('throws on division by zero', () => {
      expect(() => new U64(42n).div(new U64(0n))).toThrow(RangeError);
      expect(() => new U64(42n).div(new U64(0n))).toThrow('Division by zero');
    });
  });

  describe('modulo', () => {
    test('computes modulo', () => {
      expect(new U64(10n).mod(new U64(3n)).value).toBe(1n);
    });

    test('modulo by one', () => {
      expect(new U64(42n).mod(new U64(1n)).value).toBe(0n);
    });

    test('modulo when dividend is smaller than divisor', () => {
      expect(new U64(2n).mod(new U64(3n)).value).toBe(2n);
    });

    test('throws on modulo by zero', () => {
      expect(() => new U64(42n).mod(new U64(0n))).toThrow(RangeError);
      expect(() => new U64(42n).mod(new U64(0n))).toThrow('Division by zero');
    });
  });

  describe('shl', () => {
    test('shifts left by 0 (no change)', () => {
      expect(new U64(42n).shl(0).value).toBe(42n);
    });

    test('shifts left by 1', () => {
      expect(new U64(1n).shl(1).value).toBe(2n);
      expect(new U64(21n).shl(1).value).toBe(42n);
    });

    test('shifts left by multiple positions', () => {
      expect(new U64(1n).shl(10).value).toBe(1024n);
      expect(new U64(5n).shl(2).value).toBe(20n);
    });

    test('shifts left wraps at 64 bits', () => {
      expect(new U64(1n).shl(64).value).toBe(0n);
    });

    test('shifts left with negative shift amount (clamped to 0)', () => {
      expect(new U64(42n).shl(-1).value).toBe(42n);
    });

    test('shifts left beyond 64 bits (clamped)', () => {
      expect(new U64(42n).shl(100).value).toBe(0n);
    });
  });

  describe('shr', () => {
    test('shifts right by 0 (no change)', () => {
      expect(new U64(42n).shr(0).value).toBe(42n);
    });

    test('shifts right by 1', () => {
      expect(new U64(2n).shr(1).value).toBe(1n);
      expect(new U64(42n).shr(1).value).toBe(21n);
    });

    test('shifts right by multiple positions', () => {
      expect(new U64(1024n).shr(10).value).toBe(1n);
      expect(new U64(20n).shr(2).value).toBe(5n);
    });

    test('shifts right with zero-fill (logical shift)', () => {
      const max = 18446744073709551615n;
      expect(new U64(max).shr(1).value).toBe(9223372036854775807n);
    });

    test('shifts right with negative shift amount (clamped to 0)', () => {
      expect(new U64(42n).shr(-1).value).toBe(42n);
    });

    test('shifts right beyond 64 bits (clamped)', () => {
      expect(new U64(42n).shr(100).value).toBe(0n);
    });
  });

  describe('rotl', () => {
    test('rotates left by 0 (no change)', () => {
      expect(new U64(42n).rotl(0).value).toBe(42n);
    });

    test('rotates left by 1', () => {
      expect(new U64(1n).rotl(1).value).toBe(2n);
    });

    test('rotates left wraps bits around', () => {
      const highBit = 1n << 63n;
      expect(new U64(highBit).rotl(1).value).toBe(1n);
    });

    test('rotates left by multiple positions', () => {
      expect(new U64(1n).rotl(10).value).toBe(1024n);
    });

    test('rotates left by 64 (full rotation)', () => {
      expect(new U64(42n).rotl(64).value).toBe(42n);
    });

    test('rotates left by negative amount (rotates right)', () => {
      expect(new U64(2n).rotl(-1).value).toBe(1n);
    });
  });

  describe('rotr', () => {
    test('rotates right by 0 (no change)', () => {
      expect(new U64(42n).rotr(0).value).toBe(42n);
    });

    test('rotates right by 1', () => {
      expect(new U64(2n).rotr(1).value).toBe(1n);
    });

    test('rotates right wraps bits around', () => {
      expect(new U64(1n).rotr(1).value).toBe(9223372036854775808n);
    });

    test('rotates right by multiple positions', () => {
      expect(new U64(1024n).rotr(10).value).toBe(1n);
    });

    test('rotates right by 64 (full rotation)', () => {
      expect(new U64(42n).rotr(64).value).toBe(42n);
    });

    test('rotates right by negative amount (rotates left)', () => {
      expect(new U64(1n).rotr(-1).value).toBe(2n);
    });
  });

  describe('maj', () => {
    test('returns maj bit for each position', () => {
      expect(new U64(0b1010n).maj(new U64(0b1100n), new U64(0b1001n)).value).toBe(0b1000n);
    });

    test('maj with all zeros', () => {
      expect(new U64(0n).maj(new U64(0n), new U64(0n)).value).toBe(0n);
    });

    test('maj with all ones', () => {
      const max = 18446744073709551615n;
      expect(new U64(max).maj(new U64(max), new U64(max)).value).toBe(max);
    });

    test('maj with two ones and one zero', () => {
      const max = 18446744073709551615n;
      expect(new U64(max).maj(new U64(max), new U64(0n)).value).toBe(max);
    });

    test('maj with two zeros and one one', () => {
      const max = 18446744073709551615n;
      expect(new U64(0n).maj(new U64(0n), new U64(max)).value).toBe(0n);
    });
  });

  describe('ch', () => {
    test('chs y where x is 1, z where x is 0', () => {
      expect(new U64(0b1010n).ch(new U64(0b1111n), new U64(0b0000n)).value).toBe(0b1010n);
    });

    test('ch with all zeros', () => {
      const max = 18446744073709551615n;
      expect(new U64(0n).ch(new U64(max), new U64(0n)).value).toBe(0n);
    });

    test('ch returns y when x is all ones', () => {
      const max = 18446744073709551615n;
      expect(new U64(max).ch(new U64(42n), new U64(84n)).value).toBe(42n);
    });

    test('ch returns z when x is all zeros', () => {
      expect(new U64(0n).ch(new U64(42n), new U64(84n)).value).toBe(84n);
    });
  });

  describe('cnt1', () => {
    test('counts zero ones in zero', () => {
      expect(new U64(0n).cnt1()).toBe(0);
    });

    test('counts one in 1', () => {
      expect(new U64(1n).cnt1()).toBe(1);
    });

    test('counts ones in powers of two', () => {
      expect(new U64(2n).cnt1()).toBe(1);
      expect(new U64(4n).cnt1()).toBe(1);
      expect(new U64(8n).cnt1()).toBe(1);
    });

    test('counts ones in all bits set', () => {
      expect(new U64(18446744073709551615n).cnt1()).toBe(64);
    });

    test('counts ones in various patterns', () => {
      expect(new U64(0b10101010n).cnt1()).toBe(4);
      expect(new U64(0b11001100n).cnt1()).toBe(4);
    });

    test('counts ones in large values', () => {
      expect(new U64(18446744073709551614n).cnt1()).toBe(63);
    });
  });

  describe('cnt0', () => {
    test('counts 64 zeros in zero', () => {
      expect(new U64(0n).cnt0()).toBe(64);
    });

    test('counts zeros in 1', () => {
      expect(new U64(1n).cnt0()).toBe(63);
    });

    test('counts zeros in powers of two', () => {
      expect(new U64(2n).cnt0()).toBe(63);
      expect(new U64(4n).cnt0()).toBe(63);
    });

    test('counts zero zeros in all bits set', () => {
      expect(new U64(18446744073709551615n).cnt0()).toBe(0);
    });

    test('sum of ones and zeros equals 64', () => {
      const val = new U64(42n);
      expect(val.cnt1() + val.cnt0()).toBe(64);
    });
  });

  describe('toString', () => {
    test('converts to decimal string by default', () => {
      expect(new U64(42n).toString()).toBe('42');
      expect(new U64(18446744073709551615n).toString()).toBe('18446744073709551615');
    });

    test('converts to binary string', () => {
      expect(new U64(10n).toString(2)).toBe('1010');
      expect(new U64(18446744073709551615n).toString(2)).toBe(
        '1111111111111111111111111111111111111111111111111111111111111111',
      );
    });

    test('converts to hexadecimal string', () => {
      expect(new U64(42n).toString(16)).toBe('2a');
      expect(new U64(18446744073709551615n).toString(16)).toBe('ffffffffffffffff');
    });

    test('converts to octal string', () => {
      expect(new U64(42n).toString(8)).toBe('52');
    });

    test('handles various radix values', () => {
      expect(new U64(100n).toString(36)).toBe('2s');
    });
  });

  describe('valueOf', () => {
    test('returns the numeric value', () => {
      expect(new U64(42n).valueOf()).toBe(42n);
      expect(new U64(18446744073709551615n).valueOf()).toBe(18446744073709551615n);
    });

    test('allows numeric operations', () => {
      expect(new U64(42n).valueOf() + 8n).toBe(50n);
    });
  });

  describe('Symbol.toPrimitive', () => {
    test('converts to bigint when hint is number', () => {
      const val = new U64(42n);
      expect(Number(val)).toBe(Number(42n));
      expect(val.valueOf()).toBe(42n);
    });

    test('converts to string when hint is string', () => {
      expect(toString(new U64(42n))).toBe('42');
    });

    test('works with large unsigned values', () => {
      const max = new U64(18446744073709551615n);
      expect(max.valueOf()).toBe(18446744073709551615n);
    });
  });

  describe('chaining and immutability', () => {
    test('chaining operations', () => {
      const result = new U64(10n).add(new U64(5n)).mul(new U64(2n)).sub(new U64(10n));
      expect(result.value).toBe(20n);
    });

    test('complex bit manipulation', () => {
      const result = new U64(0b1010n)
        .or(new U64(0b0101n))
        .and(new U64(0b1100n))
        .xor(new U64(0b0011n));
      expect(result.value).toBe(0b1111n);
    });

    test('immutability - operations return new instances', () => {
      const original = new U64(42n);
      const modified = original.add(new U64(10n));
      expect(original.value).toBe(42n);
      expect(modified.value).toBe(52n);
    });

    test('working with cryptographic-style operations', () => {
      const x = new U64(0b10101010n);
      const y = new U64(0b11001100n);
      const z = new U64(0b11110000n);
      const result = x.ch(y, z).xor(x.rotr(2));
      expect(result).toBeInstanceOf(U64);
    });

    test('unsigned arithmetic wrapping', () => {
      const max = 18446744073709551615n;
      expect(new U64(max).add(new U64(1n)).value).toBe(0n);
      expect(new U64(0n).sub(new U64(1n)).value).toBe(max);
    });
  });

  describe('eq', () => {
    test('returns true for equal values', () => {
      expect(new U64(42n).eq(42n)).toBeTrue();
      expect(new U64(42n).eq(new U64(42n))).toBeTrue();
      expect(new U64(0n).eq(0n)).toBeTrue();
      expect(new U64(18446744073709551615n).eq(18446744073709551615n)).toBeTrue();
    });

    test('returns false for unequal values', () => {
      expect(new U64(42n).eq(43n)).toBeFalse();
      expect(new U64(42n).eq(new U64(43n))).toBeFalse();
      expect(new U64(100n).eq(200n)).toBeFalse();
    });

    test('accepts numeric values', () => {
      expect(new U64(42n).eq(42)).toBeTrue();
      expect(new U64(100n).eq(100)).toBeTrue();
      expect(new U64(42n).eq(43)).toBeFalse();
    });
  });

  describe('ne', () => {
    test('returns true for unequal values', () => {
      expect(new U64(42n).ne(43n)).toBeTrue();
      expect(new U64(42n).ne(new U64(43n))).toBeTrue();
      expect(new U64(100n).ne(200n)).toBeTrue();
    });

    test('returns false for equal values', () => {
      expect(new U64(42n).ne(42n)).toBeFalse();
      expect(new U64(42n).ne(new U64(42n))).toBeFalse();
      expect(new U64(0n).ne(0n)).toBeFalse();
    });

    test('accepts numeric values', () => {
      expect(new U64(42n).ne(43)).toBeTrue();
      expect(new U64(42n).ne(42)).toBeFalse();
    });
  });

  describe('lt', () => {
    test('returns true when less than', () => {
      expect(new U64(10n).lt(20n)).toBeTrue();
      expect(new U64(10n).lt(new U64(20n))).toBeTrue();
      expect(new U64(0n).lt(18446744073709551615n)).toBeTrue();
    });

    test('returns false when equal', () => {
      expect(new U64(42n).lt(42n)).toBeFalse();
      expect(new U64(42n).lt(new U64(42n))).toBeFalse();
    });

    test('returns false when greater than', () => {
      expect(new U64(50n).lt(40n)).toBeFalse();
      expect(new U64(50n).lt(new U64(40n))).toBeFalse();
      expect(new U64(18446744073709551615n).lt(0n)).toBeFalse();
    });

    test('accepts numeric values', () => {
      expect(new U64(10n).lt(20)).toBeTrue();
      expect(new U64(50n).lt(40)).toBeFalse();
    });
  });

  describe('le', () => {
    test('returns true when less than', () => {
      expect(new U64(10n).le(20n)).toBeTrue();
      expect(new U64(10n).le(new U64(20n))).toBeTrue();
    });

    test('returns true when equal', () => {
      expect(new U64(42n).le(42n)).toBeTrue();
      expect(new U64(42n).le(new U64(42n))).toBeTrue();
      expect(new U64(18446744073709551615n).le(18446744073709551615n)).toBeTrue();
    });

    test('returns false when greater than', () => {
      expect(new U64(50n).le(40n)).toBeFalse();
      expect(new U64(50n).le(new U64(40n))).toBeFalse();
    });

    test('accepts numeric values', () => {
      expect(new U64(10n).le(20)).toBeTrue();
      expect(new U64(42n).le(42)).toBeTrue();
      expect(new U64(50n).le(40)).toBeFalse();
    });
  });

  describe('gt', () => {
    test('returns true when greater than', () => {
      expect(new U64(50n).gt(40n)).toBeTrue();
      expect(new U64(50n).gt(new U64(40n))).toBeTrue();
      expect(new U64(18446744073709551615n).gt(0n)).toBeTrue();
    });

    test('returns false when equal', () => {
      expect(new U64(42n).gt(42n)).toBeFalse();
      expect(new U64(42n).gt(new U64(42n))).toBeFalse();
    });

    test('returns false when less than', () => {
      expect(new U64(10n).gt(20n)).toBeFalse();
      expect(new U64(10n).gt(new U64(20n))).toBeFalse();
      expect(new U64(0n).gt(18446744073709551615n)).toBeFalse();
    });

    test('accepts numeric values', () => {
      expect(new U64(50n).gt(40)).toBeTrue();
      expect(new U64(10n).gt(20)).toBeFalse();
    });
  });

  describe('ge', () => {
    test('returns true when greater than', () => {
      expect(new U64(50n).ge(40n)).toBeTrue();
      expect(new U64(50n).ge(new U64(40n))).toBeTrue();
    });

    test('returns true when equal', () => {
      expect(new U64(42n).ge(42n)).toBeTrue();
      expect(new U64(42n).ge(new U64(42n))).toBeTrue();
      expect(new U64(18446744073709551615n).ge(18446744073709551615n)).toBeTrue();
    });

    test('returns false when less than', () => {
      expect(new U64(10n).ge(20n)).toBeFalse();
      expect(new U64(10n).ge(new U64(20n))).toBeFalse();
    });

    test('accepts numeric values', () => {
      expect(new U64(50n).ge(40)).toBeTrue();
      expect(new U64(42n).ge(42)).toBeTrue();
      expect(new U64(10n).ge(20)).toBeFalse();
    });
  });

  describe('fromBytes', () => {
    test('creates U64 from byte array', () => {
      const bytes = new Uint8Array([0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef]);
      expect(U64.fromBytes(bytes).value).toBe(0x0123456789abcdefn);
    });

    test('creates U64 from bytes at offset 0', () => {
      const bytes = new Uint8Array([
        0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef, 0xfe, 0xdc, 0xba, 0x98, 0x76, 0x54, 0x32,
        0x10,
      ]);
      expect(U64.fromBytes(bytes, 0).value).toBe(0x0123456789abcdefn);
    });

    test('creates U64 from bytes at offset 1', () => {
      const bytes = new Uint8Array([
        0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef, 0xfe, 0xdc, 0xba, 0x98, 0x76, 0x54, 0x32,
        0x10,
      ]);
      expect(U64.fromBytes(bytes, 1).value).toBe(0xfedcba9876543210n);
    });

    test('creates U64 from all zeros', () => {
      const bytes = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
      expect(U64.fromBytes(bytes).value).toBe(0n);
    });

    test('creates U64 from all ones', () => {
      const bytes = new Uint8Array([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]);
      expect(U64.fromBytes(bytes).value).toBe(18446744073709551615n);
    });

    test('handles missing bytes with default 0', () => {
      const bytes = new Uint8Array([0x01, 0x23, 0x45, 0x67]);
      expect(U64.fromBytes(bytes).value).toBe(0x0123456700000000n);
    });

    test('creates U64 from big-endian byte order', () => {
      const bytes = new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08]);
      expect(U64.fromBytes(bytes).value).toBe(0x0102030405060708n);
    });

    test('creates U64 with high bit set', () => {
      const bytes = new Uint8Array([0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
      expect(U64.fromBytes(bytes).value).toBe(9223372036854775808n);
    });

    test('handles empty byte array with default 0', () => {
      const bytes = new Uint8Array([]);
      expect(U64.fromBytes(bytes).value).toBe(0n);
    });

    test('handles partial byte arrays at various positions', () => {
      const bytes = new Uint8Array([0x01]);
      expect(U64.fromBytes(bytes).value).toBe(0x0100000000000000n);
      const bytes2 = new Uint8Array([0x01, 0x23, 0x45]);
      expect(U64.fromBytes(bytes2).value).toBe(0x0123450000000000n);
      const bytes3 = new Uint8Array([0x01, 0x23, 0x45, 0x67, 0x89, 0xab]);
      expect(U64.fromBytes(bytes3).value).toBe(0x0123456789ab0000n);
    });
  });

  describe('toBytes', () => {
    test('converts U64 to byte array', () => {
      expect(new U64(0x0123456789abcdefn).toBytes()).toEqual([
        0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef,
      ]);
    });

    test('converts zero to bytes', () => {
      expect(new U64(0n).toBytes()).toEqual([0, 0, 0, 0, 0, 0, 0, 0]);
    });

    test('converts max value to bytes', () => {
      expect(new U64(18446744073709551615n).toBytes()).toEqual([
        0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
      ]);
    });

    test('converts to big-endian byte order', () => {
      expect(new U64(0x0102030405060708n).toBytes()).toEqual([
        0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
      ]);
    });

    test('converts decimal to bytes', () => {
      expect(new U64(81985529216486895n).toBytes()).toEqual([
        0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef,
      ]);
    });

    test('converts value with high bit set', () => {
      expect(new U64(9223372036854775808n).toBytes()).toEqual([
        0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      ]);
    });

    test('roundtrip with fromBytes', () => {
      const original = new U64(0x0123456789abcdefn);
      const bytes = original.toBytes();
      const reconstructed = U64.fromBytes(new Uint8Array(bytes));
      expect(reconstructed.value).toBe(original.value);
    });

    test('roundtrip with max value', () => {
      const original = new U64(18446744073709551615n);
      const bytes = original.toBytes();
      const reconstructed = U64.fromBytes(new Uint8Array(bytes));
      expect(reconstructed.value).toBe(original.value);
    });
  });

  describe('sigma0', () => {
    test('computes SHA-512 Σ₀ function', () => {
      const x = new U64(0x0123456789abcdefn);
      const result = x.sigma0();
      expect(result).toBeInstanceOf(U64);
      expect(result.value).not.toBe(x.value);
    });

    test('sigma0 on zero', () => {
      const result = new U64(0n).sigma0();
      expect(result.value).toBe(0n);
    });

    test('sigma0 on all ones', () => {
      const result = new U64(18446744073709551615n).sigma0();
      expect(result.value).toBe(18446744073709551615n);
    });

    test('sigma0 produces consistent results', () => {
      const x = new U64(0x0123456789abcdefn);
      const result1 = x.sigma0();
      const result2 = x.sigma0();
      expect(result1.value).toBe(result2.value);
    });

    test('sigma0 is a pure function', () => {
      const x = new U64(0x6a09e667f3bcc908n);
      const original = x.value;
      x.sigma0();
      expect(x.value).toBe(original);
    });

    test('sigma0 implements ROTR²⁸(x) ⊕ ROTR³⁴(x) ⊕ ROTR³⁹(x)', () => {
      const x = new U64(0x6a09e667f3bcc908n);
      const expected = x.rotr(28).xor(x.rotr(34)).xor(x.rotr(39));
      expect(x.sigma0().value).toBe(expected.value);
    });
  });

  describe('sigma1', () => {
    test('computes SHA-512 Σ₁ function', () => {
      const x = new U64(0x0123456789abcdefn);
      const result = x.sigma1();
      expect(result).toBeInstanceOf(U64);
      expect(result.value).not.toBe(x.value);
    });

    test('sigma1 on zero', () => {
      const result = new U64(0n).sigma1();
      expect(result.value).toBe(0n);
    });

    test('sigma1 on all ones', () => {
      const result = new U64(18446744073709551615n).sigma1();
      expect(result.value).toBe(18446744073709551615n);
    });

    test('sigma1 produces consistent results', () => {
      const x = new U64(0x0123456789abcdefn);
      const result1 = x.sigma1();
      const result2 = x.sigma1();
      expect(result1.value).toBe(result2.value);
    });

    test('sigma1 is a pure function', () => {
      const x = new U64(0xbb67ae8584caa73bn);
      const original = x.value;
      x.sigma1();
      expect(x.value).toBe(original);
    });

    test('sigma1 implements ROTR¹⁴(x) ⊕ ROTR¹⁸(x) ⊕ ROTR⁴¹(x)', () => {
      const x = new U64(0xbb67ae8584caa73bn);
      const expected = x.rotr(14).xor(x.rotr(18)).xor(x.rotr(41));
      expect(x.sigma1().value).toBe(expected.value);
    });
  });

  describe('gamma0', () => {
    test('computes SHA-512 γ₀ function', () => {
      const x = new U64(0x0123456789abcdefn);
      const result = x.gamma0();
      expect(result).toBeInstanceOf(U64);
      expect(result.value).not.toBe(x.value);
    });

    test('gamma0 on zero', () => {
      const result = new U64(0n).gamma0();
      expect(result.value).toBe(0n);
    });

    test('gamma0 produces consistent results', () => {
      const x = new U64(0x0123456789abcdefn);
      const result1 = x.gamma0();
      const result2 = x.gamma0();
      expect(result1.value).toBe(result2.value);
    });

    test('gamma0 is a pure function', () => {
      const x = new U64(0x3c6ef372fe94f82bn);
      const original = x.value;
      x.gamma0();
      expect(x.value).toBe(original);
    });

    test('gamma0 implements ROTR¹(x) ⊕ ROTR⁸(x) ⊕ SHR⁷(x)', () => {
      const x = new U64(0x3c6ef372fe94f82bn);
      const expected = x.rotr(1).xor(x.rotr(8)).xor(x.shr(7));
      expect(x.gamma0().value).toBe(expected.value);
    });

    test('gamma0 transforms all ones', () => {
      const result = new U64(18446744073709551615n).gamma0();
      // gamma0 = ROTR¹(x) ⊕ ROTR⁸(x) ⊕ SHR⁷(x)
      // With all ones, shifts/rotations create different patterns that XOR together
      expect(result.value).toBe(144115188075855871n); // 0x1ffffffffffffff
      expect(result.value).not.toBe(18446744073709551615n);
    });
  });

  describe('gamma1', () => {
    test('computes SHA-512 γ₁ function', () => {
      const x = new U64(0x0123456789abcdefn);
      const result = x.gamma1();
      expect(result).toBeInstanceOf(U64);
      expect(result.value).not.toBe(x.value);
    });

    test('gamma1 on zero', () => {
      const result = new U64(0n).gamma1();
      expect(result.value).toBe(0n);
    });

    test('gamma1 produces consistent results', () => {
      const x = new U64(0x0123456789abcdefn);
      const result1 = x.gamma1();
      const result2 = x.gamma1();
      expect(result1.value).toBe(result2.value);
    });

    test('gamma1 is a pure function', () => {
      const x = new U64(0xa54ff53a5f1d36f1n);
      const original = x.value;
      x.gamma1();
      expect(x.value).toBe(original);
    });

    test('gamma1 implements ROTR¹⁹(x) ⊕ ROTR⁶¹(x) ⊕ SHR⁶(x)', () => {
      const x = new U64(0xa54ff53a5f1d36f1n);
      const expected = x.rotr(19).xor(x.rotr(61)).xor(x.shr(6));
      expect(x.gamma1().value).toBe(expected.value);
    });

    test('gamma1 transforms all ones', () => {
      const result = new U64(18446744073709551615n).gamma1();
      // gamma1 = ROTR¹⁹(x) ⊕ ROTR⁶¹(x) ⊕ SHR⁶(x)
      // With all ones, shifts/rotations create different patterns that XOR together
      expect(result.value).toBe(288230376151711743n); // 0x3ffffffffffffff
      expect(result.value).not.toBe(18446744073709551615n);
    });
  });

  describe('cryptographic functions integration', () => {
    test('all cryptographic functions work together', () => {
      const x = new U64(0x6a09e667f3bcc908n);
      const g0 = x.gamma0();
      const g1 = x.gamma1();
      const s0 = x.sigma0();
      const s1 = x.sigma1();

      expect(g0).toBeInstanceOf(U64);
      expect(g1).toBeInstanceOf(U64);
      expect(s0).toBeInstanceOf(U64);
      expect(s1).toBeInstanceOf(U64);

      expect(g0.value).not.toBe(g1.value);
      expect(s0.value).not.toBe(s1.value);
    });

    test('functions work with SHA-512 initial hash values', () => {
      const h0 = new U64(0x6a09e667f3bcc908n);
      const h1 = new U64(0xbb67ae8584caa73bn);
      const h2 = new U64(0x3c6ef372fe94f82bn);
      const h3 = new U64(0xa54ff53a5f1d36f1n);

      expect(h0.sigma0()).toBeInstanceOf(U64);
      expect(h1.sigma1()).toBeInstanceOf(U64);
      expect(h2.maj(h0, h1)).toBeInstanceOf(U64);
      expect(h3.ch(h0, h1)).toBeInstanceOf(U64);
    });

    test('SHA-512 gamma functions differ from sigma functions', () => {
      const x = new U64(0x0123456789abcdefn);
      const g0 = x.gamma0().value;
      const g1 = x.gamma1().value;
      const s0 = x.sigma0().value;
      const s1 = x.sigma1().value;

      expect(g0).not.toBe(s0);
      expect(g0).not.toBe(s1);
      expect(g1).not.toBe(s0);
      expect(g1).not.toBe(s1);
    });
  });
});
