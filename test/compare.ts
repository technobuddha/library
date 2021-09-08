import expect from '@util/expect';
import { compare } from '../src/compare';

describe(
    'compare',
    () => {
        test(
            'should compare strings',
            () => {
                expect(compare('a', 'a')).toBe(0);
                expect(compare('a', 'b')).toBe(-1);
                expect(compare('b', 'a')).toBe(1);
            }
        );

        test(
            'should compare numbers',
            () => {
                expect(compare(0, 0)).toBe(0);
                expect(compare(0, 1)).toBe(-1);
                expect(compare(1, 0)).toBe(1);
            }
        );

        test(
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

        test(
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

        test(
            'should compare undefined',
            () => {
                expect(compare(undefined, undefined)).toBe(0);
                expect(compare(undefined, 0)).toBe(-1);
                expect(compare(0, undefined)).toBe(1);
            }
        );

        test(
            'should compare null',
            () => {
                expect(compare(null, null)).toBe(0);
                expect(compare(null, 0)).toBe(-1);
                expect(compare(0, null)).toBe(1);
            }
        );

        test(
            'should compare NaN',
            () => {
                expect(compare(Number.NaN, Number.NaN)).toBe(0);
                expect(compare(Number.NaN, 0)).toBe(-1);
                expect(compare(0, Number.NaN)).toBe(1);
            }
        );
    }
);
