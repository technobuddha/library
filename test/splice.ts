import expect from '../util/expect';
import splice     from '../src/splice';

describe(
    'splice',
    () => {
        test(
            'should splice substrings',
            () => {
                expect(splice('abcdefghi', 0, 0, 'foo')).toBe('fooabcdefghi');
                expect(splice('abcdefghi', 3, 0, 'foo')).toBe('abcfoodefghi');
                expect(splice('abcdefghi', 3, 3, 'foo')).toBe('abcfooghi');
            }
        );

        test(
            'should handle negative start',
            () => {
                expect(splice('abcdefghi', -1, 0, 'foo')).toBe('abcdefghifoo');
                expect(splice('abcdefghi', -2, 0, 'foo')).toBe('abcdefghfooi');
                expect(splice('abcdefghi', -100, 0, 'foo')).toBe('fooabcdefghi');
            }
        );

        test(
            'should handle negative deleteLength',
            () => {
                expect(splice('abcdefghi', 3, -3, 'foo')).toBe('abcfoodefghi');
            }
        );

        test(
            'should handle start greater than length',
            () => {
                expect(splice('abcdefghi', 99, 0, 'foo')).toBe('abcdefghifoo');
            }
        );
    }
);
