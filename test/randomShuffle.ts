import expect from '../util/expect';
import randomShuffle from '../src/randomShuffle';

describe(
    'randomShuffle',
    () => {
        test(
            'should shuffle a list',
            () => {
                expect(randomShuffle([ 1, 2, 3 ], () => 0)).toEqual([ 2, 3, 1 ]);
            }
        );

        test(
            'use math.random by default',
            () => {
                expect(randomShuffle([ 2 ])).toEqual([ 2 ]);
            }
        );
    }
);
