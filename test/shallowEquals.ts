import expect from '@util/expect';
import shallowEquals from '../src/shallowEquals';

describe(
    'shallowEquals',
    () => {
        test(
            'computes checksum & build table',
            () => {
                expect(shallowEquals({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3 })).toBe(true);
            }
        );

        test(
            'null == null && undefined == undefined',
            () => {
                expect(shallowEquals(null, null)).toBe(true);
                expect(shallowEquals(undefined, undefined)).toBe(true);
                expect(shallowEquals(undefined, null)).toBe(false);
                expect(shallowEquals(null, undefined)).toBe(false);
            }
        );

        test(
            'object == self',
            () => {
                const obj = {};
                expect(shallowEquals(obj, obj)).toBe(true);
            }
        );

        test(
            'object != null / undefined',
            () => {
                const obj = {};
                expect(shallowEquals(obj, null)).toBe(false);
                expect(shallowEquals(obj, null)).toBe(false);
            }
        );

        test(
            'diff #keys is unequal',
            () => {
                expect(shallowEquals({ a: 1 }, { a: 1, b: 2 })).toBe(false);
            }
        );

        test(
            'value comparison is by reference',
            () => {
                const a = { z: 1 };
                const b = { z: 1 };
                expect(shallowEquals({ q: a }, { q: b })).toBe(false);
            }
        );

        test(
            'NaN == NaN',
            () => {
                expect(shallowEquals({ q: Number.NaN }, { q: Number.NaN })).toBe(true);
            }
        );

        test(
            '-0 != 0',
            () => {
                expect(shallowEquals({ q: 0 }, { q: -0 })).toBe(false);
            }
        );
    }
);
