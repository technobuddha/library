import expect           from '../util/expect';
import toPrimitive      from '../src/toPrimitive';
import { empty, space } from '../src/constants';

describe(
    'toPrimitive',
    () => {
        test(
            'should convert strings',
            () => {
                expect(toPrimitive(empty)).toBe(empty);
                expect(toPrimitive(space)).toBe(space);
                expect(toPrimitive('jabberwocky')).toBe('jabberwocky');
                expect(toPrimitive('0')).toBe('0');
            }
        );

        test(
            'should handle numbers',
            () => {
                expect(toPrimitive(0)).toBe(0);
                expect(toPrimitive(-0)).toBe(-0);
                expect(toPrimitive(1)).toBe(1);
                expect(toPrimitive(Infinity)).toBe(Infinity);
                expect(toPrimitive(-Infinity)).toBe(-Infinity);
                expect(isNaN(toPrimitive(NaN))).toBe(true);
            }
        );

        test(
            'should handle booleans',
            () => {
                expect(toPrimitive(true)).toBe(true);
                expect(toPrimitive(false)).toBe(false);
            }
        );

        test(
            'should handle null and undefined',
            () => {
                expect(toPrimitive(null)).toBe(null);
                expect(toPrimitive(undefined)).toBeUndefined();
            }
        );

        test(
            'should handle symbols',
            () => {
                expect(toPrimitive(Symbol.toPrimitive)).toBe(Symbol.toPrimitive);
            }
        );

        test(
            'should handle bigint',
            () => {
                expect(toPrimitive(100n)).toBe(100n);
            }
        );

        test(
            'should not be abe to convert null prototype',
            () => {
                const obj = Object.create(null);
                expect(() => toPrimitive(obj)).toThrow('Cannot convert object to a primitive value');
                expect(() => toPrimitive(obj, 'string')).toThrow('Cannot convert object to a primitive value');
                expect(() => toPrimitive(obj, 'number')).toThrow('Cannot convert object to a primitive value');
            }
        );

        test(
            'should use toValue method',
            () => {
                const obj = Object.create(null);
                obj.valueOf  = () => 'valueOf';
                expect(toPrimitive(obj)).toBe('valueOf');
                expect(toPrimitive(obj, 'string')).toBe('valueOf');
                expect(toPrimitive(obj, 'number')).toBe('valueOf');
            }
        );

        test(
            'should use toString method',
            () => {
                const obj = Object.create(null);
                obj.toString = () => 'toString';
                expect(toPrimitive(obj)).toBe('toString');
                expect(toPrimitive(obj, 'string')).toBe('toString');
                expect(toPrimitive(obj, 'number')).toBe('toString');
            }
        );

        test(
            'should use preferred method',
            () => {
                const obj = Object.create(null);
                obj.valueOf  = () => 'valueOf';
                obj.toString = () => 'toString';

                expect(toPrimitive(obj)).toBe('valueOf');
                expect(toPrimitive(obj, 'string')).toBe('toString');
                expect(toPrimitive(obj, 'number')).toBe('valueOf');
            }
        );

        test(
            'should use always prefer toPrimitive symbol',
            () => {
                const obj = Object.create(null);
                obj.valueOf  = () => 'valueOf';
                obj.toString = () => 'toString';
                obj[Symbol.toPrimitive] = (hint: string) => hint;

                expect(toPrimitive(obj)).toBe('default');
                expect(toPrimitive(obj, 'string')).toBe('string');
                expect(toPrimitive(obj, 'number')).toBe('number');
            }
        );

        test(
            'should handle objects and arrays',
            () => {
                expect(toPrimitive([])).toEqual([]);
                expect(toPrimitive([ 1, 2, 3 ])).toEqual([ 1, 2, 3 ]);
                expect(toPrimitive({})).toEqual({});
            }
        );

        test(
            'should handle hint of string',
            () => {
                expect(toPrimitive(undefined,          'string')).toBeUndefined();
                expect(toPrimitive(null,               'string')).toBe(null);
                expect(toPrimitive('123',              'string')).toBe('123');
                expect(toPrimitive(123,                'string')).toBe('123');
                expect(toPrimitive(false,              'string')).toBe('false');
                expect(toPrimitive(Symbol.toPrimitive, 'string')).toBe(Symbol.toPrimitive);
                expect(toPrimitive([ 1, 2, 3 ],        'string')).toBe('1,2,3');
            }
        );

        test(
            'should handle hint of number',
            () => {
                expect(toPrimitive(undefined,          'number')).toBeUndefined();
                expect(toPrimitive(null,               'number')).toBe(null);
                expect(toPrimitive('123',              'number')).toBe('123');
                expect(toPrimitive(123,                'number')).toBe(123);
                expect(toPrimitive(false,              'number')).toBe(false);
                expect(toPrimitive(Symbol.toPrimitive, 'number')).toBe(Symbol.toPrimitive);
                expect(toPrimitive([ 1, 2, 3 ],        'number')).toEqual([ 1, 2, 3 ]);
            }
        );

        test(
            'should handle hint of default',
            () => {
                expect(toPrimitive(undefined,          'default')).toBeUndefined();
                expect(toPrimitive(null,               'default')).toBe(null);
                expect(toPrimitive('123',              'default')).toBe('123');
                expect(toPrimitive(123,                'default')).toBe(123);
                expect(toPrimitive(false,              'default')).toBe(false);
                expect(toPrimitive(Symbol.toPrimitive, 'default')).toBe(Symbol.toPrimitive);
                expect(toPrimitive([ 1, 2, 3 ],        'default')).toEqual([ 1, 2, 3 ]);
            }
        );
    }
);
