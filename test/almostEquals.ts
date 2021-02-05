import expect from '../util/expect';
import almostEquals from '../src/almostEquals';

describe(
    'almostEquals',
    () => {
        test(
            'should handle numbers within EPSILON distance',
            () => {
                expect(almostEquals(1, 1 + Number(Number.EPSILON))).toBe(true);
                expect(almostEquals(1, 1 - Number(Number.EPSILON))).toBe(true);
                expect(almostEquals(1, 1 + Number.EPSILON * 2)).toBe(false);
                expect(almostEquals(1, 1 - Number.EPSILON * 2)).toBe(false);
            }
        );

        test(
            'should allow specification of tolerance',
            () => {
                expect(almostEquals(1, 1.001, { tolerance: 0.001 })).toBe(true);
                expect(almostEquals(1, 0.999, { tolerance: 0.001 })).toBe(true);
                expect(almostEquals(1, 1.002, { tolerance: 0.001 })).toBe(false);
                expect(almostEquals(1, 0.998, { tolerance: 0.001 })).toBe(false);
            }
        );
    }
);
