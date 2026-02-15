import { type ObjectLike } from '../object-like.ts';

describe('ObjectLike', () => {
  test('should accept plain objects', () => {
    expectTypeOf({ a: 1, b: 2 }).toExtend<ObjectLike>();
  });

  test('should accept objects with symbol keys', () => {
    const sym = Symbol('x');
    expectTypeOf({ [sym]: 42 }).toExtend<ObjectLike<number, symbol>>();
  });

  test('should accept objects with number keys', () => {
    expectTypeOf({ 1: 'a', 2: 'b' }).toExtend<ObjectLike<string, number>>();
  });

  test('should accept objects with mixed value types if T=unknown', () => {
    expectTypeOf({ a: 1, b: 'x', c: true }).toExtend<ObjectLike>();
  });

  test('should not accept primitives', () => {
    expectTypeOf(42).not.toExtend<ObjectLike>();
    expectTypeOf('foo').not.toExtend<ObjectLike>();
    expectTypeOf(null).not.toExtend<ObjectLike>();
    expectTypeOf(undefined).not.toExtend<ObjectLike>();
  });

  test('should not accept arrays unless explicitly allowed', () => {
    expectTypeOf([1, 2, 3]).not.toExtend<ObjectLike>();
    expectTypeOf([1, 2, 3]).toExtend<ObjectLike<number, number>>();
  });

  test('should accept empty object', () => {
    expectTypeOf({}).toExtend<ObjectLike>();
  });

  test('should allow custom value and key types', () => {
    type MyObj = ObjectLike<boolean, 'foo' | 'bar'>;
    expectTypeOf({ foo: true, bar: false }).toExtend<MyObj>();
    expectTypeOf({ foo: 1, bar: 2 }).not.toExtend<MyObj>();
  });
});
