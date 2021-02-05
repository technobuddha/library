import expect from '../util/expect';
import coordinate from '../src/coordinate';

describe(
    'coordinate',
    () => {
        test(
            'should handle basic functionality',
            () => {
                expect(coordinate([])).toBe('');
                expect(coordinate([ 'a' ])).toBe('a');
                expect(coordinate([ 'a', 'b' ])).toBe('a and b');
                expect(coordinate([ 'a', 'b', 'c' ])).toBe('a, b, and c');
                expect(coordinate([ 'a', 'b', 'c', 'd', 'e', 'f' ])).toBe('a, b, c, d, e, and f');
            }
        );

        test(
            'should handle oxford commas',
            () => {
                expect(coordinate([], { oxford: false })).toBe('');
                expect(coordinate([ 'a' ], { oxford: false })).toBe('a');
                expect(coordinate([ 'a', 'b' ], { oxford: false })).toBe('a and b');
                expect(coordinate([ 'a', 'b', 'c' ], { oxford: false })).toBe('a, b and c');
                expect(coordinate([ 'a', 'b', 'c', 'd', 'e', 'f' ], { oxford: false })).toBe('a, b, c, d, e and f');
            }
        );

        test(
            'should handle conjunctions',
            () => {
                expect(coordinate([], { conjunction: 'or' })).toBe('');
                expect(coordinate([ 'a' ], { conjunction: 'or' })).toBe('a');
                expect(coordinate([ 'a', 'b' ], { conjunction: 'or' })).toBe('a or b');
                expect(coordinate([ 'a', 'b', 'c' ], { conjunction: 'or' })).toBe('a, b, or c');
                expect(coordinate([ 'a', 'b', 'c', 'd', 'e', 'f' ], { conjunction: 'or' })).toBe('a, b, c, d, e, or f');
            }
        );

        test(
            'should handle separators',
            () => {
                expect(coordinate([], { separator: ';' })).toBe('');
                expect(coordinate([ 'a' ], { separator: ';' })).toBe('a');
                expect(coordinate([ 'a', 'b' ], { separator: ';' })).toBe('a and b');
                expect(coordinate([ 'a', 'b', 'c' ], { separator: ';' })).toBe('a; b; and c');
                expect(coordinate([ 'a', 'b', 'c', 'd', 'e', 'f' ], { separator: ';' })).toBe('a; b; c; d; e; and f');
            }
        );
    }
);
