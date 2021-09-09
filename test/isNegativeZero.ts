import expect from '#util/expect';
import isNegativeZero   from '../src/isNegativeZero';
import { negativeZero } from '../src/constants';

describe(
    'isNegativeZero',
    () => {
        test(
            'should handle testing for negative zero',
            () => {
                expect(isNegativeZero(-3)).toBe(false);
                expect(isNegativeZero(-2)).toBe(false);
                expect(isNegativeZero(-1)).toBe(false);
                expect(isNegativeZero(negativeZero)).toBe(true);
                expect(isNegativeZero(0)).toBe(false);
                expect(isNegativeZero(1)).toBe(false);
                expect(isNegativeZero(2)).toBe(false);
                expect(isNegativeZero(3)).toBe(false);
                expect(isNegativeZero(Number.MAX_VALUE)).toBe(false);
                expect(isNegativeZero(Number.MIN_VALUE)).toBe(false);
                expect(isNegativeZero(Number.NaN)).toBe(false);
                expect(isNegativeZero(Infinity)).toBe(false);
                expect(isNegativeZero(-Infinity)).toBe(false);
            }
        );
    }
);
