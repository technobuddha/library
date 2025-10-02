import { toString } from '../../string/to-string.ts';

import { I8 } from '../i8.ts';
import { I16 } from '../i16.ts';
import { I64 } from '../i64.ts';
import { U32 } from '../u32.ts';

describe('Int', () => {
  describe('toString', () => {
    test('converts to string in base 10 by default', () => {
      expect(new I8(42).toString()).toBe('42');
      expect(new I8(-42).toString()).toBe('-42');
      expect(new I8(0).toString()).toBe('0');
    });

    test('converts to string in binary (base 2)', () => {
      expect(new I8(42).toString(2)).toBe('101010');
      expect(new I8(-42).toString(2)).toBe('-101010');
      expect(new I16(255).toString(2)).toBe('11111111');
    });

    test('converts to string in hexadecimal (base 16)', () => {
      expect(new I8(42).toString(16)).toBe('2a');
      expect(new I8(-42).toString(16)).toBe('-2a');
      expect(new U32(255).toString(16)).toBe('ff');
    });

    test('converts to string in octal (base 8)', () => {
      expect(new I8(42).toString(8)).toBe('52');
      expect(new I16(64).toString(8)).toBe('100');
    });

    test('handles edge cases', () => {
      expect(new I8(127).toString()).toBe('127');
      expect(new I8(-128).toString()).toBe('-128');
    });

    test('works with 64-bit integers', () => {
      expect(new I64(42n).toString()).toBe('42');
      expect(new I64(-42n).toString()).toBe('-42');
      expect(new I64(42n).toString(16)).toBe('2a');
    });
  });

  describe('valueOf', () => {
    test('returns the primitive numeric value', () => {
      expect(new I8(42).valueOf()).toBe(42);
      expect(new I8(-42).valueOf()).toBe(-42);
      expect(new I8(200).valueOf()).toBe(-56);
    });

    test('works with different integer types', () => {
      expect(new I16(1000).valueOf()).toBe(1000);
      expect(new U32(42).valueOf()).toBe(42);
    });

    test('works with 64-bit integers', () => {
      expect(new I64(42n).valueOf()).toBe(42n);
      expect(new I64(-42n).valueOf()).toBe(-42n);
    });

    test('enables numeric operations', () => {
      const a = new I8(10);
      const b = new I8(20);
      expect(a.valueOf() + b.valueOf()).toBe(30);
    });
  });

  describe('Symbol.toPrimitive', () => {
    test('returns number for "number" hint', () => {
      const i8 = new I8(42);
      expect(i8[Symbol.toPrimitive]('number')).toBe(42);
      expect(typeof i8[Symbol.toPrimitive]('number')).toBe('number');
    });

    test('returns string for "string" hint', () => {
      const i8 = new I8(42);
      expect(i8[Symbol.toPrimitive]('string')).toBe('42');
      expect(typeof i8[Symbol.toPrimitive]('string')).toBe('string');
    });

    test('returns number for "default" hint', () => {
      const i8 = new I8(42);
      expect(i8[Symbol.toPrimitive]('default')).toBe(42);
      expect(typeof i8[Symbol.toPrimitive]('default')).toBe('number');
    });

    test('enables implicit conversion to number', () => {
      const i8 = new I8(42);
      expect(Number(i8)).toBe(42);
      expect(i8.valueOf() + 10).toBe(52);
    });

    test('enables implicit conversion to string', () => {
      const i8 = new I8(42);
      expect(toString(i8)).toBe('42');
      expect(i8.toString()).toBe('42');
    });

    test('works with 64-bit integers', () => {
      const i64 = new I64(42n);
      expect(i64[Symbol.toPrimitive]('number')).toBe(42n);
      expect(i64[Symbol.toPrimitive]('string')).toBe('42');
    });
  });

  describe('abstract properties', () => {
    test('value property is accessible', () => {
      expect(new I8(42).value).toBe(42);
      expect(new I16(1000).value).toBe(1000);
      expect(new U32(42).value).toBe(42);
      expect(new I64(42n).value).toBe(42n);
    });

    test('len property is accessible', () => {
      expect(new I8(42).len).toBe(8);
      expect(new I16(42).len).toBe(16);
      expect(new U32(42).len).toBe(32);
      expect(new I64(42n).len).toBe(64);
    });
  });

  describe('immutability', () => {
    test('operations return new instances', () => {
      const a = new I8(10);
      const b = a.add(5);
      expect(b).not.toBe(a);
      expect(a.value).toBe(10);
      expect(b.value).toBe(15);
    });

    test('value property is readonly at compile time', () => {
      const i8 = new I8(42);
      // TypeScript prevents this at compile time, but readonly is not enforced at runtime in JavaScript
      // @ts-expect-error - value is readonly in TypeScript
      i8.value = 100;
      // At runtime, the value is actually updated (no runtime enforcement of readonly)
      expect(i8.value).toBe(100);
    });

    test('len property is readonly at compile time', () => {
      const i8 = new I8(42);
      // TypeScript prevents this at compile time, but readonly is not enforced at runtime in JavaScript
      // @ts-expect-error - len is readonly in TypeScript
      i8.len = 16;
      // At runtime, the value is actually updated (no runtime enforcement of readonly)
      expect(i8.len).toBe(16);
    });
  });

  describe('type parameters', () => {
    test('supports number type for 8/16/32-bit integers', () => {
      const i8: I8 = new I8(42);
      const val: number = i8.value;
      expect(typeof val).toBe('number');
    });

    test('supports bigint type for 64-bit integers', () => {
      const i64: I64 = new I64(42n);
      const val: bigint = i64.value;
      expect(typeof val).toBe('bigint');
    });
  });

  describe('integration with concrete types', () => {
    test('all operations are available on concrete types', () => {
      const i8 = new I8(42);

      expect(i8.or(3)).toBeInstanceOf(I8);
      expect(i8.and(3)).toBeInstanceOf(I8);
      expect(i8.xor(3)).toBeInstanceOf(I8);
      expect(i8.not()).toBeInstanceOf(I8);
      expect(i8.add(3)).toBeInstanceOf(I8);
      expect(i8.sub(3)).toBeInstanceOf(I8);
      expect(i8.mul(3)).toBeInstanceOf(I8);
      expect(i8.div(3)).toBeInstanceOf(I8);
      expect(i8.mod(3)).toBeInstanceOf(I8);
      expect(i8.shl(1)).toBeInstanceOf(I8);
      expect(i8.shr(1)).toBeInstanceOf(I8);
      expect(i8.rotl(1)).toBeInstanceOf(I8);
      expect(i8.rotr(1)).toBeInstanceOf(I8);
      expect(i8.maj(new I8(0), new I8(0))).toBeInstanceOf(I8);
      expect(i8.ch(new I8(0), new I8(0))).toBeInstanceOf(I8);
      expect(typeof i8.cnt1()).toBe('number');
      expect(typeof i8.cnt0()).toBe('number');
      expect(typeof i8.eq(42)).toBe('boolean');
      expect(typeof i8.ne(42)).toBe('boolean');
      expect(typeof i8.lt(42)).toBe('boolean');
      expect(typeof i8.le(42)).toBe('boolean');
      expect(typeof i8.gt(42)).toBe('boolean');
      expect(typeof i8.ge(42)).toBe('boolean');
    });
  });

  describe('eq', () => {
    test('returns true for equal values', () => {
      expect(new I8(42).eq(42)).toBeTrue();
      expect(new I8(42).eq(new I8(42))).toBeTrue();
      expect(new I16(1000).eq(1000)).toBeTrue();
      expect(new U32(42).eq(42)).toBeTrue();
    });

    test('returns false for unequal values', () => {
      expect(new I8(42).eq(43)).toBeFalse();
      expect(new I8(42).eq(new I8(43))).toBeFalse();
      expect(new I16(1000).eq(999)).toBeFalse();
      expect(new U32(42).eq(100)).toBeFalse();
    });

    test('works with negative numbers', () => {
      expect(new I8(-42).eq(-42)).toBeTrue();
      expect(new I8(-42).eq(-43)).toBeFalse();
      expect(new I16(-1000).eq(-1000)).toBeTrue();
    });

    test('works with 64-bit integers', () => {
      expect(new I64(42n).eq(42n)).toBeTrue();
      expect(new I64(42n).eq(new I64(42n))).toBeTrue();
      expect(new I64(42n).eq(43n)).toBeFalse();
      expect(new I64(42n).eq(42)).toBeTrue();
    });
  });

  describe('ne', () => {
    test('returns true for unequal values', () => {
      expect(new I8(42).ne(43)).toBeTrue();
      expect(new I8(42).ne(new I8(43))).toBeTrue();
      expect(new I16(1000).ne(999)).toBeTrue();
      expect(new U32(42).ne(100)).toBeTrue();
    });

    test('returns false for equal values', () => {
      expect(new I8(42).ne(42)).toBeFalse();
      expect(new I8(42).ne(new I8(42))).toBeFalse();
      expect(new I16(1000).ne(1000)).toBeFalse();
      expect(new U32(42).ne(42)).toBeFalse();
    });

    test('works with negative numbers', () => {
      expect(new I8(-42).ne(-43)).toBeTrue();
      expect(new I8(-42).ne(-42)).toBeFalse();
      expect(new I16(-1000).ne(-999)).toBeTrue();
    });

    test('works with 64-bit integers', () => {
      expect(new I64(42n).ne(43n)).toBeTrue();
      expect(new I64(42n).ne(new I64(42n))).toBeFalse();
      expect(new I64(42n).ne(42)).toBeFalse();
    });
  });

  describe('lt', () => {
    test('returns true when less than', () => {
      expect(new I8(10).lt(20)).toBeTrue();
      expect(new I8(10).lt(new I8(20))).toBeTrue();
      expect(new I16(100).lt(200)).toBeTrue();
      expect(new U32(50).lt(100)).toBeTrue();
    });

    test('returns false when equal', () => {
      expect(new I8(42).lt(42)).toBeFalse();
      expect(new I8(42).lt(new I8(42))).toBeFalse();
      expect(new I16(1000).lt(1000)).toBeFalse();
    });

    test('returns false when greater than', () => {
      expect(new I8(50).lt(40)).toBeFalse();
      expect(new I8(50).lt(new I8(40))).toBeFalse();
      expect(new I16(200).lt(100)).toBeFalse();
    });

    test('works with negative numbers', () => {
      expect(new I8(-10).lt(0)).toBeTrue();
      expect(new I8(-10).lt(-5)).toBeTrue();
      expect(new I8(-5).lt(-10)).toBeFalse();
      expect(new I16(-1000).lt(0)).toBeTrue();
    });

    test('works with 64-bit integers', () => {
      expect(new I64(10n).lt(20n)).toBeTrue();
      expect(new I64(50n).lt(40n)).toBeFalse();
      expect(new I64(42n).lt(42n)).toBeFalse();
      expect(new I64(10n).lt(20)).toBeTrue();
    });
  });

  describe('le', () => {
    test('returns true when less than', () => {
      expect(new I8(10).le(20)).toBeTrue();
      expect(new I8(10).le(new I8(20))).toBeTrue();
      expect(new I16(100).le(200)).toBeTrue();
    });

    test('returns true when equal', () => {
      expect(new I8(42).le(42)).toBeTrue();
      expect(new I8(42).le(new I8(42))).toBeTrue();
      expect(new I16(1000).le(1000)).toBeTrue();
      expect(new U32(42).le(42)).toBeTrue();
    });

    test('returns false when greater than', () => {
      expect(new I8(50).le(40)).toBeFalse();
      expect(new I8(50).le(new I8(40))).toBeFalse();
      expect(new I16(200).le(100)).toBeFalse();
    });

    test('works with negative numbers', () => {
      expect(new I8(-10).le(0)).toBeTrue();
      expect(new I8(-10).le(-10)).toBeTrue();
      expect(new I8(-5).le(-10)).toBeFalse();
    });

    test('works with 64-bit integers', () => {
      expect(new I64(10n).le(20n)).toBeTrue();
      expect(new I64(42n).le(42n)).toBeTrue();
      expect(new I64(50n).le(40n)).toBeFalse();
      expect(new I64(10n).le(20)).toBeTrue();
    });
  });

  describe('gt', () => {
    test('returns true when greater than', () => {
      expect(new I8(50).gt(40)).toBeTrue();
      expect(new I8(50).gt(new I8(40))).toBeTrue();
      expect(new I16(200).gt(100)).toBeTrue();
      expect(new U32(100).gt(50)).toBeTrue();
    });

    test('returns false when equal', () => {
      expect(new I8(42).gt(42)).toBeFalse();
      expect(new I8(42).gt(new I8(42))).toBeFalse();
      expect(new I16(1000).gt(1000)).toBeFalse();
    });

    test('returns false when less than', () => {
      expect(new I8(10).gt(20)).toBeFalse();
      expect(new I8(10).gt(new I8(20))).toBeFalse();
      expect(new I16(100).gt(200)).toBeFalse();
    });

    test('works with negative numbers', () => {
      expect(new I8(0).gt(-10)).toBeTrue();
      expect(new I8(-5).gt(-10)).toBeTrue();
      expect(new I8(-10).gt(-5)).toBeFalse();
      expect(new I16(0).gt(-1000)).toBeTrue();
    });

    test('works with 64-bit integers', () => {
      expect(new I64(50n).gt(40n)).toBeTrue();
      expect(new I64(10n).gt(20n)).toBeFalse();
      expect(new I64(42n).gt(42n)).toBeFalse();
      expect(new I64(50n).gt(40)).toBeTrue();
    });
  });

  describe('ge', () => {
    test('returns true when greater than', () => {
      expect(new I8(50).ge(40)).toBeTrue();
      expect(new I8(50).ge(new I8(40))).toBeTrue();
      expect(new I16(200).ge(100)).toBeTrue();
    });

    test('returns true when equal', () => {
      expect(new I8(42).ge(42)).toBeTrue();
      expect(new I8(42).ge(new I8(42))).toBeTrue();
      expect(new I16(1000).ge(1000)).toBeTrue();
      expect(new U32(42).ge(42)).toBeTrue();
    });

    test('returns false when less than', () => {
      expect(new I8(10).ge(20)).toBeFalse();
      expect(new I8(10).ge(new I8(20))).toBeFalse();
      expect(new I16(100).ge(200)).toBeFalse();
    });

    test('works with negative numbers', () => {
      expect(new I8(0).ge(-10)).toBeTrue();
      expect(new I8(-10).ge(-10)).toBeTrue();
      expect(new I8(-10).ge(-5)).toBeFalse();
    });

    test('works with 64-bit integers', () => {
      expect(new I64(50n).ge(40n)).toBeTrue();
      expect(new I64(42n).ge(42n)).toBeTrue();
      expect(new I64(10n).ge(20n)).toBeFalse();
      expect(new I64(50n).ge(40)).toBeTrue();
    });
  });
});
