import expect from '../util/expect';
import create2DArray from '../src/create2DArray';

describe(
    'create2DArray',
    () => {
        test(
            'should fill from value',
            () => {
                expect(create2DArray(3, 4, 0)).toEqual([[ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ]]);
            }
        );

        test(
            'should fill from function',
            () => {
                expect(create2DArray(3, 4, (x, y) => x * 10 + y)).toEqual([[ 0, 1, 2, 3 ], [ 10, 11, 12, 13 ], [ 20, 21, 22, 23 ]]);
            }
        );
    }
);
