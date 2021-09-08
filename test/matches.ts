import expect from '@util/expect';
import matches  from '../src/matches';

describe(
    'matches',
    () => {
        test(
            'should match string',
            () => {
                expect(matches('abc', 'xyz')).toBe(false);
                expect(matches('abc', 'abc')).toBe(true);
            }
        );

        test(
            'should ignore case',
            () => {
                expect(matches('abc', 'ABC')).toBe(true);
            }
        );

        test(
            'should match regexp',
            () => {
                expect(matches('abc', /abc/u)).toBe(true);
            }
        );

        test(
            'should match array',
            () => {
                expect(matches('abc', [ /abc/u, 'xyz' ])).toBe(true);
                expect(matches('abc', [ /xyz/u, 'abc' ])).toBe(true);
                expect(matches('abc', [ /xyz/u, 'xyz' ])).toBe(false);
                expect(matches('abc', [])).toBe(false);
            }
        );
    }
);
