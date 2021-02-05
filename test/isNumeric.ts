import expect from '../util/expect';
import isNumeric                      from '../src/isNumeric';
import { empty, space, negativeZero } from '../src/constants';

describe(
    'isNumeric',
    () => {
        test(
            'should handle numbers',
            () => {
                expect(isNumeric(-1)).toBe(true);
                expect(isNumeric(0)).toBe(true);
                expect(isNumeric(1)).toBe(true);
            }
        );

        test(
            'should handle special numbers',
            () => {
                expect(isNumeric(negativeZero)).toBe(true);
                expect(isNumeric(NaN)).toBe(false);
                expect(isNumeric(Infinity)).toBe(true);
                expect(isNumeric(-Infinity)).toBe(true);
            }
        );

        test(
            'should handle numeric strings',
            () => {
                expect(isNumeric('0')).toBe(true);
                expect(isNumeric('-0')).toBe(true);
                expect(isNumeric('+0')).toBe(true);
                expect(isNumeric('1')).toBe(true);
                expect(isNumeric('-1')).toBe(true);
                expect(isNumeric('+1')).toBe(true);
                expect(isNumeric('1e100')).toBe(true);
                expect(isNumeric('-1e100')).toBe(true);
                expect(isNumeric('+1e100')).toBe(true);
                expect(isNumeric('1e-100')).toBe(true);
                expect(isNumeric('-1e-100')).toBe(true);
                expect(isNumeric('+1e-100')).toBe(true);
                expect(isNumeric('1e+100')).toBe(true);
                expect(isNumeric('-1e+100')).toBe(true);
                expect(isNumeric('+1e+100')).toBe(true);
                expect(isNumeric('Infinity')).toBe(true);
                expect(isNumeric('-Infinity')).toBe(true);
                expect(isNumeric('+Infinity')).toBe(true);
                expect(isNumeric('NaN')).toBe(false);
            }
        );

        test(
            'should handle non-numbers',
            () => {
                expect(isNumeric(empty)).toBe(false);
                expect(isNumeric(space)).toBe(false);
                expect(isNumeric('abcdef')).toBe(false);
                expect(isNumeric(null)).toBe(false);
                expect(isNumeric(undefined)).toBe(false);
                expect(isNumeric([])).toBe(false);
                expect(isNumeric({})).toBe(false);
            }
        );
    }
);
