import expect from '../util/expect';
import ceil       from '../src/ceil';

describe(
    'safeCeil',
    () => {
        it(
            'should handle positive numbers',
            () => {
                expect(ceil(1 + Number.EPSILON)).toBe(1);
                expect(ceil(2 + Number.EPSILON)).toBe(2);
                expect(ceil(3 + Number.EPSILON)).toBe(3);
            }
        );

        it(
            'should handle negative numbers',
            () => {
                expect(ceil(-1 + Number.EPSILON)).toBe(-1);
                expect(ceil(-2 + Number.EPSILON)).toBe(-2);
                expect(ceil(-3 + Number.EPSILON)).toBe(-3);
            }
        );

        it(
            'should handle tolerance',
            () => {
                expect(ceil(6.1, { tolerance: 0.1 })).toBe(6);
                expect(ceil(-6.1, { tolerance: 0.1 })).toBe(-6);
            }
        );

        it(
            'should handle precision',
            () => {
                expect(ceil(6.01 + Number.EPSILON, { precision: 2 })).toBe(6.01);
                expect(ceil(6100 + Number.EPSILON, { precision: -2 })).toBe(6100);
                expect(ceil(-6.01 + Number.EPSILON, { precision: 2 })).toBe(-6.01);
                expect(ceil(-6100 + Number.EPSILON, { precision: -2 })).toBe(-6100);
            }
        );
    }
);
