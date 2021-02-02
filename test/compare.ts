import expect from '../util/expect';
import { compare } from '../src/compare';

describe(
    'compare',
    () => {
        it(
            'should compare strings',
            () => {
                expect(compare('a', 'a')).toBe(0);
                expect(compare('a', 'b')).toBe(-1);
                expect(compare('b', 'a')).toBe(1);
            }
        );

        it(
            'should compare numbers',
            () => {
                expect(compare(0, 0)).toBe(0);
                expect(compare(0, 1)).toBe(-1);
                expect(compare(1, 0)).toBe(1);
            }
        );

        it(
            'should coerce boolean to number',
            () => {
                expect(compare(false, false)).toBe(0);
                expect(compare(false, true)).toBe(-1);
                expect(compare(true, false)).toBe(1);

                expect(compare(false, 0)).toBe(0);
                expect(compare(0, true)).toBe(-1);
                expect(compare(true, 0)).toBe(1);
            }
        );

        it(
            'should coerce object to number',
            () => {
                expect(compare(new Date(1900, 1, 0), new Date(1900, 1, 0))).toBe(0);
                expect(compare(new Date(1900, 1, 0), new Date(1999, 1, 0))).toBe(-1);
                expect(compare(new Date(1999, 1, 0), new Date(1900, 1, 0))).toBe(1);

                expect(compare(new Date(1900, 1, 0), -2206378800000)).toBe(0);
                expect(compare(-2206378800000, new Date(1999, 1, 0))).toBe(-1);
                expect(compare(new Date(1999, 1, 0), -2206378800000)).toBe(1);
            }
        );
    }
);
