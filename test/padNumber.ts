import expect from '../util/expect';
import padNumber        from '../src/padNumber';
import { negativeZero } from '../src/constants';

describe(
    'padNumber',
    () => {
        test(
            'should handle positive numbers',
            () => {
                expect(padNumber(0)).toBe('00');
                expect(padNumber(1)).toBe('01');
                expect(padNumber(10)).toBe('10');
                expect(padNumber(100)).toBe('100');
            }
        );

        test(
            'should handle negative numbers',
            () => {
                expect(padNumber(-0)).toBe('00');
                expect(padNumber(-1)).toBe('-1');
                expect(padNumber(-10)).toBe('-10');
                expect(padNumber(-100)).toBe('-100');
            }
        );

        test(
            'should handle different lengths',
            () => {
                expect(padNumber(0, 10)).toBe('0000000000');
                expect(padNumber(1, 10)).toBe('0000000001');
                expect(padNumber(10, 10)).toBe('0000000010');
                expect(padNumber(100, 10)).toBe('0000000100');
                expect(padNumber(-0, 10)).toBe('0000000000');
                expect(padNumber(-1, 10)).toBe('-000000001');
                expect(padNumber(-10, 10)).toBe('-000000010');
                expect(padNumber(-100, 10)).toBe('-000000100');
            }
        );

        test(
            'should handle special numbers',
            () => {
                expect(padNumber(negativeZero)).toBe('00');
                expect(padNumber(NaN)).toBe('NaN');
                expect(padNumber(Infinity)).toBe('Infinity');
                expect(padNumber(-Infinity)).toBe('-Infinity');

                expect(padNumber(negativeZero, 10)).toBe('0000000000');
                expect(padNumber(NaN, 10)).toBe('       NaN');
                expect(padNumber(Infinity, 10)).toBe('  Infinity');
                expect(padNumber(-Infinity, 10)).toBe(' -Infinity');
            }
        );
    }
);
