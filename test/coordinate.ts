import 'mocha';
import { expect } from 'chai';
import coordinate from '../src/coordinate';

describe(
    'coordinate',
    () => {
        it(
            'should handle basic functionality',
            () => {
                expect(coordinate([])).to.equal('');
                expect(coordinate([ 'a' ])).to.equal('a');
                expect(coordinate([ 'a', 'b' ])).to.equal('a and b');
                expect(coordinate([ 'a', 'b', 'c' ])).to.equal('a, b, and c');
                expect(coordinate([ 'a', 'b', 'c', 'd', 'e', 'f' ])).to.equal('a, b, c, d, e, and f');
            }
        );

        it(
            'should handle oxford commas',
            () => {
                expect(coordinate([], { oxford: false })).to.equal('');
                expect(coordinate([ 'a' ], { oxford: false })).to.equal('a');
                expect(coordinate([ 'a', 'b' ], { oxford: false })).to.equal('a and b');
                expect(coordinate([ 'a', 'b', 'c' ], { oxford: false })).to.equal('a, b and c');
                expect(coordinate([ 'a', 'b', 'c', 'd', 'e', 'f' ], { oxford: false })).to.equal('a, b, c, d, e and f');
            }
        );

        it(
            'should handle conjunctions',
            () => {
                expect(coordinate([], { conjunction: 'or' })).to.equal('');
                expect(coordinate([ 'a' ], { conjunction: 'or' })).to.equal('a');
                expect(coordinate([ 'a', 'b' ], { conjunction: 'or' })).to.equal('a or b');
                expect(coordinate([ 'a', 'b', 'c' ], { conjunction: 'or' })).to.equal('a, b, or c');
                expect(coordinate([ 'a', 'b', 'c', 'd', 'e', 'f' ], { conjunction: 'or' })).to.equal('a, b, c, d, e, or f');
            }
        );

        it(
            'should handle separators',
            () => {
                expect(coordinate([], { separator: ';' })).to.equal('');
                expect(coordinate([ 'a' ], { separator: ';' })).to.equal('a');
                expect(coordinate([ 'a', 'b' ], { separator: ';' })).to.equal('a and b');
                expect(coordinate([ 'a', 'b', 'c' ], { separator: ';' })).to.equal('a; b; and c');
                expect(coordinate([ 'a', 'b', 'c', 'd', 'e', 'f' ], { separator: ';' })).to.equal('a; b; c; d; e; and f');
            }
        );
    }
);
