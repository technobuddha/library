import expect from '@util/expect';
import build      from '../src/build';

describe(
    'build',
    () => {
        test(
            'should build strings',
            () => {
                expect(build()).toBe('');
                expect(build('a')).toBe('a');
                expect(build('a', 'b', 'c')).toBe('abc');
                expect(build([ 'a', 'b', 'c' ])).toBe('abc');
                expect(build(() => 'a')).toBe('a');
                expect(build('a', [ 'b', 'c' ], 'd')).toBe('abcd');
                expect(build(() => 'a', () => [ 'b', 'c' ], [ 'd', 'e' ], 'f')).toBe('abcdef');
            }
        );

        test(
            'should handle generators',
            () => {
                function *gen(): Generator<string> {
                    yield '1';
                    yield '2';
                    yield '3';
                }
                expect(build(gen())).toBe('123');
            }
        );
    }
);
