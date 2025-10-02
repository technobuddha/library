// Unit tests for sameType

import { sameType } from '../same-type.ts';

function f1(): void {
  /* empty for test */
}
function f2(): void {
  /* empty for test */
}
function f3(): void {
  /* empty for test */
}
function f4(): void {
  /* empty for test */
}

describe('sameType', () => {
  test('returns true for same primitive types', () => {
    expect(sameType(1, 2)).toBeTrue();
    expect(sameType('a', 'b')).toBeTrue();
    expect(sameType(true, false)).toBeTrue();
    expect(sameType(undefined, undefined)).toBeTrue();
    expect(sameType(null, null)).toBeTrue();
    expect(sameType(Symbol('a'), Symbol('b'))).toBeTrue();
    expect(sameType(123n, 456n)).toBeTrue();
  });

  test('returns false for different primitive types', () => {
    expect(sameType(1, '1')).toBeFalse();
    expect(sameType(true, 1)).toBeFalse();
    expect(sameType(undefined, null)).toBeFalse();
    expect(sameType(1, undefined)).toBeFalse();
    expect(sameType('a', false)).toBeFalse();
    expect(sameType(Symbol('a'), 1)).toBeFalse();
    expect(sameType(123n, 1)).toBeFalse();
  });

  test('returns true for same array types', () => {
    expect(sameType([], [])).toBeTrue();
    expect(sameType([1, 2], ['a', 'b'])).toBeTrue();
  });

  test('arrays and objects are the same type', () => {
    expect(sameType([], {})).toBeTrue();
    expect(sameType({}, [])).toBeTrue();
  });

  test('returns true for same object types', () => {
    expect(sameType({}, {})).toBeTrue();
    expect(sameType({ a: 1 }, { b: 2 })).toBeTrue();
  });

  test('returns false for object and function', () => {
    expect(sameType({}, () => {})).toBeFalse();
    expect(sameType(() => {}, {})).toBeFalse();
  });

  test('returns true for same function types', () => {
    expect(sameType(f1, f2)).toBeTrue();
    expect(sameType(f3, f4)).toBeTrue();
  });

  test('returns true for same class instances', () => {
    class A {}
    class B {}
    const a1 = new A();
    const a2 = new A();
    const b1 = new B();
    expect(sameType(a1, a2)).toBeTrue();
    expect(sameType(b1, new B())).toBeTrue();
  });

  test('different class instances are the same type', () => {
    class A {}
    class B {}
    const a = new A();
    const b = new B();
    expect(sameType(a, b)).toBeTrue();
  });

  test('returns true for same Date instances', () => {
    expect(sameType(new Date(), new Date())).toBeTrue();
  });

  test('Date and object are the same type', () => {
    expect(sameType(new Date(), {})).toBeTrue();
  });

  test('returns true for same RegExp instances', () => {
    expect(sameType(/a/v, /b/v)).toBeTrue();
  });

  test('returns false for RegExp and string', () => {
    expect(sameType(/a/v, 'a')).toBeFalse();
  });

  test('returns true for same Map and Set types', () => {
    expect(sameType(new Map(), new Map())).toBeTrue();
    expect(sameType(new Set(), new Set())).toBeTrue();
  });

  test('Map and Set are the same type', () => {
    expect(sameType(new Map(), new Set())).toBeTrue();
  });

  test('returns false for null and object', () => {
    expect(sameType(null, {})).toBeFalse();
    expect(sameType({}, null)).toBeFalse();
  });

  test('returns false for undefined and object', () => {
    expect(sameType(undefined, {})).toBeFalse();
    expect(sameType({}, undefined)).toBeFalse();
  });

  test('returns true for same typed arrays', () => {
    expect(sameType(new Uint8Array(), new Uint8Array())).toBeTrue();
    expect(sameType(new Float32Array(), new Float32Array())).toBeTrue();
  });

  test('different typed arrays are the same type', () => {
    expect(sameType(new Uint8Array(), new Float32Array())).toBeTrue();
  });

  test('returns false for primitive and object', () => {
    expect(sameType(1, {})).toBeFalse();
    expect(sameType('a', [])).toBeFalse();
    expect(sameType(true, () => {})).toBeFalse();
  });
});
