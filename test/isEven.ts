import expect from '../util/expect';
import isEven           from '../src/isEven';
import { negativeZero } from '../src/constants';

describe(
    'isEven',
    () => {
        it(
            'should work with numbers',
            () => {
                expect(isEven(-3)).toBe(false);
                expect(isEven(-2)).toBe(true);
                expect(isEven(-1)).toBe(false);
                expect(isEven(0)).toBe(true);
                expect(isEven(1)).toBe(false);
                expect(isEven(2)).toBe(true);
                expect(isEven(3)).toBe(false);
                expect(isEven(negativeZero)).toBe(true);
                expect(isEven(NaN)).toBe(false);
                expect(isEven(Infinity)).toBe(false);
                expect(isEven(-Infinity)).toBe(false);
            }
        );

        it(
            'should work with special numbers',
            () => {
                expect(isEven(negativeZero)).toBe(true);
                expect(isEven(NaN)).toBe(false);
                expect(isEven(Infinity)).toBe(false);
                expect(isEven(-Infinity)).toBe(false);
            }
        );
    }
);
