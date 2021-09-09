import expect from '#util/expect';
import splitWords from '../src/splitWords';
import { empty }  from '../src/constants';

describe(
    'splitWords',
    () => {
        test(
            'should split on whitespace',
            () => {
                expect(splitWords(empty)).toEqual([]);
                expect(splitWords('a b c d')).toEqual([ 'a', 'b', 'c', 'd' ]);
                expect(splitWords('a\tb\tc\td')).toEqual([ 'a', 'b', 'c', 'd' ]);
                expect(splitWords('a\rb\rc\rd')).toEqual([ 'a', 'b', 'c', 'd' ]);
                expect(splitWords('a    b    c    d')).toEqual([ 'a', 'b', 'c', 'd' ]);
                expect(splitWords('a\r\nb\r\nc\r\nd')).toEqual([ 'a', 'b', 'c', 'd' ]);
            }
        );

        test(
            'should ignore leading and trailing whitespace',
            () => {
                expect(splitWords('  a   b   c   d  ')).toEqual([ 'a', 'b', 'c', 'd' ]);
            }
        );

        test(
            'should accept alternate delimiters',
            () => {
                expect(splitWords('*a*b*c*d*', { delimiter: '*' })).toEqual([ 'a', 'b', 'c', 'd' ]);
                expect(splitWords('@a#b@c#', { delimiter: /@|#/u })).toEqual([ 'a', 'b', 'c' ]);
            }
        );
    }
);
