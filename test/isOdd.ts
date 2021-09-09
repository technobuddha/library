import expect from '#util/expect';
import isOdd      from '../src/isOdd';

describe(
    'isOdd',
    () => {
        test(
            'should handle testing for odd numbers',
            () => {
                expect(isOdd(-3)).toBe(true);
                expect(isOdd(-2)).toBe(false);
                expect(isOdd(-1)).toBe(true);
                expect(isOdd(0)).toBe(false);
                expect(isOdd(1)).toBe(true);
                expect(isOdd(2)).toBe(false);
                expect(isOdd(3)).toBe(true);
                expect(isOdd(Number.NaN)).toBe(false);
                expect(isOdd(Infinity)).toBe(false);
                expect(isOdd(-Infinity)).toBe(false);
            }
        );
    }
);
