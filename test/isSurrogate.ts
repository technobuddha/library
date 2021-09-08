import expect from '@util/expect';
import isSurrogate from '../src/isSurrogate';

describe(
    'isSurrogate',
    () => {
        test(
            'should detect surrogates',
            () => {
                expect(isSurrogate('a')).toBe(false);
                expect(isSurrogate('\uD800')).toBe(true);
                expect(isSurrogate('\uDC00')).toBe(true);
            }
        );

        test(
            'should detect high and low',
            () => {
                expect(isSurrogate('\uD800', { high: false })).toBe(false);
                expect(isSurrogate('\uDC00', { high: false })).toBe(true);
                expect(isSurrogate('\uD800', { low: false })).toBe(true);
                expect(isSurrogate('\uDC00', { low: false })).toBe(false);
            }
        );
    }
);
