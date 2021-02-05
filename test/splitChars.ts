import expect from '../util/expect';
import splitChars from '../src/splitChars';
import { empty }   from '../src/constants';

describe(
    'splitChars',
    () => {
        test(
            'should split strings',
            () => {
                expect(splitChars('abcdefghi')).toEqual([ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i' ]);
                expect(splitChars(empty)).toEqual([]);
                expect(splitChars('⒜⒝⒞⒟')).toEqual([ '⒜', '⒝', '⒞', '⒟' ]);
            }
        );
    }
);
