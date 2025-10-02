import { I32 } from '../../binary/i32.ts';
import { I64 } from '../../binary/i64.ts';
import { U32 } from '../../binary/u32.ts';
import { U64 } from '../../binary/u64.ts';

import { toBigInt } from '../to-big-int.ts';

describe('toBigInt', () => {
  describe('bigint input', () => {
    test('returns bigint unchanged', () => {
      expect(toBigInt(0n)).toBe(0n);
      expect(toBigInt(42n)).toBe(42n);
      expect(toBigInt(-42n)).toBe(-42n);
    });

    test('handles large bigints', () => {
      expect(toBigInt(9007199254740991n)).toBe(9007199254740991n);
      expect(toBigInt(18446744073709551615n)).toBe(18446744073709551615n);
      expect(toBigInt(-9007199254740991n)).toBe(-9007199254740991n);
    });
  });

  describe('number input', () => {
    test('converts positive integers', () => {
      expect(toBigInt(0)).toBe(0n);
      expect(toBigInt(1)).toBe(1n);
      expect(toBigInt(42)).toBe(42n);
      expect(toBigInt(1000)).toBe(1000n);
    });

    test('converts negative integers', () => {
      expect(toBigInt(-1)).toBe(-1n);
      expect(toBigInt(-42)).toBe(-42n);
      expect(toBigInt(-1000)).toBe(-1000n);
    });

    test('truncates decimal numbers', () => {
      expect(toBigInt(3.14)).toBe(3n);
      expect(toBigInt(3.99)).toBe(3n);
      expect(toBigInt(-3.14)).toBe(-3n);
      expect(toBigInt(-3.99)).toBe(-3n);
    });

    test('handles floating point edge cases', () => {
      expect(toBigInt(0.1)).toBe(0n);
      expect(toBigInt(0.9)).toBe(0n);
      expect(toBigInt(-0.1)).toBe(0n);
      expect(toBigInt(-0.9)).toBe(0n);
    });

    test('handles special number values', () => {
      expect(toBigInt(Number.MAX_SAFE_INTEGER)).toBe(9007199254740991n);
      expect(toBigInt(Number.MIN_SAFE_INTEGER)).toBe(-9007199254740991n);
    });

    test('throws for NaN', () => {
      expect(() => toBigInt(Number.NaN)).toThrow();
    });

    test('throws for Infinity', () => {
      expect(() => toBigInt(Number.POSITIVE_INFINITY)).toThrow();
    });

    test('handles -Infinity', () => {
      expect(() => toBigInt(Number.NEGATIVE_INFINITY)).toThrow();
    });
  });

  describe('string input', () => {
    test('converts numeric strings', () => {
      expect(toBigInt('0')).toBe(0n);
      expect(toBigInt('42')).toBe(42n);
      expect(toBigInt('-42')).toBe(-42n);
      expect(toBigInt('1000')).toBe(1000n);
    });

    test('converts large numeric strings', () => {
      expect(toBigInt('9007199254740991')).toBe(9007199254740991n);
      expect(toBigInt('18446744073709551615')).toBe(18446744073709551615n);
    });

    test('handles hexadecimal strings', () => {
      expect(toBigInt('0xff')).toBe(255n);
      expect(toBigInt('0xFF')).toBe(255n);
      expect(toBigInt('0x10')).toBe(16n);
    });

    test('handles octal strings', () => {
      expect(toBigInt('0o10')).toBe(8n);
      expect(toBigInt('0o77')).toBe(63n);
    });

    test('handles binary strings', () => {
      expect(toBigInt('0b1010')).toBe(10n);
      expect(toBigInt('0b11111111')).toBe(255n);
    });

    test('throws for invalid numeric strings', () => {
      expect(() => toBigInt('abc')).toThrow();
      expect(() => toBigInt('12.34')).toThrow();
      expect(() => toBigInt('1e10')).toThrow();
    });

    test('handles empty and whitespace strings', () => {
      // BigInt() converts empty/whitespace to 0n
      expect(toBigInt('')).toBe(0n);
      expect(toBigInt(' ')).toBe(0n);
      expect(toBigInt('  ')).toBe(0n);
      expect(toBigInt('\t')).toBe(0n);
      expect(toBigInt('\n')).toBe(0n);
    });

    test('handles strings with leading/trailing whitespace', () => {
      // BigInt() trims whitespace
      expect(toBigInt(' 42 ')).toBe(42n);
      expect(toBigInt('42 ')).toBe(42n);
      expect(toBigInt(' 42')).toBe(42n);
      expect(toBigInt('\t42\n')).toBe(42n);
    });
  });

  describe('Int wrapper instances', () => {
    test('converts I32 instances', () => {
      expect(toBigInt(new I32(100))).toBe(100n);
      expect(toBigInt(new I32(-50))).toBe(-50n);
      expect(toBigInt(new I32(0))).toBe(0n);
    });

    test('converts I64 instances', () => {
      expect(toBigInt(new I64(1000n))).toBe(1000n);
      expect(toBigInt(new I64(-999n))).toBe(-999n);
      expect(toBigInt(new I64(0n))).toBe(0n);
    });

    test('converts U32 instances', () => {
      expect(toBigInt(new U32(255))).toBe(255n);
      expect(toBigInt(new U32(0))).toBe(0n);
      expect(toBigInt(new U32(4294967295))).toBe(4294967295n);
    });

    test('converts U64 instances', () => {
      expect(toBigInt(new U64(12345n))).toBe(12345n);
      expect(toBigInt(new U64(0n))).toBe(0n);
      expect(toBigInt(new U64(18446744073709551615n))).toBe(18446744073709551615n);
    });
  });

  describe('edge cases', () => {
    test('handles zero in different forms', () => {
      expect(toBigInt(0)).toBe(0n);
      expect(toBigInt(-0)).toBe(0n);
      expect(toBigInt(0n)).toBe(0n);
      expect(toBigInt('0')).toBe(0n);
    });

    test('maintains negative zero as zero', () => {
      expect(toBigInt(-0)).toBe(0n);
      expect(Object.is(toBigInt(-0), 0n)).toBeTrue();
    });
  });
});
