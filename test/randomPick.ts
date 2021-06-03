import expect from '../util/expect';
import randomPick from '../src/randomPick';

describe(
    'randomPick',
    () => {
        test(
            'should pick object from list',
            () => {
                expect(randomPick([ 1, 2, 3 ], () => 0.5)).toEqual(2);
            }
        );

        test(
            'use math.random by default',
            () => {
                expect(randomPick([ 2 ])).toEqual(2);
            }
        );

        test(
            'return undefined for 0 length array',
            () => {
                expect(randomPick([] as unknown[])).toBeUndefined();
            }
        );
    }
);
