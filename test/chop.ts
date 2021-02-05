import expect from '../util/expect';
import chop       from '../src/chop';

describe(
    'chop',
    () => {
        test(
            'should chop string in to blocks',
            () => {
                expect(chop('abc', 1)).toEqual([ 'a', 'b', 'c' ]);
                expect(chop('abc', 2)).toEqual([ 'ab', 'c' ]);
            }
        );

        test(
            'should handle lengths <= 0',
            () => {
                expect(chop('abc', 0)).toEqual([ 'abc' ]);
                expect(chop('abc', -1)).toEqual([ 'abc' ]);
            }
        );

        test(
            'should respect the truncate option',
            () => {
                expect(chop('abcdefg', 2)).toEqual([ 'ab', 'cd', 'ef', 'g' ]);
                expect(chop('abcdefg', 2, { truncate: true })).toEqual([ 'ab', 'cd', 'ef' ]);
            }
        );
    }
);
