import 'mocha';
import { expect } from 'chai';
import splitWords from '../src/splitWords';
import { empty }  from '../src/constants';

describe(
    'splitWords',
    () => {
        it(
            'should split on whitespace',
            () => {
                expect(splitWords(empty)).to.deep.equal([]);
                expect(splitWords('a b c d')).to.deep.equal([ 'a', 'b', 'c', 'd' ]);
                expect(splitWords('a\tb\tc\td')).to.deep.equal([ 'a', 'b', 'c', 'd' ]);
                expect(splitWords('a\rb\rc\rd')).to.deep.equal([ 'a', 'b', 'c', 'd' ]);
                expect(splitWords('a    b    c    d')).to.deep.equal([ 'a', 'b', 'c', 'd' ]);
                expect(splitWords('a\r\nb\r\nc\r\nd')).to.deep.equal([ 'a', 'b', 'c', 'd' ]);
            }
        );

        it(
            'should ignore leading and trailing whitespace',
            () => {
                expect(splitWords('  a   b   c   d  ')).to.deep.equal([ 'a', 'b', 'c', 'd' ]);
            }
        );

        it(
            'should accept alternate delimiters',
            () => {
                expect(splitWords('*a*b*c*d*', { delimiter: '*' })).to.deep.equal([ 'a', 'b', 'c', 'd' ]);
                expect(splitWords('@a#b@c#', { delimiter: /@|#/u })).to.deep.equal([ 'a', 'b', 'c' ]);
            }
        );
    }
);
