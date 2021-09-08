import expect from '@util/expect';
import isMultipleOf     from '../src/isMultipleOf';
import { negativeZero } from '../src/constants';

describe(
    'isMultipleOf',
    () => {
        test(
            'should work with numbers',
            () => {
                expect(isMultipleOf(-6, 3)).toBe(true);
                expect(isMultipleOf(-3, 3)).toBe(true);
                expect(isMultipleOf(0, 3)).toBe(true);
                expect(isMultipleOf(3, 3)).toBe(true);
                expect(isMultipleOf(6, 3)).toBe(true);

                expect(isMultipleOf(-6, 2)).toBe(true);
                expect(isMultipleOf(-3, 2)).toBe(false);
                expect(isMultipleOf(0, 2)).toBe(true);
                expect(isMultipleOf(3, 2)).toBe(false);
                expect(isMultipleOf(6, 2)).toBe(true);

                expect(isMultipleOf(-6, -3)).toBe(true);
                expect(isMultipleOf(-3, -3)).toBe(true);
                expect(isMultipleOf(0, -3)).toBe(true);
                expect(isMultipleOf(3, -3)).toBe(true);
                expect(isMultipleOf(6, -3)).toBe(true);

                expect(isMultipleOf(-6, -2)).toBe(true);
                expect(isMultipleOf(-3, -2)).toBe(false);
                expect(isMultipleOf(0, -2)).toBe(true);
                expect(isMultipleOf(3, -2)).toBe(false);
                expect(isMultipleOf(6, -2)).toBe(true);

                expect(isMultipleOf(-6, 0)).toBe(false);
                expect(isMultipleOf(-3, 0)).toBe(false);
                expect(isMultipleOf(0, 0)).toBe(true);
                expect(isMultipleOf(3, 0)).toBe(false);
                expect(isMultipleOf(6, 0)).toBe(false);
            }
        );

        test(
            'should work with special numbers',
            () => {
                expect(isMultipleOf(negativeZero, 1)).toBe(true);
                expect(isMultipleOf(1, negativeZero)).toBe(false);
                expect(isMultipleOf(negativeZero, negativeZero)).toBe(true);
                expect(isMultipleOf(Number.NaN, 1)).toBe(false);
                expect(isMultipleOf(1, Number.NaN)).toBe(false);
                expect(isMultipleOf(Number.NaN, Number.NaN)).toBe(false);
                expect(isMultipleOf(Infinity, 1)).toBe(false);
                expect(isMultipleOf(1, Infinity)).toBe(false);
                expect(isMultipleOf(Infinity, Infinity)).toBe(false);
                expect(isMultipleOf(-Infinity, 1)).toBe(false);
                expect(isMultipleOf(1, -Infinity)).toBe(false);
                expect(isMultipleOf(-Infinity, -Infinity)).toBe(false);
            }
        );
    }
);
