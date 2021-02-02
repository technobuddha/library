import expect from '../util/expect';
import toPrimitive      from '../src/toPrimitive';
import { empty, space } from '../src/constants';

describe(
    'toPrimitive',
    () => {
        it(
            'should convert strings',
            () => {
                expect(toPrimitive(empty)).toBe(empty);
                expect(toPrimitive(space)).toBe(space);
                expect(toPrimitive('jabberwocky')).toBe('jabberwocky');
                expect(toPrimitive('0')).toBe('0');
            }
        );

        it(
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

        it(
            'should handle booleans',
            () => {
                expect(toPrimitive(true)).toBe(true);
                expect(toPrimitive(false)).toBe(false);
            }
        );

        it(
            'should handle null and undefined',
            () => {
                expect(toPrimitive(null)).toBe(null);
                expect(toPrimitive(undefined)).toBeUndefined();
            }
        );

        it(
            'should handle symbols',
            () => {
                expect(toPrimitive(Symbol.toPrimitive)).toBe(Symbol.toPrimitive);
            }
        );

        it(
            'should handle objects and arrays',
            () => {
                expect(toPrimitive([])).toEqual([]);
                expect(toPrimitive([ 1, 2, 3 ])).toEqual([ 1, 2, 3 ]);
                expect(toPrimitive({})).toEqual({});
            }
        );

        it(
            'should handle hint of string',
            () => {
                expect(toPrimitive(undefined,          'string')).toBeUndefined();
                expect(toPrimitive(null,               'string')).toBe(null);
                expect(toPrimitive('123',              'string')).toBe('123');
                expect(toPrimitive(123,                'string')).toBe('123');
                expect(toPrimitive(false,              'string')).toBe('false');
                expect(toPrimitive(Symbol.toPrimitive, 'string')).toBe(Symbol.toPrimitive);
                expect(toPrimitive([ 1, 2, 3 ],            'string')).toBe('1,2,3');
            }
        );

        it(
            'should handle hint of number',
            () => {
                expect(toPrimitive(undefined,          'number')).toBeUndefined();
                expect(toPrimitive(null,               'number')).toBe(null);
                expect(toPrimitive('123',              'number')).toBe('123');
                expect(toPrimitive(123,                'number')).toBe(123);
                expect(toPrimitive(false,              'number')).toBe(false);
                expect(toPrimitive(Symbol.toPrimitive, 'number')).toBe(Symbol.toPrimitive);
                expect(toPrimitive([ 1, 2, 3 ],            'number')).toEqual([ 1, 2, 3 ]);
            }
        );

        it(
            'should handle hint of default',
            () => {
                expect(toPrimitive(undefined,          'default')).toBeUndefined();
                expect(toPrimitive(null,               'default')).toBe(null);
                expect(toPrimitive('123',              'default')).toBe('123');
                expect(toPrimitive(123,                'default')).toBe(123);
                expect(toPrimitive(false,              'default')).toBe(false);
                expect(toPrimitive(Symbol.toPrimitive, 'default')).toBe(Symbol.toPrimitive);
                expect(toPrimitive([ 1, 2, 3 ],            'default')).toEqual([ 1, 2, 3 ]);
            }
        );
    }
);
