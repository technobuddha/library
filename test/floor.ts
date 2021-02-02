import expect from '../util/expect';
import floor  from '../src/floor';

describe(
    'floor',
    () => {
        it(
            'should handle positive numbers',
            () => {
                expect(floor(1 - Number.EPSILON)).toBe(1);
                expect(floor(2 - Number.EPSILON)).toBe(2);
                expect(floor(3 - Number.EPSILON)).toBe(3);
            }
        );

        it(
            'should handle negative numbers',
            () => {
                expect(floor(-1 - Number.EPSILON)).toBe(-1);
                expect(floor(-2 - Number.EPSILON)).toBe(-2);
                expect(floor(-3 - Number.EPSILON)).toBe(-3);
            }
        );

        it(
            'should handle tolerance',
            () => {
                expect(floor(5.9, { tolerance: 0.1 })).toBe(6);
                expect(floor(-5.9, { tolerance: 0.1 })).toBe(-6);
            }
        );

        it(
            'should handle precision',
            () => {
                expect(floor(6.01 - Number.EPSILON, { precision:  2 })).toBe(6.01);
                expect(floor(6100 - Number.EPSILON, { precision: -2 })).toBe(6100);
                expect(floor(-6.01 - Number.EPSILON, { precision:  2 })).toBe(-6.01);
                expect(floor(-6100 - Number.EPSILON, { precision: -2 })).toBe(-6100);
            }
        );
    }
);
