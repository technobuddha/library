import expect from '../util/expect';
import { compareNumbers } from '../src/compareNumbers';

describe(
    'compareNumbers',
    () => {
        test(
            'should compare strings',
            () => {
                expect(compareNumbers(1, 1)).toBe(0);
                expect(compareNumbers(1, 2)).toBe(-1);
                expect(compareNumbers(2, 1)).toBe(1);
            }
        );

        test(
            'should handle nulls',
            () => {
                expect(compareNumbers(null, null)).toBe(0);
                expect(compareNumbers(null, 1)).toBe(-1);
                expect(compareNumbers(1, null)).toBe(1);
            }
        );
    }
);
